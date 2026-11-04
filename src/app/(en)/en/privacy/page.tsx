import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import Content, { frontmatter, tableOfContents } from "@/content/legal/en/privacy.mdx";
import { parseLegalFrontmatter } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const legal = parseLegalFrontmatter(frontmatter, "en/privacy.mdx");

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/privacy/",
  title: `${legal.title} — Abnormal`,
  description: legal.description,
});

export default function PrivacyPage() {
  return (
    <LegalDocument lang="en" frontmatter={legal} headings={tableOfContents} href="/privacy/">
      <Content />
    </LegalDocument>
  );
}
