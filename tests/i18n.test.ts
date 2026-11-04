import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { linksFor } from "../src/data/site.ts";
import { en } from "../src/i18n/en.ts";
import { localePath, stripLocale, switchPath, toLang } from "../src/i18n/index.ts";
import { zh } from "../src/i18n/zh.ts";
import { describeContact, formatInquiry } from "../src/lib/inquiry.ts";
import { fillTemplate } from "../src/lib/template.ts";

test("Chinese stays at the root and English lives under /en/", () => {
  assert.equal(localePath("zh", "/privacy/"), "/privacy/");
  assert.equal(localePath("en", "/privacy/"), "/en/privacy/");
  assert.equal(localePath("en", "/#faq"), "/en/#faq");
  assert.equal(toLang("en"), "en");
  assert.equal(toLang(undefined), "zh");
});

test("switching language keeps the same page", () => {
  assert.equal(switchPath("/", "en"), "/en/");
  assert.equal(switchPath("/terms/", "en"), "/en/terms/");
  assert.equal(switchPath("/en/", "zh"), "/");
  assert.equal(switchPath("/en/privacy/", "zh"), "/privacy/");
  assert.equal(switchPath("/en", "zh"), "/");
  // A Chinese page whose path merely starts with "en" is not English.
  assert.equal(stripLocale("/enterprise/"), "/enterprise/");
});

test("onboard links follow the page language; webmail and status do not", () => {
  assert.equal(linksFor("zh").shop, "https://onboard.abnormalhq.com/shop/");
  assert.equal(linksFor("en").shop, "https://onboard.abnormalhq.com/en/shop/");
  assert.equal(linksFor("en").redeem, "https://onboard.abnormalhq.com/en/");
  assert.equal(linksFor("en").guide, "https://onboard.abnormalhq.com/en/guide/");
  assert.equal(linksFor("en").webmail, linksFor("zh").webmail);
  assert.equal(linksFor("en").status, linksFor("zh").status);
});

/** Values that are the same in both languages: where an entry links, which icon it shows, whether it is featured. */
const languageIndependent = new Set(["link", "icon", "anchor", "featured", "primary", "path"]);

/** Keeps the structure of the copy, with each text replaced by its type, down to every field of every list item. */
const shape = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(shape)
    : value && typeof value === "object"
      ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]))
      : typeof value;

/** Keeps only the language-independent values, where they sit. */
const fixed = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(fixed)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.entries(value)
            .filter(([key, item]) => languageIndependent.has(key) || (item !== null && typeof item === "object"))
            .map(([key, item]) => [key, languageIndependent.has(key) ? item : fixed(item)]),
        )
      : undefined;

test("both languages have the same shape of content, down to each list item", () => {
  assert.deepEqual(shape(en), shape(zh));
});

test("links, icons, anchors and flags are the same in both languages", () => {
  assert.deepEqual(fixed(en), fixed(zh));
});

test("the parity checks see a change inside a list item", () => {
  const product = zh.services.products[0]!;
  const withoutLink = { ...zh, services: { ...zh.services, products: [{ ...product, link: undefined }] } };
  const otherIcon = { ...zh, start: { ...zh.start, entries: zh.start.entries.toReversed() } };
  assert.notDeepEqual(shape({ ...zh, services: { ...zh.services, products: [product] } }), shape(withoutLink));
  assert.notDeepEqual(fixed(zh), fixed(otherIcon));
});

test("the English inquiry message is written in English", () => {
  const inquiry = {
    product: "Domain mailbox",
    duration: "3 months",
    notes: "",
  };
  assert.equal(
    formatInquiry(inquiry, "en"),
    "Hi, I'd like to ask about your email service.\nService: Domain mailbox\nTerm: 3 months\nPlease let me know the plan, total cost, setup time and what support is included.",
  );
  assert.match(describeContact({ wechat: "", email: "", telegram: "" }, "en"), /coming soon/);
});

test("each service card names its own icon instead of relying on its position", () => {
  for (const copy of [zh, en]) {
    const icons = copy.services.products.map(({ icon }) => icon);
    assert.equal(new Set(icons).size, icons.length, copy.htmlLang);
  }
});

const cjk = /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/;

test('decorative labels are English in both languages, as their lang="en" says', () => {
  for (const copy of [zh, en]) {
    const labels = [
      copy.hero.eyebrow,
      copy.start.eyebrow,
      copy.services.eyebrow,
      copy.process.eyebrow,
      copy.faq.eyebrow,
      copy.closing.eyebrow,
      copy.footer.tagline,
      copy.inquiry.kicker,
      copy.legal.tocKicker,
    ];
    for (const label of labels) assert.doesNotMatch(label, cjk, `${copy.htmlLang}: ${label}`);
  }
});

test("every eyebrow on the site is marked English and takes its words from the copy", () => {
  // The Chinese pages are <html lang="zh-CN">: an unmarked English eyebrow is read with the Chinese voice.
  for (const file of readdirSync("src/components").filter((name) => name.endsWith(".tsx"))) {
    const source = readFileSync(`src/components/${file}`, "utf8");
    for (const [, tag, inner] of source.matchAll(/<Eyebrow\b([^>]*)>([\s\S]*?)<\/Eyebrow>/g)) {
      assert.match(tag!, /lang="en"/, `${file}: <Eyebrow${tag}>`);
      const text = inner!.replace(/\{[^}]*\}/g, "").replace(/<[^>]*>/g, "");
      assert.doesNotMatch(text, /[A-Za-z]/, `${file}: hard-coded words in an eyebrow: ${text.trim()}`);
    }
  }
});

test("the inquiry's legal sentence keeps each language's own spacing around its links", () => {
  const links = { terms: "<terms>", privacy: "<privacy>" };
  assert.equal(fillTemplate(zh.inquiry.legal, links).join(""), "咨询与服务适用<terms>与<privacy>。");
  assert.equal(
    fillTemplate(en.inquiry.legal, links).join(""),
    "Requests and services are covered by the <terms> and <privacy>.",
  );
  assert.throws(() => fillTemplate("适用{terms}与{privcy}。", links), /privcy/);
});
