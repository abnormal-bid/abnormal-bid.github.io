import type { Metadata } from "next";
import { Download } from "@/components/Download";
import { copies } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = copies.en.download;

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/download/",
  title: t.metaTitle,
  description: t.metaDescription,
});

export default function DownloadPage() {
  return <Download lang="en" />;
}
