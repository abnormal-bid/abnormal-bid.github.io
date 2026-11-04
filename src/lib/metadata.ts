import type { Metadata } from "next";
import { site, type Lang } from "../data/site.ts";
import { copies } from "../i18n/index.ts";
import { localePath } from "../i18n/paths.ts";

/**
 * 每个页面都有中英两版：hreflang 互相指向，x-default 指向中文版。
 * 子页面的 openGraph 会整体覆盖父级，所以每个页面都从这里生成完整的一份；
 * 传了 title / description 的页面（法律页），分享卡片也用它们，不传时用首页的分享文案。
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
      types: { "text/markdown": `/md${url}` },
    },
    openGraph: {
      title: title ?? t.meta.socialTitle,
      description: description ?? t.meta.socialDescription,
      type: "website",
      url,
      locale: t.ogLocale,
    },
  };
}
