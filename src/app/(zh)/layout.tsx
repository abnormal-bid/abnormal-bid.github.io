import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";

/** 中文页（/）的根布局。 */
export default function ZhLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="zh">{children}</SiteLayout>;
}
