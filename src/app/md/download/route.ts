import { downloadMarkdownResponse } from "@/lib/markdown";

// 版本列表在每次请求时读取，与 HTML 下载页一样不预渲染。
export const dynamic = "force-dynamic";

export function GET() {
  return downloadMarkdownResponse("en");
}
