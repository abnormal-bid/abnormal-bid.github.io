import type { LinkKey } from "../data/site.ts";

/** Icon 组件支持的图标名；文案里的入口与流程图标从这里选。 */
export type IconName =
  | "arrow"
  | "up-right"
  | "check"
  | "plus"
  | "close"
  | "menu"
  | "shield"
  | "chat"
  | "spark"
  | "copy"
  | "sun"
  | "moon"
  | "monitor"
  | "cart"
  | "ticket"
  | "mail"
  | "book";

/** 服务卡片的图标，ProductCard 按这个键画；与卡片在列表里的位置无关。 */
export type ProductIcon = "mail" | "domain" | "team" | "setup";

export interface Product {
  icon: ProductIcon;
  name: string;
  category: string;
  description: string;
  tags: readonly string[];
  /** 价格；留空时显示 services.priceFallback（「咨询报价」）。 */
  price: string;
  priceNote: string;
  /** 站外入口：有值时卡片按钮直接前往（如商店），否则打开咨询弹窗。 */
  link?: LinkKey;
  actionLabel?: string;
  featured?: boolean;
}

export interface LinkItem {
  link: LinkKey;
  label: string;
}

/** 一种语言的全部文案。站外地址只写成 LinkKey，由 linksFor(lang) 换成对应语言的页面。 */
export interface Copy {
  /** <html lang> 与 hreflang。 */
  htmlLang: string;
  ogLocale: string;
  /** 中文标题末尾的句号是全角「。」，英文是「.」。 */
  dot: string;
  /** 只在部分宽度换行的标题里，两行之间的分隔：中文不需要空格，英文要一个。 */
  space: string;
  meta: {
    title: string;
    description: string;
    socialTitle: string;
    socialDescription: string;
  };
  skipLink: string;
  brandLabel: string;
  langToggle: { label: string; aria: string };
  header: {
    navLabel: string;
    mobileNavLabel: string;
    nav: readonly { anchor: string; label: string }[];
    openMenu: string;
    closeMenu: string;
    login: string;
    buy: string;
    haveCode: string;
    loginWebmail: string;
  };
  theme: {
    title: string;
    /** {label} 换成当前选项。 */
    ariaTemplate: string;
    titleTemplate: string;
    options: { system: string; light: string; dark: string };
  };
  hero: {
    titleLines: readonly [string, string];
    description: readonly [string, string];
    buy: string;
    haveCode: string;
    loginPrompt: string;
    loginLink: string;
    promises: readonly string[];
    visualLabel: string;
    mock: {
      overline: string;
      heading: string;
      inbox: string;
      starred: string;
      mails: readonly { title: string; body: string; time: string }[];
      domainNote: string;
      demoLabel: string;
    };
  };
  valueStrip: { lead: string; strong: string; labels: readonly string[] };
  start: {
    title: string;
    intro: readonly [string, string];
    entries: readonly {
      icon: IconName;
      eyebrow: string;
      title: string;
      description: string;
      link: LinkKey;
      action: string;
      primary?: boolean;
    }[];
    secondary: readonly LinkItem[];
    support: string;
  };
  services: {
    titleLines: readonly [string, string];
    intro: readonly [string, string];
    products: readonly Product[];
    priceFallback: string;
    consult: string;
    consultAria: (name: string) => string;
    noteQuestion: string;
    noteAction: string;
    noteFine: string;
  };
  process: {
    title: string;
    intro: readonly [string, string];
    steps: readonly {
      icon: IconName;
      title: string;
      description: string;
      link: LinkKey;
      action: string;
    }[];
  };
  faq: {
    title: string;
    description: string;
    contact: string;
    items: readonly { question: string; answer: string }[];
  };
  closing: {
    titleLines: readonly [string, string];
    body: string;
    buy: string;
    custom: string;
  };
  footer: {
    productLabel: string;
    supportLabel: string;
    contactLabel: string;
    productLinks: readonly LinkItem[];
    supportLinks: readonly LinkItem[];
    faq: string;
    emailAria: (email: string) => string;
    copyright: (year: number) => string;
    buyOnline: string;
    legalLabel: string;
  };
  legalPages: readonly { path: string; label: string }[];
  inquiry: {
    close: string;
    title: string;
    description: readonly [string, string];
    productLabel: string;
    durationLabel: string;
    durations: readonly string[];
    otherProduct: string;
    undecidedProduct: string;
    undecidedLabel: string;
    notesLabel: string;
    optional: string;
    notesPlaceholder: string;
    previewLabel: string;
    copy: string;
    note: string;
    /** 「咨询与服务适用 [服务条款] 与 [隐私政策]。」拆成四段，中间两段是链接。 */
    legal: readonly [string, string, string];
    newWindow: string;
    copied: string;
    copyFailed: string;
    copyFieldLabel: string;
  };
  legal: {
    effective: string;
    updated: string;
    dateLocale: string;
    tocLabel: string;
    tocHint: string;
    highlights: string;
    highlightsNote: string;
    contactTitle: string;
    contactBody: (title: string) => string;
    contactPending: string;
    contactLabels: { email: string; wechat: string; telegram: string };
    colon: string;
    relatedLabel: string;
    seeAlso: (label: string) => string;
    backHome: string;
  };
}
