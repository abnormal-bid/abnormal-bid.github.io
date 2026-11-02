import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "页面不存在 — Abnormal",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-shell section-space">
      <p className="eyebrow">404 / Page not found</p>
      <h1 className="section-title">
        这个页面不存在<span className="text-brand">。</span>
      </h1>
      <Link className="btn btn-primary mt-8" href="/">
        返回首页 <Icon name="arrow" className="size-4" />
      </Link>
    </section>
  );
}
