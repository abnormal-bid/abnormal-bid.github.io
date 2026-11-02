// 提交前只处理暂存的文件：代码先 eslint --fix 再 prettier，其余能格式化的交给 prettier。
// 两组 glob 不重叠，避免同一个文件被并行任务同时改写。
const config = {
  "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}": ["eslint --fix --no-warn-ignored", "prettier --write"],
  "*.{json,jsonc,md,mdx,css,html,yml,yaml}": "prettier --write",
};

export default config;
