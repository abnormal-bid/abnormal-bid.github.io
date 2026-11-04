interface Window {
  abnormalTheme: {
    getPreference(): "system" | "light" | "dark";
    setPreference(preference: "system" | "light" | "dark"): void;
  };
}

// next.config.ts 用 raw-loader 把主题脚本打包成字符串：Worker 运行时不能用 fs 读项目文件。
declare module "@/scripts/theme-init.js" {
  const source: string;
  export default source;
}

// next.config.ts 的 remark / rehype 插件从法律文档里导出 frontmatter 与 tableOfContents。
// frontmatter 是 YAML 原样导出的，没有经过检查，页面先用 parseLegalFrontmatter（src/lib/legal.ts）读它。
declare module "@/content/legal/*.mdx" {
  import type { MDXContent } from "mdx/types";
  import type { LegalHeading } from "@/content/legal/types";
  export const frontmatter: unknown;
  export const tableOfContents: LegalHeading[];
  const Content: MDXContent;
  export default Content;
}
