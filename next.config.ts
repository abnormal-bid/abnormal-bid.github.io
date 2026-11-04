import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { rehypePlugins, remarkPlugins } from "./src/content/legal/mdx.ts";
import { site } from "./src/data/site.ts";
import { pages } from "./src/lib/pages.ts";

// 带扩展名的路径（/icon.svg），写法与 Next.js 内置的尾部斜杠规则相同。
const filePath = "/:file((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/]+\\.\\w+)";
const onWww = [{ type: "host" as const, value: site.wwwHost }];

const nextVary = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";

const nextConfig: NextConfig = {
  // /privacy/ 与 /en/ 都带尾部斜杠，沿用原有的线上路径。
  trailingSlash: true,
  async redirects() {
    return [
      // www 绑在同一个 Worker 上（见 wrangler.jsonc），只负责跳到主域名，保留路径与查询参数。
      // 主域名的文件路径不带尾部斜杠、页面路径带，分开写才不会多跳一次。
      { source: filePath, has: onWww, destination: "https://abnormalhq.com/:file", statusCode: 301 },
      { source: "/:path*", has: onWww, destination: "https://abnormalhq.com/:path*/", statusCode: 301 },
      // Next.js 内置了去掉文件路径尾部斜杠的规则，但 OpenNext 不执行内置规则，只自己补页面路径的斜杠。
      { source: `${filePath}/`, destination: "/:file", statusCode: 308 },
    ];
  },
  async headers() {
    return pages.map((page) => ({
      source: page.url,
      headers: [
        {
          key: "Link",
          value: `</llms.txt>; rel="describedby"; type="text/plain", <${page.markdown}>; rel="alternate"; type="text/markdown"`,
        },
        // 这里的值会替换 Next.js 自己输出的 Vary，所以要带上它原有的几项。
        { key: "Vary", value: `${nextVary}, Accept` },
      ],
    }));
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

// Turbopack 要求插件写成包名字符串；清单在 src/content/legal/mdx.ts，测试用同一份编译法律文档。
const withMDX = createMDX({ options: { remarkPlugins, rehypePlugins } });

export default withMDX(nextConfig);
