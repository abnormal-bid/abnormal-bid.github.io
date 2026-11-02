import { LegalDocument } from "@/components/LegalDocument";
import { loadLegalDocument } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

const document = loadLegalDocument("zh", "privacy");

export const metadata = pageMetadata({
  lang: "zh",
  path: "/privacy/",
  title: `${document.title} — Abnormal`,
  description: document.description,
});

export default function PrivacyPage() {
  return <LegalDocument lang="zh" document={document} href="/privacy/" />;
}
