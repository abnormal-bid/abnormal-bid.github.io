export interface Contact {
  wechat: string;
  email: string;
  telegram: string;
}

export interface Product {
  name: string;
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
    "Abnormal 提供邮箱服务，面向个人与团队的日常通信需求，支持邮箱开通、域名邮箱方案咨询与配置协助。了解服务内容与费用，让沟通更简单。",
  socialTitle: "Abnormal — 好用的邮箱，沟通更简单。",
  socialDescription: "从个人通信到团队往来，找到适合你的邮箱服务。",
  // 这里只填写公开的业务联系方式，不要放入密钥或其他敏感信息。
  contact: {
    wechat: "",
    email: "support@abnormal.bid",
    telegram: "",
  } satisfies Contact,
};

// 套餐尚未确认时将 price 留空，页面自动显示「咨询报价」。
// Tailwind 样式写为完整类名，保证构建时可以静态扫描。
export const products: readonly Product[] = [
  {
    name: "个人邮箱",
    category: "日常通信",
    mark: "✉",
    markClass: "bg-[#e7f4ee] text-[#248b67]",
    description: "为日常收发、学习与工作往来，选择适合自己的邮箱。",
    tags: ["日常收发", "个人使用"],
    price: "",
    priceNote: "按容量与使用时长确认",
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
    featured: true,
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
    icon: "chat",
    title: "聊聊你的需求",
    description:
      "告诉我们邮箱用途、所需数量与使用时长；有域名或客户端配置需求，也可以一起说明。",
  },
  {
    icon: "shield",
    title: "确认方案与费用",
    description:
      "沟通邮箱容量、服务范围、总费用、预计开通时间与支持方式，确认清楚后再决定。",
  },
  {
    icon: "spark",
    title: "完成开通，开始沟通",
    description: "按确认的方案开通与配置邮箱，检查收发是否正常，开始日常使用。",
  },
] as const;

export const faqs = [
  {
    question: "Abnormal 提供什么服务？",
    answer:
      "我们提供邮箱服务，围绕个人与团队的日常通信需求，提供邮箱开通、域名邮箱方案咨询与配置协助。具体服务内容以双方确认的方案为准。",
  },
  {
    question: "邮箱服务如何收费？",
    answer:
      "费用根据邮箱数量、容量、使用时长和配置需求确定。我们会在开通前说明服务范围、总费用与续费条件，具体以咨询时确认的方案为准。",
  },
  {
    question: "开通前需要提供哪些信息？",
    answer:
      "初次咨询只需说明用途、邮箱数量和使用时长；涉及域名邮箱时，可以补充域名与期望的地址。请勿在咨询中发送密码、验证码、恢复码或支付信息，所需配置操作会另行说明。",
  },
  {
    question: "可以使用自己的域名或邮件客户端吗？",
    answer:
      "可以先告诉我们你的域名、设备与常用邮件客户端。我们会根据需求确认适用的方案、所需配置和支持范围；域名接入需由你确认拥有相应管理权限。",
  },
  {
    question: "开通需要多久？遇到问题怎么办？",
    answer:
      "开通时间取决于邮箱数量与配置需求，我们会在付款前确认预计时间、验收方式和取消退款条件。使用中遇到问题，可通过原咨询渠道联系我们，按确认的服务范围提供支持。",
  },
] as const;
