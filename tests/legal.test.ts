import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { rehypePlugins, remarkPlugins } from "../src/content/legal/mdx.ts";
import type { LegalHeading } from "../src/content/legal/types.ts";
import { legalSections, parseLegalFrontmatter } from "../src/lib/legal.ts";

const valid = {
  title: "隐私政策",
  description: "说明",
  eyebrow: "PRIVACY POLICY",
  summary: "导语",
  effective: "2026-09-21",
  updated: "2026-11-03",
  highlights: ["要点"],
};

test("legal frontmatter is checked before a page formats its dates", () => {
  assert.deepEqual(parseLegalFrontmatter(valid, "zh/privacy.mdx"), valid);
  const broken: [Record<string, unknown> | undefined, RegExp][] = [
    [undefined, /zh\/privacy\.mdx: frontmatter is missing/],
    [{ ...valid, title: " " }, /non-empty title/],
    [{ ...valid, effective: undefined }, /effective must be a YYYY-MM-DD date/],
    [{ ...valid, updated: "2026-11-3" }, /updated must be/],
    [{ ...valid, updated: "2026-02-30" }, /updated must be/],
    [{ ...valid, highlights: [] }, /highlights must be a non-empty list/],
    [{ ...valid, highlights: "要点" }, /highlights must be a non-empty list/],
  ];
  for (const [frontmatter, message] of broken) {
    assert.throws(() => parseLegalFrontmatter(frontmatter, "zh/privacy.mdx"), message);
  }
});

test("the table of contents keeps every h2, even under an h1", () => {
  const h2 = (id: string, children: LegalHeading[] = []): LegalHeading => ({ depth: 2, id, value: id, children });
  const nested: LegalHeading[] = [
    {
      depth: 1,
      id: "title",
      value: "Title",
      children: [h2("scope", [{ depth: 3, id: "a", value: "a" }]), h2("rights")],
    },
    h2("changes"),
  ];
  assert.deepEqual(
    legalSections(nested).map(({ slug }) => slug),
    ["scope", "rights", "changes"],
  );
  assert.throws(() => legalSections([{ depth: 2, value: "No id" }]), /No id/);
});

/** Loads plugins by package name, as @next/mdx does with the names in next.config.ts. */
const plugins = (names: readonly string[]) => Promise.all(names.map(async (name) => (await import(name)).default));

/** Compiles a document with the plugins next.config.ts uses, and reads it the way its page does. */
async function load(lang: "zh" | "en", page: "privacy" | "terms") {
  const source = `${lang}/${page}.mdx`;
  const exports = await evaluate(readFileSync(`src/content/legal/${source}`, "utf8"), {
    ...runtime,
    remarkPlugins: await plugins(remarkPlugins),
    rehypePlugins: await plugins(rehypePlugins),
  });
  return {
    frontmatter: parseLegalFrontmatter(exports.frontmatter, source),
    sections: legalSections(exports.tableOfContents as LegalHeading[]),
  };
}

for (const page of ["privacy", "terms"] as const) {
  test(`the Chinese and English ${page} pages agree where the translation must`, async () => {
    // The English text says the Chinese version prevails, so both must carry the same dates and structure.
    const [zh, en] = await Promise.all([load("zh", page), load("en", page)]);
    assert.ok(zh.sections.length > 0);
    assert.equal(en.sections.length, zh.sections.length, "numbered sections");
    assert.equal(en.frontmatter.highlights.length, zh.frontmatter.highlights.length, "highlights");
    assert.equal(en.frontmatter.effective, zh.frontmatter.effective);
    assert.equal(en.frontmatter.updated, zh.frontmatter.updated);
    // The eyebrow is decorative English on both pages, rendered with lang="en".
    assert.equal(en.frontmatter.eyebrow, zh.frontmatter.eyebrow);
    assert.doesNotMatch(zh.frontmatter.eyebrow, /[㐀-鿿]/);
  });
}
