import type { Metadata } from "next";
import { Download } from "@/components/Download";
import { copies } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { loadDesktopReleases } from "@/lib/releases";

const t = copies.en.download;

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/download/",
  title: t.metaTitle,
  description: t.metaDescription,
});

// 版本列表在构建时读取（src/lib/releases.ts 用 no-store 请求），这里固定为预渲染。
export const dynamic = "force-static";

export default async function DownloadPage() {
  return <Download lang="en" releases={await loadDesktopReleases()} />;
}
