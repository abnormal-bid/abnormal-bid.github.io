/**
 * Worker 入口：在 OpenNext 生成的 Worker 外面做 Markdown 内容协商。
 * next.config 的 rewrites 只能用正则匹配 Accept，比较不了权重，所以放在这里。
 */
import handler from "./.open-next/worker.js";
import { markdownUrl } from "./src/lib/negotiate.ts";

const worker = {
  fetch(request: Request, env: unknown, ctx: unknown) {
    const markdown = markdownUrl(request);
    return handler.fetch(markdown ? new Request(markdown, request) : request, env, ctx);
  },
};

export default worker;
