import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import Content, { frontmatter, tableOfContents } from "@/content/legal/en/privacy.mdx";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/privacy/",
  title: `${frontmatter.title} — Abnormal`,
  description: frontmatter.description,
});

export default function PrivacyPage() {
  return (
    <LegalDocument lang="en" frontmatter={frontmatter} headings={tableOfContents} href="/privacy/">
      <Content />
    </LegalDocument>
  );
}
