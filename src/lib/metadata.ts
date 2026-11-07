import type { Metadata } from "next";
import { site, type Lang } from "../data/site.ts";
import { copies } from "../i18n/index.ts";
import { defaultLang, langs, localePath } from "../i18n/paths.ts";

/** 分享卡片图片，由 scripts/og-images.ts 生成；改了首屏标题或分享描述后重新生成。 */
export function socialImage(lang: Lang) {
  return { url: `/og/${lang}.png`, width: 1200, height: 630, type: "image/png", alt: copies[lang].meta.socialImageAlt };
}

/**
 * 每个页面都有中英两版：hreflang 互相指向，x-default 指向默认语言（英文）。
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
  const socialTitle = title ?? t.meta.socialTitle;
  const socialDescription = description ?? t.meta.socialDescription;
  const image = socialImage(lang);
  return {
    metadataBase: new URL(site.url),
    title: title ?? t.meta.title,
    description: description ?? t.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(langs.map((other) => [copies[other].htmlLang, localePath(other, path)])),
        "x-default": localePath(defaultLang, path),
      },
      types: { "text/markdown": `/md${url}` },
    },
    // 允许搜索结果展示大图预览与完整摘要。
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      type: "website",
      url,
      siteName: site.name,
      locale: t.ogLocale,
      alternateLocale: langs.filter((other) => other !== lang).map((other) => copies[other].ogLocale),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}
