/**
 * 文案入口：服务端组件用 useCopy(lang) 取当前语言的文案、联动地址与本地化路径工具。
 * 客户端组件只通过 props 拿到自己用得到的那部分文案。
 */
import { linksFor, type Lang } from "../data/site.ts";
import { en } from "./en.ts";
import { localePath, toLang } from "./paths.ts";
import type { Copy } from "./types.ts";
import { zh } from "./zh.ts";

export { localePath, stripLocale, switchPath, toLang } from "./paths.ts";
export type { Lang };
export const langs: readonly Lang[] = ["zh", "en"];
export const copies: Record<Lang, Copy> = { zh, en };

export function useCopy(locale: string | undefined) {
  const lang = toLang(locale);
  return {
    lang,
    t: copies[lang],
    links: linksFor(lang),
    path: (path: string) => localePath(lang, path),
  };
}
