export interface Contact {
  wechat: string;
  email: string;
  telegram: string;
}

export interface Product {
  name: string;
  /** 站外入口：有值时卡片按钮直接前往（如商店），否则打开咨询弹窗。 */
  href?: string;
  actionLabel?: string;
  category: string;
  description: string;
  tags: readonly string[];
  mark: string;
  markClass: string;
  price: string;
  priceNote: string;
  featured?: boolean;
}

export const site = {
  title: "Abnormal — 邮箱服务",
  description:
    "Abnormal 邮箱服务：在线选购 @abnormal.bid 邮箱，用兑换码自助开通，网页邮箱与邮件客户端都能收发；域名邮箱、团队邮箱与配置协助可咨询。",
  socialTitle: "Abnormal — 好用的邮箱，沟通更简单。",
  socialDescription:
    "在线选购、自助开通 @abnormal.bid 邮箱，开通后即可在网页或邮件客户端收发。",
  // 这里只填写公开的业务联系方式，不要放入密钥或其他敏感信息。
  contact: {
    wechat: "",
    email: "support@abnormal.bid",
    telegram: "",
  } satisfies Contact,
};

/**
 * 与官网联动的其他站点。官网是落地页：购买、开通、登录与教程都在这些站点完成，
 * 页头、首屏、入口卡片、流程、页脚统一从这里取地址，换域名时只改这一处。
 * - onboard（abnormal-bid/onboard）：兑换开通页、邮箱商店、买家账户与教程。
 * - webmail / status（abnormal-bid/mail）：网页邮箱与公开状态页。
 */
const onboardOrigin = "https://onboard.abnormal.bid";
export const links = {
  shop: `${onboardOrigin}/shop/`,
  redeem: `${onboardOrigin}/`,
  account: `${onboardOrigin}/shop/account/`,
  guide: `${onboardOrigin}/guide/`,
  webmail: "https://webmail.abnormal.bid/",
  status: "https://mailhq.abnormal.bid/status",
} as const;

/** 首页「从这里开始」的入口卡片，按用户所处阶段排列：没有邮箱 → 有兑换码 → 已开通 → 想用得更顺手。 */
export const entryPoints = [
  {
    icon: "cart",
    eyebrow: "还没有邮箱",
    title: "购买邮箱",
    description:
      "选好套餐，用 Linux DO Credit 或银行卡付款。付款确认后自动发放兑换码。",
    href: links.shop,
    action: "前往商店",
    primary: true,
  },
  {
    icon: "ticket",
    eyebrow: "已有兑换码",
    title: "兑换开通",
    description:
      "输入 16 位兑换码，自己取用户名、设密码，一次可开通多个，开通后立即可用。",
    href: links.redeem,
    action: "立即开通",
  },
  {
    icon: "mail",
    eyebrow: "已经开通",
    title: "网页邮箱",
    description:
      "在浏览器里收发邮件，用完整邮箱地址和密码登录，可同时登录多个邮箱。",
    href: links.webmail,
    action: "登录邮箱",
  },
  {
    icon: "book",
    eyebrow: "开通之后",
    title: "使用教程",
    description:
      "在手机或电脑的邮件客户端里收发、修改密码，以及用它注册 Claude 与 ChatGPT。",
    href: links.guide,
    action: "查看教程",
  },
] as const;

/** 入口卡片下方的次要链接。 */
export const secondaryLinks = [
  { href: links.account, label: "我的订单与续费" },
  { href: links.status, label: "服务状态" },
] as const;

