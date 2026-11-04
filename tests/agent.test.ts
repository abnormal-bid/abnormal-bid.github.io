import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { linksFor, site } from "../src/data/site.ts";
import { copies } from "../src/i18n/index.ts";
import { homeMarkdown, legalMarkdown, llmsTxt, stripFrontmatter } from "../src/lib/markdown.ts";
import { pages } from "../src/lib/pages.ts";

test("every page has a Markdown path under /md/ that mirrors its URL", () => {
  assert.deepEqual(
    pages.map((page) => [page.url, page.markdown]),
    [
      ["/", "/md/"],
      ["/privacy/", "/md/privacy/"],
      ["/terms/", "/md/terms/"],
      ["/en/", "/md/en/"],
      ["/en/privacy/", "/md/en/privacy/"],
      ["/en/terms/", "/md/en/terms/"],
    ],
  );
});

for (const lang of ["zh", "en"] as const) {
  test(`${lang} home Markdown carries the page's content and links`, () => {
    const t = copies[lang];
    const markdown = homeMarkdown(lang);
    assert.ok(markdown.startsWith(`# ${t.meta.title}\n`));
    for (const entry of t.start.entries) assert.ok(markdown.includes(entry.description));
    for (const product of t.services.products) assert.ok(markdown.includes(`### ${product.name}`));
    for (const step of t.process.steps) assert.ok(markdown.includes(step.description));
    for (const item of t.faq.items) assert.ok(markdown.includes(item.answer));
    for (const url of Object.values(linksFor(lang))) assert.ok(markdown.includes(`(${url})`), url);
    assert.ok(markdown.includes(site.contact.email));
    assert.ok(!markdown.includes("undefined"));
  });
}

test("llms.txt follows the format and lists every page and linked site in both languages", () => {
  const text = llmsTxt();
  assert.match(text, /^# Abnormal\n\n> /);
  for (const page of pages) assert.ok(text.includes(`(${site.url}${page.markdown})`), page.markdown);
  for (const lang of ["zh", "en"] as const) {
    for (const url of Object.values(linksFor(lang))) assert.ok(text.includes(`(${url})`), url);
  }
});

test("legal Markdown drops the frontmatter and keeps the metadata and body", () => {
  const source = readFileSync(new URL("../src/content/legal/en/terms.mdx", import.meta.url), "utf8");
  const body = stripFrontmatter(source);
  assert.ok(body.startsWith("This English version"));
  assert.ok(!body.includes("highlights:"));

  const markdown = legalMarkdown(
    "en",
    {
      title: "Terms",
      description: "",
      eyebrow: "",
      summary: "Summary",
      effective: "2026-01-01",
      updated: "2026-01-02",
      highlights: ["One"],
    },
    "Body",
  );
  assert.ok(markdown.startsWith("# Terms\n\nSummary\n"));
  assert.ok(markdown.includes("- Effective: 2026-01-01"));
  assert.ok(markdown.includes("- One"));
  assert.ok(markdown.endsWith("Body\n"));
});

test("legal documents stay plain Markdown, so the raw body is safe to serve", () => {
  for (const file of ["en/privacy", "en/terms", "zh/privacy", "zh/terms"]) {
    const source = readFileSync(new URL(`../src/content/legal/${file}.mdx`, import.meta.url), "utf8");
    assert.doesNotMatch(stripFrontmatter(source), /^(import|export) |<[A-Z]/m, file);
  }
});

test("robots.txt allows crawling, declares content signals and points at the sitemap", () => {
  const robots = readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8");
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Content-Signal: search=yes, ai-input=yes, ai-train=no$/m);
  assert.ok(robots.includes(`Sitemap: ${site.url}/sitemap.xml`));
});
