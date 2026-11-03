import Link from "next/link";
import { BrandMark, BrandName } from "@/components/ui/brand-mark";
import type { Lang } from "@/data/site";
import { useCopy } from "@/i18n";

export function Brand({ lang }: { lang: Lang }) {
  const { t, path } = useCopy(lang);
  return (
    <Link
      className="inline-flex items-center gap-2.5 rounded-control whitespace-nowrap"
      href={path("/")}
      aria-label={t.brandLabel}
    >
      <BrandMark />
      <BrandName />
    </Link>
  );
}
