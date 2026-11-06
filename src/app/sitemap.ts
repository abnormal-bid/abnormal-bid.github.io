import type { MetadataRoute } from "next";
import { legalFrontmatters } from "@/content/legal/frontmatter";
import { site } from "@/data/site";
import { copies } from "@/i18n";
import { pageFor, pages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ lang, url, path }) => ({
    url: `${site.url}${url}`,
    // 法律页面用 frontmatter 的修订日期；首页没有可靠的修改时间，不写比写错好。
    ...(path === "/" ? {} : { lastModified: legalFrontmatters[lang][path].updated }),
    alternates: {
      languages: {
        [copies.zh.htmlLang]: `${site.url}${pageFor("zh", path).url}`,
        [copies.en.htmlLang]: `${site.url}${pageFor("en", path).url}`,
        "x-default": `${site.url}${pageFor("zh", path).url}`,
      },
    },
  }));
}
