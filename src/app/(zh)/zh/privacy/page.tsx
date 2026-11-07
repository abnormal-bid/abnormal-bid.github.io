import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import Content, { frontmatter, tableOfContents } from "@/content/legal/zh/privacy.mdx";
import { parseLegalFrontmatter } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const legal = parseLegalFrontmatter(frontmatter, "zh/privacy.mdx");

export const metadata: Metadata = pageMetadata({
  lang: "zh",
  path: "/privacy/",
  title: `${legal.title} — Abnormal`,
  description: legal.description,
});

export default function PrivacyPage() {
  return (
    <LegalDocument lang="zh" frontmatter={legal} headings={tableOfContents} href="/privacy/">
      <Content />
    </LegalDocument>
  );
}
