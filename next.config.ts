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
      // Worker 运行时不能用 fs 读项目文件，法律文档与主题脚本在构建时打包成字符串。
      "*.md": { loaders: ["raw-loader"], as: "*.js" },
      "**/scripts/theme-init.js": { loaders: ["raw-loader"], as: "*.js" },
    },
  },
};

export default nextConfig;
