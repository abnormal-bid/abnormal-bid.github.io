import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

/** @next/mdx 在 App Router 下要求有这个文件；法律文档用默认元素，样式在 LegalDocument.module.css。 */
export function useMDXComponents(): MDXComponents {
  return components;
}
