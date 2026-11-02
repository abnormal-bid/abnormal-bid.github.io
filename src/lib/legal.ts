import { readFileSync } from "node:fs";
import { join } from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { Marked } from "marked";

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

// 只在构建时运行：把 src/content/legal/ 下的 Markdown 渲染成静态 HTML，二级标题同时生成目录。
export function loadLegalDocument(name: "privacy" | "terms"): LegalDocument {
  const source = readFileSync(
    join(process.cwd(), "src/content/legal", `${name}.md`),
    "utf8",
  );
  const { data, content } = matter(source);
  const slugger = new GithubSlugger();
  const headings: LegalDocument["headings"] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth, text }) {
        const slug = slugger.slug(text);
        if (depth === 2) headings.push({ slug, text });
        return `<h${depth} id="${slug}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(content, { async: false });
  return {
    ...(data as Omit<LegalDocument, "headings" | "html">),
    headings,
    html,
  };
}
