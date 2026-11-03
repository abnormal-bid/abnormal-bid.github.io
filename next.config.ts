import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /privacy/ 与 /en/ 都带尾部斜杠，沿用原有的线上路径。
  trailingSlash: true,
  // www 绑在同一个 Worker 上（见 wrangler.jsonc），只负责跳到主域名，保留路径与查询参数。
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.abnormalhq.com" }],
        // 主域名的页面路径都带尾部斜杠，这里写上才不会多跳一次。
        destination: "https://abnormalhq.com/:path*/",
        statusCode: 301,
      },
    ];
  },
  experimental: {
    // 中英文各有一个根布局，没有共同的根，404 要用 src/app/global-not-found.tsx。
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      // Worker 运行时不能用 fs 读项目文件，主题脚本在构建时打包成字符串。
      "**/scripts/theme-init.js": { loaders: ["raw-loader"], as: "*.js" },
    },
  },
};

// Turbopack 要求插件写成包名字符串。
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm", "remark-smartypants"],
    rehypePlugins: ["rehype-slug", "@stefanprobst/rehype-extract-toc", "@stefanprobst/rehype-extract-toc/mdx"],
  },
});

export default withMDX(nextConfig);
