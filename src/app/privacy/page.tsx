import { LegalDocument } from "@/components/LegalDocument";
import { loadLegalDocument } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const document = loadLegalDocument("privacy");

export const metadata = pageMetadata({
  path: "/privacy/",
  title: `${document.title} — Abnormal`,
  description: document.description,
});

export default function PrivacyPage() {
  return <LegalDocument document={document} href="/privacy/" />;
}
