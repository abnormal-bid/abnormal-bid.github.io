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

/** rehype-extract-toc 导出的标题树；id 由 rehype-slug 生成。下级标题在 children 里，所以要遍历整棵树（见 legalSections）。 */
export interface LegalHeading {
  depth: number;
  id?: string;
  value: string;
  children?: LegalHeading[];
}
