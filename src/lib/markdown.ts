/**
 * 给 Agent 读的 Markdown：首页由界面文案生成，法律页面用 MDX 正文，llms.txt 是两者的目录。
 * 文案只有 src/i18n 一份，改了界面文案，这里跟着变。
 */
import { desktopDownloads, linksFor, site, type Lang } from "../data/site.ts";
import { copies, langs } from "../i18n/index.ts";
import type { LegalFrontmatter } from "../content/legal/types.ts";
import { contactChannels } from "./inquiry.ts";
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

export function downloadMarkdown(lang: Lang): string {
  const t = copies[lang];
  const d = t.download;
  return `${paragraphs([
    `# ${d.title}`,
    d.intro,
    `## ${d.macos.name}`,
    d.macos.requirement,
    `[${d.macos.download}](${desktopDownloads.macos})`,
    `${d.macos.brewLabel}\n\n\`\`\`sh\n${desktopDownloads.brew}\n\`\`\``,
    d.macos.firstLaunch,
    `## ${d.windows.name}`,
    d.windows.requirement,
    `[${d.windows.download}](${desktopDownloads.windows})`,
    `[${d.windows.armDownload}](${desktopDownloads.windowsArm})`,
    d.windows.firstLaunch,
    `## ${d.signInTitle}`,
    d.signInSteps.map((step, index) => `${index + 1}. ${step}`).join("\n"),
    `[${d.checksums}](${desktopDownloads.manifest})`,
    `${d.webmailNote}${t.space}[${d.webmailLink}](${linksFor(lang).webmail})`,
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
  const contacts = contactChannels(site.contact, l.contactLabels);
  return `${paragraphs([
    `# ${frontmatter.title}`,
    frontmatter.summary,
    list([`${l.effective}: ${frontmatter.effective}`, `${l.updated}: ${frontmatter.updated}`]),
    `## ${l.highlights}`,
    list(frontmatter.highlights),
    l.highlightsNote,
    body,
    // 这一节在 HTML 版本里由 LegalDocument 输出，不在 MDX 正文里，而正文会让读者参照它。
    `## ${l.contactTitle}`,
    l.contactBody(frontmatter.title),
    contacts.length > 0
      ? list(contacts.map(({ label, value, href }) => `${label}${l.colon}${href ? `[${value}](${href})` : value}`))
      : l.contactPending,
  ])}\n`;
}

function llmsSection(lang: Lang, heading: string): string {
  const t = copies[lang];
  const links = linksFor(lang);
  return paragraphs([
    `## ${heading}`,
    list([
      `[${t.meta.title}](${absolute(pageFor(lang, "/").markdown)})`,
      `[${t.download.title}](${absolute(pageFor(lang, "/download/").markdown)})`,
      ...t.legalPages.map((page) => `[${page.label}](${absolute(pageFor(lang, toPagePath(page.path)).markdown)})`),
      ...[...t.footer.productLinks, ...t.footer.supportLinks].map((item) => `[${item.label}](${links[item.link]})`),
    ]),
  ]);
}

/** llms.txt 里各语言小节的标题，用该语言自己的名字。 */
const languageNames: Record<Lang, string> = { en: "English", zh: "中文" };

/** 格式见 https://llmstxt.org/。语言按 langs 的顺序列出，默认语言（英文）在前。 */
export function llmsTxt(): string {
  return `${paragraphs([
    "# Abnormal",
    ...langs.map((lang) => `> ${copies[lang].meta.description}`),
    ...langs.map((lang) => llmsSection(lang, languageNames[lang])),
  ])}\n`;
}
