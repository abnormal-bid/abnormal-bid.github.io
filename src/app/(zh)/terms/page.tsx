import { LegalDocument } from "@/components/LegalDocument";
import { loadLegalDocument } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const document = loadLegalDocument("zh", "terms");

export const metadata = pageMetadata({
  lang: "zh",
  path: "/terms/",
  title: `${document.title} — Abnormal`,
  description: document.description,
});

export default function TermsPage() {
  return <LegalDocument lang="zh" document={document} href="/terms/" />;
}