// 套餐尚未确认时将 price 留空，页面自动显示「咨询报价」。
// Tailwind 样式写为完整类名，保证构建时可以静态扫描。
export const products: readonly Product[] = [
  {
    name: "个人邮箱",
    category: "日常通信",
    mark: "✉",
    markClass: "bg-[#e7f4ee] text-[#248b67]",
    description:
      "@abnormal.bid 邮箱，在线选购、自助开通，适合日常收发与注册常用服务。",
    tags: ["在线购买", "自助开通"],
    price: "在线选购",
    priceNote: "套餐与价格以商店页面为准",
    href: links.shop,
    actionLabel: "前往商店购买",
    featured: true,
  },
  {
    name: "域名邮箱",
    category: "专属地址",
    mark: "@",
    markClass: "bg-[#faece5] text-[#c87755]",
    description: "围绕你的域名规划邮箱地址，让每一次联系都带上自己的名字。",
    tags: ["域名咨询", "地址规划"],
    price: "",
    priceNote: "按域名与配置需求确认",
  },
  {
    name: "团队邮箱",
    category: "工作往来",
    mark: "+",
    markClass: "bg-[#edf0ff] text-[#6b79da]",
    description: "按成员数量与工作用途规划邮箱，方便团队开展日常沟通。",
    tags: ["团队使用", "按需配置"],
    price: "",
    priceNote: "按邮箱数量与时长确认",
  },
  {
    name: "邮箱配置",
    category: "使用支持",
    mark: "⚙",
    markClass: "bg-[#f0f0f2] text-[#24252c]",
    description: "协助了解收发设置与客户端配置，让邮箱融入你的日常工作。",
    tags: ["配置协助", "使用指导"],
    price: "",
    priceNote: "按具体服务范围确认",
  },
];

export const navigation = [
  { href: "/#start", label: "开始使用" },
  { href: "/#services", label: "邮箱服务" },
  { href: "/#how-it-works", label: "开通流程" },
  { href: "/#faq", label: "常见问题" },
] as const;

// 法律页面入口：页脚与咨询弹窗都会引用，路径带尾部斜杠以匹配 GitHub Pages 的目录发布。
export const legalPages = [
  { href: "/privacy/", label: "隐私政策" },
  { href: "/terms/", label: "服务条款" },
] as const;

export const serviceDurations = [
  "1 个月",
  "3 个月",
  "6 个月",
  "12 个月",
  "尚未确定",
] as const;
export const otherProduct = "其他邮箱需求";
export const undecidedProduct = "尚未确定";

export const processSteps = [
  {
    icon: "cart",
    title: "选购套餐",
    description:
      "在商店选择邮箱数量与容量，用 Linux DO Credit 或银行卡付款；付款确认后自动发放兑换码。",
    href: links.shop,
    action: "前往商店",
  },
  {
    icon: "ticket",
    title: "兑换开通",
    description:
      "在开通页输入兑换码，自己取用户名、设密码。密码只显示一次，记得保存。",
    href: links.redeem,
    action: "前往开通",
  },
  {
    icon: "mail",
    title: "登录收发",
    description:
      "用完整邮箱地址登录网页邮箱，或按教程在邮件客户端里通过 IMAP / SMTP 收发。",
    href: links.webmail,
    action: "登录网页邮箱",
  },
] as const;

export const faqs = [
  {
    question: "Abnormal 提供什么服务？",
    answer:
      "我们提供 @abnormal.bid 邮箱：在商店在线选购，用兑换码自助开通，开通后可以在网页邮箱或常用邮件客户端里收发。需要自己的域名、团队批量开通或配置协助，可以先咨询。",
  },
  {
    question: "怎么购买并开通邮箱？",
    answer:
      "在商店选择套餐并付款（支持 Linux DO Credit 与银行卡），付款确认后会自动发放兑换码；回到开通页输入兑换码，取用户名、设密码即可。已经有兑换码的，可以直接去开通页。",
  },
  {
    question: "开通之后在哪里登录？",
    answer:
      "网页邮箱地址是 webmail.abnormal.bid，登录名是完整的邮箱地址，密码是开通时设置的那一个。也可以在手机或电脑的邮件客户端里添加账号，服务器地址见开通结果与使用教程。",
  },
  {
    question: "订单、续费或自动扣款在哪里管理？",
    answer:
      "在商店的「我的账户」页面可以查看订单、领取兑换码和续费；银行卡订阅的自动续费也在那里更换银行卡或取消。",
  },
  {
    question: "可以使用自己的域名或为团队开通吗？",
    answer:
      "可以先告诉我们你的域名、邮箱数量和使用时长。我们会确认适用的方案、所需配置和费用；域名接入需由你确认拥有相应管理权限。请勿在咨询中发送密码、验证码、恢复码或支付信息。",
  },
  {
    question: "遇到问题怎么办？",
    answer:
      "收发异常时可以先看服务状态页，确认是否有故障或维护；其他问题写信到客服邮箱，附上邮箱地址或订单号会更快处理。",
  },
] as const;
