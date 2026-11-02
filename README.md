# Abnormal · 邮箱服务

[线上网站](https://abnormal.bid/) · [发布记录](https://github.com/abnormal-bid/abnormal-bid.github.io/releases)

使用 Astro、Tailwind CSS 4 和 TypeScript 构建的中英双语邮箱服务官网。官网是整个 Abnormal 的落地页：介绍邮箱服务，并把访客引向购买、兑换开通、网页邮箱、教程与服务状态这几个站点；域名邮箱、团队邮箱与配置协助仍通过咨询弹窗沟通。Astro 预渲染静态页面，导航菜单、主题切换与咨询弹窗使用轻量客户端 JavaScript；GitHub Actions 验证并部署到 GitHub Pages，release-please 管理版本与更新日志。

## 中英文

中文在根路径（`/`、`/privacy/`、`/terms/`），英文在 `/en/` 下（`/en/`、`/en/privacy/`、`/en/terms/`），由 `astro.config.mjs` 的 `i18n` 配置（`prefixDefaultLocale: false`）。页头的「EN / 中」切换到另一种语言的同一页面；每页都输出互指的 `hreflang`，`x-default` 指向中文版。不按浏览器语言自动跳转。

- 全部界面文案在 `src/i18n/zh.ts` 与 `src/i18n/en.ts`，二者都实现 `src/i18n/types.ts` 的 `Copy`，漏写字段会在 `pnpm typecheck` 时报错；`tests/i18n.test.ts` 还会检查两份文案的结构（列表长度、字段）一致。组件用 `useCopy(Astro.currentLocale)` 取当前语言的文案、联动地址与带语言前缀的站内路径。
- 中文标题用全角句号、英文用半角，取 `t.dot`；只在部分宽度换行的标题，两行之间用 `t.space`（英文是空格）。
- 联动地址由 `linksFor(lang)` 生成：onboard 的英文页在 `/en/` 下，网页邮箱与状态页按浏览器语言显示，两种语言用同一个地址。
- 客户端脚本（主题菜单、移动端导航、咨询弹窗）不内嵌文案，读取组件渲染在 `data-*` 上的当前语言文字；咨询内容与邮件主题由 `src/lib/inquiry.ts` 按语言生成。
- 法律页面：中文 `src/pages/privacy.md`、`terms.md`，英文 `src/pages/en/privacy.md`、`terms.md`。英文版开头注明是译文、以中文版为准；修改条款时两边一起改，并同步 `updated`。

## 与其他站点联动

官网本身不收款、不开通邮箱，实际操作都在下面几个站点完成。地址统一由 `src/data/site.ts` 的 `linksFor(lang)` 生成（onboard 的英文页在 `/en/` 下），页头、首屏、「从这里开始」入口卡片、服务卡片、开通流程、收尾面板与页脚都从这里取，换域名时只改这一处。

| 入口           | 地址                                         | 所在仓库                                           |
| -------------- | -------------------------------------------- | -------------------------------------------------- |
| 购买邮箱       | `https://onboard.abnormal.bid/shop/`         | [onboard](https://github.com/abnormal-bid/onboard) |
| 兑换开通       | `https://onboard.abnormal.bid/`              | onboard                                            |
| 我的订单与续费 | `https://onboard.abnormal.bid/shop/account/` | onboard                                            |
| 使用教程       | `https://onboard.abnormal.bid/guide/`        | onboard                                            |
| 网页邮箱       | `https://webmail.abnormal.bid/`              | [mail](https://github.com/abnormal-bid/mail)       |
| 服务状态       | `https://mailhq.abnormal.bid/status`         | mail                                               |

反方向：onboard 页头与页脚的「官网」、网页邮箱登录页与状态页的「官网」链接都指回 `https://abnormal.bid/`。

首页从上到下：首屏（购买邮箱 / 我有兑换码 / 登录网页邮箱）→ 01 从这里开始（四张入口卡片与订单、状态、客服链接）→ 02 邮箱服务（个人邮箱直达商店，其余三项咨询）→ 03 开通流程（选购套餐 → 兑换开通 → 登录收发，每步带链接）→ 04 常见问题 → 收尾面板（购买邮箱 + 聊聊定制需求）。

## 开发

开发设置与 [mail](https://github.com/abnormal-bid/mail)、[onboard](https://github.com/abnormal-bid/onboard) 一致：Node.js 24（见 `.node-version`）、pnpm 12（版本写在 `package.json` 的 `packageManager`）、Prettier（行宽 120）、ESLint、husky + lint-staged + commitlint。

```sh
pnpm install
pnpm dev
```

开发地址为 `http://localhost:4321`。

```sh
pnpm check         # lint + typecheck + test
pnpm lint          # ESLint（含 eslint-plugin-astro）
pnpm typecheck     # Astro 与 TypeScript 检查
pnpm test          # 咨询逻辑、文案结构与主题偏好测试
pnpm format:check  # 格式检查
pnpm build         # 生成 dist/
pnpm preview       # 预览生产构建
```

`pnpm install` 会通过 `prepare` 装好 git 钩子：提交前 lint-staged 只处理暂存的文件（代码与 `.astro` 先 `eslint --fix` 再 `prettier --write`），提交信息由 commitlint 按 Conventional Commits 检查（允许的类型与 mail 相同）。Dependabot 每周一检查 npm 依赖与 GitHub Actions 的更新。

Astro 检查器当前支持 TypeScript 5/6，因此本项目使用兼容的 TypeScript 6。

## 项目结构

```text
src/
  components/     导航、Hero、邮箱服务卡片、流程、FAQ、咨询弹窗等 Astro 组件
  data/site.ts    公开联系方式与联动站点地址（linksFor）
  i18n/          中英文文案（zh.ts、en.ts、types.ts）与语言路径工具
  layouts/       共享 HTML 布局、法律页面布局、SEO 与全局样式入口
  lib/inquiry.ts 咨询文案和联系方式选择的纯函数
  pages/         页面路由：首页与 Markdown 法律页面；en/ 下是英文版
  scripts/       导航、主题及咨询弹窗的客户端交互
  styles/        Tailwind 主题、基础样式和共享 utility
public/          favicon 等直接复制到发布目录的静态文件
tests/           咨询逻辑与主题行为回归测试
```

主要布局、排版、状态和响应式设计使用 Tailwind utility；Hero 特有的轨道和卡片装饰使用组件内的少量局部 CSS。没有保留旧的全局 `styles.css` 或 `window.SITE_CONFIG`。

## 视觉设计

视觉与 [mailhq](https://github.com/abnormal-bid/mail) 及 [onboard](https://github.com/abnormal-bid/onboard) 统一：Anthropic 品牌配色（暖调象牙与墨色、深色主题暖炭灰），Inter 字体，唯一的强调色品牌橙，套在 Resend 式的结构上——1px 细线分隔、面板不铺底色、没有阴影。

- `src/styles/global.css` 的令牌（配色、圆角、焦点色）照抄 mailhq 的 `src/app/globals.css`，改配色时几边一起改。组件内直接用 `var(--text)`、`var(--text-secondary)`、`var(--border)` 等原始令牌；Tailwind 工具类用 `text-foreground`、`text-muted-foreground`、`text-brand` 等映射名。
- 品牌橙只用在主按钮、品牌标记、小标前的圆点、标题末尾的句号与少量装饰点；勾选图标、链接悬停与编号都用墨色或灰色。浅色下主按钮用加深一级的陶土色 `#b85636`（白字 4.75:1），深色下用 `#d97757` 配深字。
- 圆角照 Resend：徽章 8px、按钮与控件 12px、小面板 16px、卡片与对话框 24px。按钮按下缩到 0.98，悬停只改底色或描边，不上浮、不加阴影。
- 控件照 mailhq：半透明 `control` 底、`input` 细描边；悬停与聚焦时描边加深，键盘焦点是 2px 灰色描边。只有浮层（主题菜单、咨询对话框）使用 `--popover-bg` 与浮层阴影。
- 品牌标记沿用字母 a 与箭头，照 mailhq 的 BrandMark 放在品牌橙圆角方块里；`public/favicon.svg` 与 onboard 同一枚图标。
- Inter 可变字体（拉丁子集，OFL）自托管在 `public/fonts/`，与 mailhq 同一份文件，页面头部预载；中文字形回退到苹方 / 微软雅黑等系统字体，不访问 Google Fonts。

## 外观主题

导航栏提供「跟随系统」「浅色模式」「深色模式」。首次访问默认跟随系统，系统外观变化时同步更新；手动选择保存在当前浏览器的 `localStorage`（`abnormal-theme`），选择跟随系统会清除该偏好。不同标签页自动同步选择，浏览器禁用存储时仍可临时切换。

主题初始化脚本在页面头部同步执行，提前设置实际主题，避免刷新时闪过错误配色。全局色彩在 `src/styles/global.css` 维护，浅色与深色各一套令牌，挂在 `<html data-theme>` 上；脚本未运行时按系统偏好取色。`<meta name="theme-color">` 随生效的主题切换（`#faf9f5` / `#1f1e1d`）。

## 配置经营信息

联系方式在 `src/data/site.ts`，服务与价格文案在 `src/i18n/zh.ts` / `en.ts`：

- `site.contact.wechat`：真实微信号。
- `site.contact.email`：真实咨询邮箱；邮件咨询按钮会填入选定的服务类型、使用时长和需求。
- `site.contact.telegram`：完整的 `https://t.me/...` 链接。有效 Telegram 优先；无效时回退到邮箱。
- `services.products`（两份文案各一套）：统一维护邮箱服务名称、类别、描述、标签、`price` 与 `priceNote`。`price` 留空时显示「咨询报价」；填了 `href` 的卡片按钮直接前往该地址（如商店），否则打开咨询弹窗。
- `linksFor`（site.ts）与 `start.entries`、`process.steps`（文案）：联动站点地址、首页入口卡片与开通流程；文案里用 `link` 键引用地址。

这些配置会公开到网页中，请勿放入密钥、密码或私人信息。修改后提交到 `main` 即会重新构建并发布。

联系信息未配置时，页面明确提示「咨询渠道即将公布」。咨询弹窗只在浏览器内整理和复制需求，不发送数据、不创建订单，也不收款。具体套餐、费用及服务条件需事先确认。

## 隐私政策与服务条款

`src/pages/privacy.md` 与 `src/pages/terms.md`（英文版在 `src/pages/en/`）通过 `src/layouts/LegalLayout.astro` 渲染，发布路径为 `/privacy/` 与 `/terms/`（英文 `/en/privacy/`、`/en/terms/`），页脚与咨询弹窗都有入口。正文使用 Markdown 编写，每个二级标题自动编号并生成目录；「联系我们」一节由布局根据 `site.contact` 生成，正文中无需重复联系方式。

frontmatter 字段：`title`、`description`（页面 meta 描述）、`eyebrow`（页首英文小标）、`summary`（页首导语）、`effective` 与 `updated`（`YYYY-MM-DD`，修改正文后请更新 `updated`）、`highlights`（页首「要点速览」）。

两份文本覆盖官网、商店与开通页（onboard）、网页邮箱与状态页（mail）。其中与系统行为对应的部分（订阅服务期限从付款成功时起算、到期后 7 天宽限期与 30 天保留期、购买会话 Cookie、15 分钟登录链接、AI 功能的数据流向）照 mail 仓库 `src/lib/shop/` 与 onboard 的文案写成，相关逻辑变化时请同步修改。

以下是经营上的约定而不是系统行为，正式经营前请按实际情况核对：订单记录保留期限（12 个月）、退款规则（未使用兑换码全额退、已开通原则上不退、订阅扣款后 48 小时酌情退）、答复与验收时限、管理员访问邮箱的情形、适用法律与管辖法院，以及是否需要补充经营主体名称。

## 检查和部署

`.github/workflows/pages.yml` 会在 PR 和 `main` 推送时执行安装、格式检查、ESLint、类型检查、测试与构建。只有 `main` 推送或在 `main` 手动触发工作流才会上传并部署 `dist/`。

仓库 **Settings → Pages → Build and deployment** 的 Source 应设为 **GitHub Actions**。`astro.config.mjs` 使用组织根域名，因此无需设置 `base` 子路径。部署失败时，上一个成功版本继续可用。

工作流使用内置 `GITHUB_TOKEN`，不需要另加 PAT。第三方 Actions 固定到已验证的完整 commit SHA；Pages 写入与 OIDC 权限仅授予部署任务。

## release-please 发版

`.github/workflows/release-please.yml` 在 `main` 推送后维护版本 PR；合并版本 PR 后，下一次运行会创建对应 `v*` 标签和 GitHub Release。`package.json`、`.release-please-manifest.json` 和 `CHANGELOG.md` 由 release-please 同步更新。

使用 Conventional Commits：

- `feat: ...` → 次版本。
- `fix: ...` → 补丁版本。
- `feat!: ...` 或 `BREAKING CHANGE:` → 主版本。
- 单独的 `docs:`、`chore:`、`refactor:` 默认不会开启一个新版本。

本次迁移从已有 `1.0.0` 版本记录开始，以原始提交作为 bootstrap 基点，无需手动制作旧标签。后续不要手动修改版本或更新日志，审阅并合并 release-please 生成的版本 PR 即可。

GitHub 默认不会因 `GITHUB_TOKEN` 创建的 PR 触发另一条 `pull_request` 工作流，因此发布工作流中额外检出生成 PR 的实际 head SHA，并执行安装、ESLint、类型检查、测试与构建。检查结果显示在对应的 **Release Please** 工作流中。如果今后启用必须通过 PR head 检查的分支保护，可在版本 PR 分支手动触发 **Check and Deploy**（该分支只检查、不部署），或配置专用 GitHub App。

仓库 **Settings → Actions → General → Workflow permissions** 需要允许 GitHub Actions 创建 PR。保留默认只读权限，具体工作流按任务显式申请写入权限；工作流不会自动批准或自动合并 PR。

## 其他

- 使用原生 `<dialog>` 和 `<details>`，支持键盘操作、Esc 关闭、焦点恢复与减少动态效果偏好。
- 不包含统计脚本、Cookie 或客户数据存储。
- 字体随站点自托管，不请求第三方字体服务。
- 首屏邮箱界面与地址卡片为服务概念示意，不代表实际邮件客户端界面。
