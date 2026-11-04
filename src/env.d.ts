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
declare module "@/content/legal/*.mdx" {
  import type { MDXContent } from "mdx/types";
  import type { LegalFrontmatter, LegalHeading } from "@/content/legal/types";
  export const frontmatter: LegalFrontmatter;
  export const tableOfContents: LegalHeading[];
  const Content: MDXContent;
  export default Content;
}

// OpenNext 在构建时生成，typecheck 时可能还不存在。
declare module "*/.open-next/worker.js" {
  const handler: { fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> };
  export default handler;
}
