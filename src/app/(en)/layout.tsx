import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";

/** 英文页（/，默认语言）的根布局。 */
export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="en">{children}</SiteLayout>;
}
