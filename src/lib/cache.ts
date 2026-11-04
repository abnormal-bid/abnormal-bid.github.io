/**
 * OpenNext 给预渲染响应写死了 s-maxage=…, stale-while-revalidate=2592000。
 * 这个站前面没有 CDN 缓存，这个头只对浏览器起作用：浏览器会先用缓存的 RSC 响应，再在后台更新。
 * 部署后旧响应引用的 JS 和 CSS 已经不存在，就会 404。所以这类响应改成每次都向 Worker 验证，和静态资源一样。
 */
export function revalidateInBrowser(response: Response): Response {
  if (!response.headers.get("cache-control")?.includes("s-maxage")) return response;
  const revalidating = new Response(response.body, response);
  revalidating.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return revalidating;
}
