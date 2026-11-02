import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryProvider } from "@/components/InquiryDialog";
import { site } from "@/data/site";
import "@/styles/global.css";

// 主题脚本内联进头部同步执行，首次绘制前就写好 data-theme；单独成文件便于 tests/theme.test.ts 直接加载。
const themeInitializer = readFileSync(
  join(process.cwd(), "src/scripts/theme-init.js"),
  "utf8",
);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  preload("/fonts/Inter-Variable.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    // theme-init.js 会在水合前改写 <html> 的 data-theme 与 color-scheme。
    <html lang="zh-CN" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#faf9f5" />
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>
        <a
          className="fixed top-3 left-4 z-50 -translate-y-[160%] rounded-control bg-foreground px-3.5 py-2 text-background focus:translate-y-0"
          href="#main"
        >
          跳到主要内容
        </a>
        <InquiryProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </InquiryProvider>
      </body>
    </html>
  );
}
