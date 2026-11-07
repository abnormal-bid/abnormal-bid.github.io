import type { Metadata } from "next";
import { Download } from "@/components/Download";
import { copies } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { fetchDesktopReleases } from "@/lib/releases";

const t = copies.zh.download;

export const metadata: Metadata = pageMetadata({
  lang: "zh",
  path: "/download/",
  title: t.metaTitle,
  description: t.metaDescription,
});

// 版本列表在每次请求时读取（src/lib/releases.ts），这一页不预渲染，mail 发布新版本后不用重新部署。
export const dynamic = "force-dynamic";

export default async function DownloadPage() {
  return <Download lang="zh" releases={await fetchDesktopReleases()} />;
}
