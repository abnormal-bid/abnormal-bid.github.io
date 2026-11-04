/**
 * Worker 入口：在 OpenNext 生成的 Worker 外面做 Markdown 内容协商。
 * next.config 的 rewrites 只能用正则匹配 Accept，比较不了权重，所以放在这里。
 */
import handler from "./.open-next/worker.js";
import { markdownUrl, varyOnAccept } from "./src/lib/negotiate.ts";

const worker = {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const markdown = markdownUrl(request);
    if (!markdown) return handler.fetch(request, env, ctx);
    return varyOnAccept(await handler.fetch(new Request(markdown, request), env, ctx));
  },
};

export default worker;
