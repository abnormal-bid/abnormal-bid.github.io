import { LegalDocument } from "@/components/LegalDocument";
import { loadLegalDocument } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const document = loadLegalDocument("terms");

export const metadata = pageMetadata({
  path: "/terms/",
  title: `${document.title} — Abnormal`,
  description: document.description,
});

export default function TermsPage() {
  return <LegalDocument document={document} href="/terms/" />;
}
