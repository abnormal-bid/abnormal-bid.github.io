import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://abnormal.bid",
  output: "static",
  vite: { plugins: [tailwindcss()] },
});
