/**
 * 全站页面清单。sitemap、llms.txt、Markdown 版本与 next.config.ts 的内容协商都从这里取，新增页面时只改这一处。
 * next.config.ts 也引用这个文件，所以这里只能依赖不带运行时副作用的模块。
 */
import type { Lang } from "../data/site.ts";
import { localePath } from "../i18n/paths.ts";

/** 不带语言前缀的页面路径。 */
export const pagePaths = ["/", "/download/", "/privacy/", "/terms/"] as const;
export type PagePath = (typeof pagePaths)[number];

export interface Page {
  lang: Lang;
  path: PagePath;
  /** 带语言前缀的 HTML 地址。 */
  url: string;
  /** 同一页面的 Markdown 地址，由 src/app/md/[[...slug]]/route.ts 输出。 */
  markdown: string;
}

export function pageFor(lang: Lang, path: PagePath): Page {
  const url = localePath(lang, path);
  return { lang, path, url, markdown: `/md${url}` };
}

export const pages: readonly Page[] = (["zh", "en"] as const).flatMap((lang) =>
  pagePaths.map((path) => pageFor(lang, path)),
);
