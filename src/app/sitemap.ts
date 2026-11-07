import type { MetadataRoute } from "next";
import { legalFrontmatters } from "@/content/legal/frontmatter";
import { site } from "@/data/site";
import { copies, defaultLang, langs } from "@/i18n";
import { pageFor, pages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ lang, url, path }) => ({
    url: `${site.url}${url}`,
    // 法律页面用 frontmatter 的修订日期；首页与下载页没有可靠的修改时间，不写比写错好。
    ...(path === "/privacy/" || path === "/terms/" ? { lastModified: legalFrontmatters[lang][path].updated } : {}),
    alternates: {
      languages: {
        ...Object.fromEntries(langs.map((other) => [copies[other].htmlLang, `${site.url}${pageFor(other, path).url}`])),
        "x-default": `${site.url}${pageFor(defaultLang, path).url}`,
      },
    },
  }));
}
