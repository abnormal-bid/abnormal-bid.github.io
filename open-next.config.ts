import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * OpenNext 的 Cloudflare 配置。
 * 页面都在构建时预渲染，没有 ISR 或按需重新验证，预渲染结果放在只读的静态资源里，不需要 R2 或队列。
 * 例外是下载页与它的 Markdown 版本：它们每次请求时在 Worker 上渲染，读取桌面客户端的版本列表（src/lib/releases.ts）。
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
