import { test } from "node:test";
import assert from "node:assert/strict";
import { linksFor } from "../src/data/site.ts";
import { en } from "../src/i18n/en.ts";
import { localePath, stripLocale, switchPath, toLang } from "../src/i18n/index.ts";
import { zh } from "../src/i18n/zh.ts";
import { describeContact, formatInquiry } from "../src/lib/inquiry.ts";

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

test("both languages have the same shape of content", () => {
  const shape = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.length
      : value && typeof value === "object"
        ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]))
        : typeof value;
  assert.deepEqual(shape(en), shape(zh));
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
