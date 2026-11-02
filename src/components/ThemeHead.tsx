import { readFileSync } from "node:fs";
import { join } from "node:path";

// 主题脚本内联进头部同步执行，首次绘制前就写好 data-theme；单独成文件便于 tests/theme.test.ts 直接加载。
const themeInitializer = readFileSync(join(process.cwd(), "src/scripts/theme-init.js"), "utf8");

/** theme-color 要排在脚本前面：脚本运行时会按实际主题改写它。 */
export function ThemeHead() {
  return (
    <>
      <meta name="theme-color" content="#f7f7f4" />
      <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
    </>
  );
}
