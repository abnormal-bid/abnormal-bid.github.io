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
  title: "Abnormal — AI 订阅服务",
  description:
    "Abnormal 提供 AI 订阅代办咨询。了解 ChatGPT、Claude、Gemini、Cursor 等产品的订阅方案，确认费用与办理方式，让好用的 AI 更近一步。",
  socialTitle: "Abnormal — 好用的 AI，轻松拥有。",
  socialDescription: "AI 订阅代办咨询。少一点折腾，多一点创造。",
  // 这里只填写公开的业务联系方式，不要放入密钥或其他敏感信息。
  contact: { wechat: "", email: "", telegram: "" } satisfies Contact,
};

// 套餐尚未确认时将 price 留空，页面自动显示「咨询报价」。
// Tailwind 样式写为完整类名，保证构建时可以静态扫描。
export const products: readonly Product[] = [
  {
    name: "ChatGPT",
    category: "日常全能",
    mark: "◎",
    markClass: "bg-[#e7f4ee] text-[#248b67]",
    description: "写作、学习、头脑风暴，为每一天多加一点灵感。",
    tags: ["内容创作", "日常助手"],
    price: "",
    priceNote: "按套餐与时长确认",
  },
  {
    name: "Claude",
    category: "深度思考",
    mark: "✳",
    markClass: "bg-[#faece5] text-[#c87755]",
    description: "从长文梳理到细致推敲，陪你把复杂的想法理清楚。",
    tags: ["深度写作", "文档分析"],
    price: "",
    priceNote: "按套餐与时长确认",
    featured: true,
  },
  {
    name: "Gemini",
    category: "多面探索",
    mark: "✦",
    markClass: "bg-[#edf0ff] text-[#6b79da]",
    description: "文字、图像与更多信息，换个角度，发现新的答案。",
    tags: ["多模态", "研究学习"],
    price: "",
    priceNote: "按套餐与时长确认",
  },
  {
    name: "Cursor",
    category: "编程搭档",
    mark: "↖",
    markClass: "bg-[#f0f0f2] text-[#24252c]",
    description: "从第一个想法到下一次提交，让你的代码更快跟上思路。",
    tags: ["辅助编程", "开发效率"],
    price: "",
    priceNote: "按套餐与时长确认",
  },
];

export const navigation = [
  { href: "#subscriptions", label: "订阅服务" },
  { href: "#how-it-works", label: "如何订阅" },
  { href: "#faq", label: "常见问题" },
] as const;

export const subscriptionDurations = [
  "1 个月",
  "3 个月",
  "6 个月",
  "12 个月",
  "尚未确定",
] as const;
export const otherProduct = "其他 / 团队订阅";
export const undecidedProduct = "尚未确定";

export const processSteps = [
  {
    icon: "chat",
    title: "聊聊你的需求",
    description:
      "选择想订阅的 AI 产品，告诉我们目标套餐和使用时长；还没想好，也可以先聊聊用途。",
  },
  {
    icon: "shield",
    title: "确认方案与费用",
    description:
      "沟通可办理的方案、总费用、预计交付时间与售后约定，确认清楚后再决定。",
  },
  {
    icon: "spark",
    title: "完成办理，开始创造",
    description: "按确认的方式办理并验收订阅结果，把时间留给真正想做的事。",
  },
] as const;

export const faqs = [
  {
    question: "这是 AI 产品的官方服务吗？",
    answer:
      "Abnormal 提供独立的 AI 订阅代办咨询，并非相关产品的官方网站，也不代表其运营方。产品名称仅用于说明可咨询的订阅需求。",
  },
  {
    question: "订阅价格是多少？有哪些套餐？",
    answer:
      "价格取决于产品、套餐、时长及当时可用的办理方式。具体能否办理、总费用与费用明细会在下单前确认；未列出的产品也可以提出咨询。",
  },
  {
    question: "是使用自己的账号吗？需要提供什么？",
    answer:
      "账号与办理方式会在确认方案时说明。初次咨询只需提供产品、套餐和时长，请勿发送密码、验证码、恢复码或支付信息。涉及账号操作时，需先确认方式及必要信息的使用范围。",
  },
  {
    question: "通常多久可以完成订阅？",
    answer:
      "不同产品和办理方式所需时间不同。我们会在付款前与你确认预计交付时间与验收方式，具体以双方确认的方案为准。",
  },
  {
    question: "如果办理失败，或需要退款怎么办？",
    answer:
      "办理失败、未完成或主动取消时的处理方式与退款条件，需在付款前确认。开通后的问题也请通过原咨询渠道联系，并提供订单相关信息，以便按约定处理。",
  },
] as const;
