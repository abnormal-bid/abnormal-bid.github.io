import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import Content, { frontmatter, tableOfContents } from "@/content/legal/en/terms.mdx";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/terms/",
  title: `${frontmatter.title} — Abnormal`,
  description: frontmatter.description,
});

export default function TermsPage() {
  return (
    <LegalDocument lang="en" frontmatter={frontmatter} headings={tableOfContents} href="/terms/">
      <Content />
    </LegalDocument>
  );
}
