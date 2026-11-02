/**
 * 语言与路径：中文在根路径（/、/privacy/），英文在 /en/ 下（/en/、/en/privacy/），与 src/app 下的两个路由组一致。
 * 单独成文件，客户端组件引用它时不会把两种语言的文案都打进浏览器脚本。
 */
import type { Lang } from "../data/site.ts";

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
