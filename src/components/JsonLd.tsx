import { serializeJsonLd } from "@/lib/structured-data";

/** 结构化数据是数据而不是脚本，所以用原生 <script>，不用 next/script。 */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
