// 主题脚本内联进头部同步执行，首次绘制前就写好 data-theme；单独成文件便于 tests/theme.test.ts 直接加载。
import themeInitializer from "@/scripts/theme-init.js";

/** theme-color 要排在脚本前面：脚本运行时会按实际主题改写它。 */
export function ThemeHead() {
  return (
    <>
      <meta name="theme-color" content="#f7f7f4" />
      <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
    </>
  );
}
