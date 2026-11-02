import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://abnormal.bid",
  output: "static",
  // 中文在根路径，英文在 /en/ 下；页面与组件通过 Astro.currentLocale 取语言（见 src/i18n/index.ts）。
  i18n: {
    locales: ["zh", "en"],
    defaultLocale: "zh",
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
