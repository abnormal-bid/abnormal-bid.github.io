/**
 * 语言与路径：中文在根路径（/、/privacy/），英文在 /en/ 下（/en/、/en/privacy/），与 astro.config.mjs 的 i18n 一致。
 * 页面与组件用 useCopy(Astro.currentLocale) 取当前语言的文案。
 */
import { linksFor, type Lang } from "../data/site.ts";
import { en } from "./en.ts";
import type { Copy } from "./types.ts";
import { zh } from "./zh.ts";

export type { Lang };
export const langs: readonly Lang[] = ["zh", "en"];
export const copies: Record<Lang, Copy> = { zh, en };

export function toLang(locale: string | undefined): Lang {
  return locale === "en" ? "en" : "zh";
}

/** 站内路径加上语言前缀：localePath("en", "/privacy/") → "/en/privacy/"。 */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === "en" ? `/en${clean}` : clean;
}

/** 去掉语言前缀后的页面路径：/en/privacy/ → /privacy/，/en → /。 */
export function stripLocale(pathname: string): string {
  const rest = pathname.replace(/^\/en(?=\/|$)/, "");
  return rest || "/";
}

/** 当前页面在另一种语言下的地址，供语言切换与 hreflang 使用。 */
export function switchPath(pathname: string, to: Lang): string {
  return localePath(to, stripLocale(pathname));
}

/** 当前语言的文案、联动地址与本地化路径工具。 */
export function useCopy(locale: string | undefined) {
  const lang = toLang(locale);
  return {
    lang,
    t: copies[lang],
    links: linksFor(lang),
    path: (path: string) => localePath(lang, path),
  };
}
