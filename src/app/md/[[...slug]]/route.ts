import { legalFrontmatters } from "@/content/legal/frontmatter";
import { legalSources } from "@/content/legal/sources";
import { homeMarkdown, legalMarkdown, stripFrontmatter } from "@/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";
import { pages, type Page } from "@/lib/pages";

export const dynamic = "force-static";
export const dynamicParams = false;

const slugOf = (page: Page) => page.markdown.split("/").filter(Boolean).slice(1);

// 下载页的 Markdown 带运行时读取的版本列表，在 md/download/ 与 md/zh/download/ 自己的路由里，不在这里预渲染。
const prerendered = pages.filter((page) => page.path !== "/download/");

export function generateStaticParams() {
  return prerendered.map((page) => ({ slug: slugOf(page) }));
}

function render({ lang, path }: Page): string {
  if (path === "/") return homeMarkdown(lang);
  if (path === "/download/") throw new Error("the download page's Markdown has its own route");
  return legalMarkdown(lang, legalFrontmatters[lang][path], stripFrontmatter(legalSources[lang][path]));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const page = prerendered.find((candidate) => slugOf(candidate).join("/") === slug.join("/"));
  if (!page) return new Response(null, { status: 404 });
  return markdownResponse(page, render(page));
}
