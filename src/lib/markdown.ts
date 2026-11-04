/**
 * 给 Agent 读的 Markdown：首页由界面文案生成，法律页面用 MDX 正文，llms.txt 是两者的目录。
 * 文案只有 src/i18n 一份，改了界面文案，这里跟着变。
 */
import { linksFor, site, type Lang } from "../data/site.ts";
import { copies } from "../i18n/index.ts";
import type { LegalFrontmatter } from "../content/legal/types.ts";
import { pageFor, pagePaths } from "./pages.ts";

const absolute = (path: string) => `${site.url}${path}`;
const paragraphs = (lines: readonly string[]) => lines.join("\n\n");
const list = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");

export function homeMarkdown(lang: Lang): string {
  const t = copies[lang];
  const links = linksFor(lang);
  const email = site.contact.email;

  return `${paragraphs([
    `# ${t.meta.title}`,
    t.meta.description,
    `## ${t.start.title}`,
    list([
      ...t.start.entries.map((entry) => `[${entry.title}](${links[entry.link]}): ${entry.description}`),
      ...t.start.secondary.map((item) => `[${item.label}](${links[item.link]})`),
    ]),
    `## ${t.services.titleLines.join(t.space)}`,
    ...t.services.products.flatMap((product) => [
      `### ${product.name}`,
      product.description,
      product.link
        ? `[${product.actionLabel ?? product.name}](${links[product.link]}): ${product.priceNote}`
        : `${t.services.priceFallback}: ${product.priceNote}`,
    ]),
    t.services.noteFine,
    `## ${t.process.title}`,
    t.process.steps
      .map((step, index) => `${index + 1}. ${step.title}: ${step.description} [${step.action}](${links[step.link]})`)
      .join("\n"),
    `## ${t.faq.title}`,
    ...t.faq.items.flatMap((item) => [`### ${item.question}`, item.answer]),
    `## ${t.footer.contactLabel}`,
    `${t.start.support}: [${email}](mailto:${email})`,
    `## ${t.footer.legalLabel}`,
    list(t.legalPages.map((page) => `[${page.label}](${absolute(pageFor(lang, toPagePath(page.path)).markdown)})`)),
  ])}\n`;
}

/** 文案里的法律页面路径是普通字符串，这里确认它确实是清单里的页面。 */
function toPagePath(path: string) {
  const match = pagePaths.find((pagePath) => pagePath === path);
  if (!match) throw new Error(`Unknown page path: ${path}`);
  return match;
}

/** 去掉 MDX 开头的 frontmatter，留下正文。法律文档里没有 JSX，正文就是 Markdown。 */
export function stripFrontmatter(source: string): string {
  return source.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
}

export function legalMarkdown(lang: Lang, frontmatter: LegalFrontmatter, body: string): string {
  const l = copies[lang].legal;
  return `${paragraphs([
    `# ${frontmatter.title}`,
    frontmatter.summary,
    list([`${l.effective}: ${frontmatter.effective}`, `${l.updated}: ${frontmatter.updated}`]),
    `## ${l.highlights}`,
    list(frontmatter.highlights),
    l.highlightsNote,
    body,
  ])}\n`;
}

function llmsSection(lang: Lang, heading: string): string {
  const t = copies[lang];
  const links = linksFor(lang);
  return paragraphs([
    `## ${heading}`,
    list([
      `[${t.meta.title}](${absolute(pageFor(lang, "/").markdown)})`,
      ...t.legalPages.map((page) => `[${page.label}](${absolute(pageFor(lang, toPagePath(page.path)).markdown)})`),
      ...[...t.footer.productLinks, ...t.footer.supportLinks].map((item) => `[${item.label}](${links[item.link]})`),
    ]),
  ]);
}

/** 格式见 https://llmstxt.org/。中文是官网的默认语言，放在前面。 */
export function llmsTxt(): string {
  return `${paragraphs([
    "# Abnormal",
    `> ${copies.zh.meta.description}`,
    `> ${copies.en.meta.description}`,
    llmsSection("zh", "中文"),
    llmsSection("en", "English"),
  ])}\n`;
}
