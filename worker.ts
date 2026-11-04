/**
 * Worker 入口：在 OpenNext 生成的 Worker 外面做 Markdown 内容协商。
 * next.config 的 rewrites 只能用正则匹配 Accept，比较不了权重，所以放在这里。
 */
import handler from "./.open-next/worker.js";
import { wantsMarkdown } from "./src/lib/negotiate.ts";
import { pages } from "./src/lib/pages.ts";

const markdownByUrl = new Map(pages.map((page) => [page.url, page.markdown]));

const worker = {
  fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    const markdown = markdownByUrl.get(url.pathname);
    if (!markdown || !["GET", "HEAD"].includes(request.method) || !wantsMarkdown(request.headers.get("accept"))) {
      return handler.fetch(request, env, ctx);
    }
    url.pathname = markdown;
    return handler.fetch(new Request(url, request), env, ctx);
  },
};

export default worker;
