/** 法律文档开头的 frontmatter，next.config.ts 的 remark-mdx-frontmatter 把它导出为 frontmatter。 */
export interface LegalFrontmatter {
  title: string;
  description: string;
  eyebrow: string;
  summary: string;
  effective: string;
  updated: string;
  highlights: string[];
}

/** rehype-extract-toc 导出的标题；id 由 rehype-slug 生成。 */
export interface LegalHeading {
  depth: number;
  id: string;
  value: string;
}
