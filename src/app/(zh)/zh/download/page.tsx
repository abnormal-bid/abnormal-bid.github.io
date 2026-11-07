import type { Metadata } from "next";
import { Download } from "@/components/Download";
import { copies } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = copies.zh.download;

export const metadata: Metadata = pageMetadata({
  lang: "zh",
  path: "/download/",
  title: t.metaTitle,
  description: t.metaDescription,
});

export default function DownloadPage() {
  return <Download lang="zh" />;
}
