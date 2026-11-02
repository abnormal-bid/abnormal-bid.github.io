import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { Marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import enPrivacy from "@/content/legal/en/privacy.md";
import enTerms from "@/content/legal/en/terms.md";
import zhPrivacy from "@/content/legal/zh/privacy.md";
import zhTerms from "@/content/legal/zh/terms.md";
import type { Lang } from "@/data/site";

export type LegalPage = "privacy" | "terms";

const sources: Record<Lang, Record<LegalPage, string>> = {
  zh: { privacy: zhPrivacy, terms: zhTerms },
  en: { privacy: enPrivacy, terms: enTerms },
};

export interface LegalDocument {
  title: string;
  description: string;
  eyebrow: string;
  summary: string;
  effective: string;
  updated: string;
  highlights: string[];
  headings: { slug: string; text: string }[];
  html: string;
}

// 把 src/content/legal/ 下的 Markdown 渲染成 HTML，二级标题同时生成目录。
export function loadLegalDocument(lang: Lang, page: LegalPage): LegalDocument {
  const { data, content } = matter(sources[lang][page]);
  const slugger = new GithubSlugger();
  const headings: LegalDocument["headings"] = [];
  const marked = new Marked(markedSmartypants(), {
    renderer: {
      heading({ tokens, depth, text }) {
        const slug = slugger.slug(text);
        if (depth === 2) headings.push({ slug, text });
        return `<h${depth} id="${slug}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(content, { async: false });
  return { ...(data as Omit<LegalDocument, "headings" | "html">), headings, html };
}
