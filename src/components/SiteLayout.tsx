/**
 * 两种语言共用的 HTML 骨架：主题脚本、字体预载、跳转链接、页头页脚与咨询弹窗。
 * /（英文）与 /zh/（中文）各有一个根布局（src/app 下的两个路由组），都只是把语言交给这里。
 */
import type { ReactNode } from "react";
import { preload } from "react-dom";
import type { Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Brand } from "./Brand";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { InquiryProvider } from "./InquiryDialog";
import { ThemeHead } from "./ThemeHead";
import "@/styles/global.css";

const fontOptions = { as: "font", type: "font/woff2", crossOrigin: "anonymous" } as const;

export function SiteLayout({ lang, children }: { lang: Lang; children: ReactNode }) {
  const { t, path } = useCopy(lang);
  const legalPage = (page: string) => {
    const { label } = t.legalPages.find(({ path: candidate }) => candidate === page)!;
    return { href: path(page), label };
  };
  preload("/fonts/Inter-Variable.woff2", fontOptions);
  preload("/fonts/BricolageGrotesque-Variable.woff2", fontOptions);

  return (
    // suppressHydrationWarning：theme-init.js 会在水合前改写 <html> 的 data-theme 与 color-scheme。
    <html lang={t.htmlLang} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* 这是 App Router 的根布局骨架，只是放在 components/ 下，规则按路径判断成了 Pages Router。 */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <ThemeHead />
      </head>
      <body>
        <a
          className="fixed top-3 left-4 z-50 -translate-y-[160%] rounded-control bg-foreground px-3.5 py-2 text-background focus:translate-y-0"
          href="#main"
        >
          {t.skipLink}
        </a>
        <InquiryProvider
          lang={lang}
          copy={t.inquiry}
          dot={t.dot}
          products={t.services.products.map(({ name }) => name)}
          termsPage={legalPage("/terms/")}
          privacyPage={legalPage("/privacy/")}
        >
          <Header
            lang={lang}
            brand={<Brand lang={lang} />}
            copy={t.header}
            themeCopy={t.theme}
            langToggle={t.langToggle}
          />
          <main id="main">{children}</main>
          <Footer lang={lang} />
        </InquiryProvider>
      </body>
    </html>
  );
}
