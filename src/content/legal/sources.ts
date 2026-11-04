/**
 * 法律文档的原始文本，由 raw-loader 在打包时内嵌。Worker 运行时不能用 fs 读项目文件，
 * 而且 OpenNext 会在运行时重新执行预渲染过的路由，所以不能只在构建时读取。
 */
import type { Lang } from "@/data/site";
import enPrivacy from "@/content/legal/en/privacy.mdx" with { turbopackLoader: "raw-loader", turbopackAs: "*.js" };
import enTerms from "@/content/legal/en/terms.mdx" with { turbopackLoader: "raw-loader", turbopackAs: "*.js" };
import zhPrivacy from "@/content/legal/zh/privacy.mdx" with { turbopackLoader: "raw-loader", turbopackAs: "*.js" };
import zhTerms from "@/content/legal/zh/terms.mdx" with { turbopackLoader: "raw-loader", turbopackAs: "*.js" };

// src/env.d.ts 把 .mdx 的默认导出声明成组件，这里经过 raw-loader 实际是字符串。
export const legalSources = {
  zh: { "/privacy/": zhPrivacy, "/terms/": zhTerms },
  en: { "/privacy/": enPrivacy, "/terms/": enTerms },
} as unknown as Record<Lang, Record<"/privacy/" | "/terms/", string>>;
