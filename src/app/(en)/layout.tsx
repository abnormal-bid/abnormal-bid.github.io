import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";

/** 英文页（/en/）的根布局。 */
export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="en">{children}</SiteLayout>;
}
