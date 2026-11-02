import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /privacy/ 与 /en/ 都带尾部斜杠，沿用原有的线上路径。
  trailingSlash: true,
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
