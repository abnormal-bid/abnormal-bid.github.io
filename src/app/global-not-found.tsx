import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ThemeHead } from "@/components/ThemeHead";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, HeadingMark, SectionTitle, sectionSpaceClassName } from "@/components/ui/section-heading";
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
        <Container asChild className={sectionSpaceClassName}>
          <main>
            <Eyebrow lang="en">404 / Page not found</Eyebrow>
            <SectionTitle asChild>
              <h1>
                这个页面不存在<HeadingMark>。</HeadingMark>
              </h1>
            </SectionTitle>
            <p lang="en" className="mt-3 text-muted-foreground">
              This page doesn&apos;t exist.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/">
                  返回首页 <Icon name="arrow" className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/en/" lang="en">
                  Back to home <Icon name="arrow" className="size-4" />
                </Link>
              </Button>
            </div>
          </main>
        </Container>
      </body>
    </html>
  );
}
