import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * OpenNext 的 Cloudflare 配置。
 * 全站页面都在构建时预渲染，没有 ISR 或按需重新验证，预渲染结果放在只读的静态资源里，不需要 R2 或队列。
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
