/**
 * The MDX plugins the legal documents are compiled with, by package name: Turbopack only takes plugins as strings.
 * next.config.ts hands them to @next/mdx, and tests/legal.test.ts compiles the documents with the same list.
 */
export const remarkPlugins = ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm", "remark-smartypants"];
export const rehypePlugins = [
  "rehype-slug",
  "@stefanprobst/rehype-extract-toc",
  "@stefanprobst/rehype-extract-toc/mdx",
];
