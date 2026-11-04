import { site } from "../data/site.ts";
import { pages } from "./pages.ts";

interface MediaRange {
  type: string;
  params: string[];
  q: number;
}

const markdownByUrl = new Map(pages.map((page) => [page.url, page.markdown]));

function parseAccept(accept: string | null): MediaRange[] {
  return (accept ?? "")
    .toLowerCase()
    .split(",")
    .map((part) => {
      const [type = "", ...rest] = part.split(";").map((value) => value.trim());
      const qIndex = rest.findIndex((param) => param.startsWith("q="));
      // q 之后的是 accept-ext，不是媒体类型的参数。
      const params = qIndex < 0 ? rest : rest.slice(0, qIndex);
      return {
        type,
        // RFC 9110 允许空参数，比如 text/markdown; 末尾多余的分号。
        params: params.filter(Boolean).map((param) => param.replaceAll('"', "")),
        q: qIndex < 0 ? 1 : Number(rest[qIndex]!.slice(2)),
      };
    });
}

/**
 * 某个范围对我们响应的权重。两种响应都是 charset=utf-8，带其他参数的范围匹配不上；
 * 带参数的比不带的更具体（RFC 9110），优先取它。
 */
function weightOf(ranges: MediaRange[], type: string): number | undefined {
  const matching = ranges.filter((range) => range.type === type && range.params.every((p) => p === "charset=utf-8"));
  return (matching.find((range) => range.params.length > 0) ?? matching[0])?.q;
}

/**
 * 只有明确写出 text/markdown 才考虑给 Markdown，这样只写通配符的请求仍然拿到 HTML。
 * HTML 的权重取匹配到的最具体范围；权重相同时给 Markdown，浏览器不会发 text/markdown。
 */
export function wantsMarkdown(accept: string | null): boolean {
  const ranges = parseAccept(accept);
  const markdown = weightOf(ranges, "text/markdown") ?? 0;
  const html = weightOf(ranges, "text/html") ?? weightOf(ranges, "text/*") ?? weightOf(ranges, "*/*") ?? 0;
  return markdown > 0 && markdown >= html;
}

/** 这个请求应该改走的 Markdown 地址；不需要协商时返回 undefined。 */
export function markdownUrl(request: Request): URL | undefined {
  const url = new URL(request.url);
  // www 由 next.config.ts 的 redirects 301 到主域名。先让它按原路径跳转，到主域名再协商，否则会永久跳到 /md/ 地址。
  if (url.hostname === site.wwwHost) return undefined;
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;

  const markdown = markdownByUrl.get(url.pathname);
  if (!markdown || !wantsMarkdown(request.headers.get("accept"))) return undefined;
  url.pathname = markdown;
  return url;
}

/**
 * 同一地址有 HTML 和 Markdown 两个版本，协商出的响应必须声明 Vary: Accept，否则共享缓存可能把 Markdown 发给浏览器。
 * 要在 Worker 这一层加：线上预渲染路由的响应不一定带上路由自己设置的 Vary。
 */
export function varyOnAccept(response: Response): Response {
  const negotiated = new Response(response.body, response);
  negotiated.headers.append("Vary", "Accept");
  return negotiated;
}
