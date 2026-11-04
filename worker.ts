/**
 * Worker 入口：在 OpenNext 生成的 Worker 外面做 Markdown 内容协商，并修正响应的缓存头。
 * next.config 的 rewrites 只能用正则匹配 Accept，比较不了权重；OpenNext 写死的缓存头也只有这一层能改。
 */
import handler from "./.open-next/worker.js";
import { revalidateInBrowser } from "./src/lib/cache.ts";
import { markdownUrl, varyOnAccept } from "./src/lib/negotiate.ts";

const worker = {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const markdown = markdownUrl(request);
    if (!markdown) return revalidateInBrowser(await handler.fetch(request, env, ctx));
    return revalidateInBrowser(varyOnAccept(await handler.fetch(new Request(markdown, request), env, ctx)));
  },
};

export default worker;
