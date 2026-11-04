import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { copies } from "@/i18n";
import { pageFor, pages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ url, path }) => ({
    url: `${site.url}${url}`,
    alternates: {
      languages: {
        [copies.zh.htmlLang]: `${site.url}${pageFor("zh", path).url}`,
        [copies.en.htmlLang]: `${site.url}${pageFor("en", path).url}`,
        "x-default": `${site.url}${pageFor("zh", path).url}`,
      },
    },
  }));
}
