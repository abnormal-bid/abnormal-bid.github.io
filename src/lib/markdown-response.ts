import { site } from "../data/site.ts";
import type { Page } from "./pages.ts";

/** /md/ 下的 Markdown 响应，与 HTML 页面内容相同，canonical 指回 HTML 地址。 */
export function markdownResponse(page: Page, body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // 这份内容与 HTML 页面相同，搜索引擎应该收录 HTML 地址。
      Link: `<${site.url}${page.url}>; rel="canonical"`,
    },
  });
}
