/**
 * 与语言无关的站点配置：公开联系方式与联动站点的地址。两种语言的文案在 src/i18n/。
 * 这里只填写公开的业务联系方式，不要放入密钥或其他敏感信息。
 */

export interface Contact {
  wechat: string;
  email: string;
  telegram: string;
}

export const site = {
  url: "https://abnormalhq.com",
  /** 只负责跳到主域名，见 next.config.ts 的 redirects。 */
  wwwHost: "www.abnormalhq.com",
  contact: {
    wechat: "",
    email: "support@abnormal.bid",
    telegram: "",
  } satisfies Contact,
};

export type Lang = "zh" | "en";

/**
 * 与官网联动的其他站点。官网是落地页：购买、开通、登录与教程都在这些站点完成，
 * 页头、首屏、入口卡片、流程、页脚统一从这里取地址，换域名时只改这一处。
 * - onboard（abnormalhq/onboard）：兑换开通页、邮箱商店、买家账户与教程；英文页在 /en/ 下。
 * - webmail / status（abnormalhq/mail）：网页邮箱与公开状态页，按浏览器语言自动切换，不分路径。
 */
const onboardOrigin = "https://onboard.abnormalhq.com";

export function linksFor(lang: Lang) {
  const onboard = `${onboardOrigin}/${lang === "en" ? "en/" : ""}`;
  return {
    shop: `${onboard}shop/`,
    redeem: onboard,
    account: `${onboard}shop/account/`,
    guide: `${onboard}guide/`,
    webmail: "https://webmail.abnormalhq.com/",
    status: "https://console.abnormalhq.com/status",
  } as const;
}

export type LinkKey = keyof ReturnType<typeof linksFor>;

/**
 * 桌面客户端（abnormalhq/mail 的 desktop/）的下载地址。发布时安装包上传到 R2 公开桶，
 * desktop/latest/ 下是固定文件名的最新版本，这里直接链接；latest.json 列出版本号、SHA-256 与大小。
 */
const downloadsOrigin = "https://downloads.abnormalhq.com";

export const desktopDownloads = {
  macos: `${downloadsOrigin}/desktop/latest/Abnormal-Mail-macos-universal.dmg`,
  windows: `${downloadsOrigin}/desktop/latest/Abnormal-Mail-windows-x64-setup.exe`,
  windowsArm: `${downloadsOrigin}/desktop/latest/Abnormal-Mail-windows-arm64-setup.exe`,
  manifest: `${downloadsOrigin}/desktop/latest.json`,
  brew: "brew install --cask abnormalhq/tap/abnormal-mail",
} as const;
