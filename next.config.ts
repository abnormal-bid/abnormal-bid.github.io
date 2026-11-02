import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 全站静态导出到 out/，由 Cloudflare Workers 的静态资源服务托管（见 wrangler.jsonc）。
  output: "export",
  // /privacy/ 与 /terms/ 各是一个目录下的 index.html，沿用原有的线上路径。
  trailingSlash: true,
};

export default nextConfig;
