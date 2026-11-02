import type { Metadata } from "next";
import { site, type Lang } from "@/data/site";
import { copies } from "@/i18n";
import { localePath } from "@/i18n/paths";

/**
 * 每个页面都有中英两版：hreflang 互相指向，x-default 指向中文版。
 * 子页面的 openGraph 会整体覆盖父级，所以每个页面都从这里生成完整的一份。
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Lang;
  /** 不带语言前缀的页面路径，如 /privacy/。 */
  path: string;
  title?: string;
  description?: string;
}): Metadata {
  const t = copies[lang];
  const url = localePath(lang, path);
  return {
    metadataBase: new URL(site.url),
    title: title ?? t.meta.title,
    description: description ?? t.meta.description,
    alternates: {
      canonical: url,
      languages: {
        [copies.zh.htmlLang]: localePath("zh", path),
        [copies.en.htmlLang]: localePath("en", path),
        "x-default": localePath("zh", path),
      },
    },
    openGraph: {
      title: t.meta.socialTitle,
      description: t.meta.socialDescription,
      type: "website",
      url,
      locale: t.ogLocale,
    },
  };
}
