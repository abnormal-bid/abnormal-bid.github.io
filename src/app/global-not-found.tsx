import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ThemeHead } from "@/components/ThemeHead";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "页面不存在 · Page not found — Abnormal",
  robots: { index: false },
};

/** 中英两个根布局共用的 404：静态托管只有一份 404.html，所以两种语言写在一起。 */
export default function GlobalNotFound() {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <ThemeHead />
      </head>
      <body>
        <main className="page-shell section-space">
          <p className="eyebrow">404 / Page not found</p>
          <h1 className="section-title">
            这个页面不存在<span className="text-signal">。</span>
          </h1>
          <p lang="en" className="mt-3 text-muted-foreground">
            This page doesn&apos;t exist.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/">
              返回首页 <Icon name="arrow" className="size-4" />
            </Link>
            <Link className="btn btn-outline" href="/en/" lang="en">
              Back to home <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
