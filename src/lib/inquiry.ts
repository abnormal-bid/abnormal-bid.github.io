import type { Contact } from "../data/site.ts";

export interface Inquiry {
  product: string;
  duration: string;
  notes: string;
}

export function formatInquiry({ product, duration, notes }: Inquiry): string {
  return [
    "你好，我想咨询邮箱服务。",
    `服务类型：${product}`,
    `使用时长：${duration}`,
    ...(notes.trim() ? [`需求：${notes.trim()}`] : []),
    "请帮我确认邮箱方案、总费用、开通时间与支持范围。",
  ].join("\n");
}

export function getTelegramUrl(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    if (
      url.protocol === "https:" &&
      url.hostname === "t.me" &&
      !url.username &&
      !url.password &&
      url.pathname !== "/"
    )
      return url.href;
  } catch {
    /* Unconfigured or invalid links must not hide a valid email fallback. */
  }
  return undefined;
}

export function getContactLink(contact: Contact, inquiry: Inquiry) {
  const telegram = getTelegramUrl(contact.telegram);
  if (telegram)
    return {
      type: "telegram",
      href: telegram,
      label: "在 Telegram 咨询",
    } as const;
  const email = contact.email.trim();
  if (email) {
    return {
      type: "email",
      href: `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`邮箱服务咨询 · ${inquiry.product}`)}&body=${encodeURIComponent(formatInquiry(inquiry))}`,
      label: "通过邮件咨询",
    } as const;
  }
  return undefined;
}

export function describeContact(contact: Contact): string {
  const telegram = getTelegramUrl(contact.telegram);
  const parts = [
    contact.wechat.trim() && `微信：${contact.wechat.trim()}`,
    contact.email.trim() && `邮箱：${contact.email.trim()}`,
    telegram && `Telegram：${telegram}`,
  ].filter(Boolean);
  return parts.length
    ? `${parts.join(" · ")}。复制下方咨询内容后联系我们。`
    : "咨询渠道即将公布。你可以先复制需求，稍后再来联系我们。";
}
