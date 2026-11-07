/**
 * 四份法律文档检查过的 frontmatter，Markdown 版本、sitemap 的 lastModified 与结构化数据都从这里取。
 * 与 HTML 页面一样先检查，缺字段时构建报错并指出文件，而不是输出带 undefined 的内容。
 */
import { frontmatter as enPrivacy } from "@/content/legal/en/privacy.mdx";
import { frontmatter as enTerms } from "@/content/legal/en/terms.mdx";
import { frontmatter as zhPrivacy } from "@/content/legal/zh/privacy.mdx";
import { frontmatter as zhTerms } from "@/content/legal/zh/terms.mdx";
import type { Lang } from "@/data/site";
import { parseLegalFrontmatter } from "@/lib/legal";
import type { LegalFrontmatter } from "./types";

export const legalFrontmatters: Record<Lang, Record<"/privacy/" | "/terms/", LegalFrontmatter>> = {
  zh: {
    "/privacy/": parseLegalFrontmatter(zhPrivacy, "zh/privacy.mdx"),
    "/terms/": parseLegalFrontmatter(zhTerms, "zh/terms.mdx"),
  },
  en: {
    "/privacy/": parseLegalFrontmatter(enPrivacy, "en/privacy.mdx"),
    "/terms/": parseLegalFrontmatter(enTerms, "en/terms.mdx"),
  },
};
