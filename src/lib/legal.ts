import type { LegalFrontmatter, LegalHeading } from "../content/legal/types.ts";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

/** A real calendar date written as YYYY-MM-DD. Date alone would roll 2026-02-30 over into March instead of failing. */
function isDate(value: unknown): value is string {
  if (typeof value !== "string" || !isoDate.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return !Number.isNaN(time) && new Date(time).toISOString().startsWith(value);
}

const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";

/**
 * Checks a legal document's frontmatter, which remark-mdx-frontmatter exports as whatever the YAML says. A missing or
 * misspelled date would otherwise surface as a RangeError from Intl.DateTimeFormat in the middle of the prerender, and
 * missing highlights as a crash in .map; this names the file and the field instead.
 */
export function parseLegalFrontmatter(value: unknown, source: string): LegalFrontmatter {
  const problem = (message: string) => new Error(`${source}: frontmatter ${message}`);
  if (!value || typeof value !== "object") throw problem("is missing");
  const { title, description, eyebrow, summary, effective, updated, highlights } = value as Record<string, unknown>;
  for (const [key, text] of Object.entries({ title, description, eyebrow, summary })) {
    if (!isText(text)) throw problem(`needs a non-empty ${key}`);
  }
  for (const [key, date] of Object.entries({ effective, updated })) {
    if (!isDate(date)) throw problem(`${key} must be a YYYY-MM-DD date, not ${JSON.stringify(date)}`);
  }
  if (!Array.isArray(highlights) || highlights.length === 0 || !highlights.every(isText)) {
    throw problem("highlights must be a non-empty list of text");
  }
  return { title, description, eyebrow, summary, effective, updated, highlights } as LegalFrontmatter;
}

/**
 * The numbered sections of a legal page: every h2 of the document, in order. rehype-extract-toc returns a tree, so an
 * h1 above them would hold every h2 in its children, and reading only the top level would leave the contents empty.
 */
export function legalSections(headings: readonly LegalHeading[]): { slug: string; text: string }[] {
  return headings.flatMap(({ depth, id, value, children = [] }) => {
    if (depth === 2 && !id) throw new Error(`The heading "${value}" has no id: rehype-slug must run before the TOC`);
    return [...(depth === 2 ? [{ slug: id!, text: value }] : []), ...legalSections(children)];
  });
}
