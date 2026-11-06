import { frontmatter as enPrivacy } from "@/content/legal/en/privacy.mdx";
import { frontmatter as enTerms } from "@/content/legal/en/terms.mdx";
import { frontmatter as zhPrivacy } from "@/content/legal/zh/privacy.mdx";
import { frontmatter as zhTerms } from "@/content/legal/zh/terms.mdx";
import { legalSources } from "@/content/legal/sources";
import { site } from "@/data/site";
import { parseLegalFrontmatter } from "@/lib/legal";
import { downloadMarkdown, homeMarkdown, legalMarkdown, stripFrontmatter } from "@/lib/markdown";
import { pages, type Page } from "@/lib/pages";

export const dynamic = "force-static";
export const dynamicParams = false;

const slugOf = (page: Page) => page.markdown.split("/").filter(Boolean).slice(1);

export function generateStaticParams() {
  return pages.map((page) => ({ slug: slugOf(page) }));
}

// 与 HTML 页面一样先检查 frontmatter，缺字段时构建报错并指出文件，而不是输出带 undefined 的 Markdown。
const frontmatters = {
  zh: {
    "/privacy/": parseLegalFrontmatter(zhPrivacy, "zh/privacy.mdx"),
    "/terms/": parseLegalFrontmatter(zhTerms, "zh/terms.mdx"),
  },
  en: {
    "/privacy/": parseLegalFrontmatter(enPrivacy, "en/privacy.mdx"),
    "/terms/": parseLegalFrontmatter(enTerms, "en/terms.mdx"),
  },
} as const;

function render({ lang, path }: Page): string {
  if (path === "/") return homeMarkdown(lang);
  if (path === "/download/") return downloadMarkdown(lang);
  return legalMarkdown(lang, frontmatters[lang][path], stripFrontmatter(legalSources[lang][path]));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const page = pages.find((candidate) => slugOf(candidate).join("/") === slug.join("/"));
  if (!page) return new Response(null, { status: 404 });

  return new Response(render(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // 这份内容与 HTML 页面相同，搜索引擎应该收录 HTML 地址。
      Link: `<${site.url}${page.url}>; rel="canonical"`,
    },
  });
}
