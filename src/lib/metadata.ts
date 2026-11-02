import type { Metadata } from "next";
import { site } from "@/data/site";

// 子页面的 openGraph 会整体覆盖父级，所以每个页面都从这里生成完整的一份。
export function pageMetadata({
  path,
  title = site.title,
  description = site.description,
}: {
  path: string;
  title?: string;
  description?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: site.socialTitle,
      description: site.socialDescription,
      type: "website",
      url: path,
      locale: "zh_CN",
    },
  };
}
