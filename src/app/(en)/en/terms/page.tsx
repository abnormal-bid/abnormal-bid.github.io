import { LegalDocument } from "@/components/LegalDocument";
import { loadLegalDocument } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const document = loadLegalDocument("en", "terms");

export const metadata = pageMetadata({
  lang: "en",
  path: "/terms/",
  title: `${document.title} — Abnormal`,
  description: document.description,
});

export default function TermsPage() {
  return <LegalDocument lang="en" document={document} href="/terms/" />;
}
