interface Window {
  abnormalTheme: {
    getPreference(): "system" | "light" | "dark";
    setPreference(preference: "system" | "light" | "dark"): void;
  };
}

// next.config.ts 用 raw-loader 把这些文件打包成字符串：Worker 运行时不能用 fs 读项目文件。
declare module "*.md" {
  const source: string;
  export default source;
}
declare module "@/scripts/theme-init.js" {
  const source: string;
  export default source;
}
