import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import Content, { frontmatter, tableOfContents } from "@/content/legal/en/terms.mdx";
import { parseLegalFrontmatter } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const legal = parseLegalFrontmatter(frontmatter, "en/terms.mdx");

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/terms/",
  title: `${legal.title} — Abnormal`,
  description: legal.description,
});

export default function TermsPage() {
  return (
    <LegalDocument lang="en" frontmatter={legal} headings={tableOfContents} href="/terms/">
      <Content />
    </LegalDocument>
  );
}
