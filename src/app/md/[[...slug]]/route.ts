import { legalFrontmatters } from "@/content/legal/frontmatter";
import { legalSources } from "@/content/legal/sources";
import { site } from "@/data/site";
import { downloadMarkdown, homeMarkdown, legalMarkdown, stripFrontmatter } from "@/lib/markdown";
import { pages, type Page } from "@/lib/pages";
import { loadDesktopReleases } from "@/lib/releases";

export const dynamic = "force-static";
export const dynamicParams = false;

const slugOf = (page: Page) => page.markdown.split("/").filter(Boolean).slice(1);

export function generateStaticParams() {
  return pages.map((page) => ({ slug: slugOf(page) }));
}

async function render({ lang, path }: Page): Promise<string> {
  if (path === "/") return homeMarkdown(lang);
  if (path === "/download/") return downloadMarkdown(lang, await loadDesktopReleases());
  return legalMarkdown(lang, legalFrontmatters[lang][path], stripFrontmatter(legalSources[lang][path]));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const page = pages.find((candidate) => slugOf(candidate).join("/") === slug.join("/"));
  if (!page) return new Response(null, { status: 404 });

  return new Response(await render(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // 这份内容与 HTML 页面相同，搜索引擎应该收录 HTML 地址。
      Link: `<${site.url}${page.url}>; rel="canonical"`,
    },
  });
}
