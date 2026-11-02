import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // 客户端脚本跑在浏览器里，测试与配置文件跑在 Node 里。
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  globalIgnores([
    // Astro 的构建产物与生成的类型
    "dist/**",
    ".astro/**",
    ".artifacts/**",
    // Claude Code 的 worktree 是整份仓库副本
    ".claude/**",
  ]),
]);

export default eslintConfig;
