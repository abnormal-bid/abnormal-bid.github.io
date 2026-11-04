/**
 * 只有明确写出 text/markdown 才考虑给 Markdown，这样只写通配符的请求仍然拿到 HTML。
 * HTML 的权重取匹配到的最具体范围（RFC 9110）；权重相同时给 Markdown，浏览器不会发 text/markdown。
 * 与 onboard 的 worker/pages.ts 语义相同。
 */
export function wantsMarkdown(accept: string | null): boolean {
  const ranges = new Map<string, number>();
  for (const part of (accept ?? "").toLowerCase().split(",")) {
    const [range = "", ...params] = part.split(";").map((value) => value.trim());
    const q = params.find((param) => param.startsWith("q="));
    ranges.set(range, q ? Number(q.slice(2)) : 1);
  }
  const markdown = ranges.get("text/markdown") ?? 0;
  const html = ranges.get("text/html") ?? ranges.get("text/*") ?? ranges.get("*/*") ?? 0;
  return markdown > 0 && markdown >= html;
}
