# Abnormal · 邮箱服务

[线上网站](https://abnormalhq.com/)

使用 Next.js（App Router）、Tailwind CSS 4 和 TypeScript 构建的中英双语邮箱服务官网。官网是整个 Abnormal 的落地页：介绍邮箱服务，并把访客引向购买、兑换开通、网页邮箱、教程与服务状态这几个站点；域名邮箱、团队邮箱与配置协助仍通过咨询弹窗沟通。页面在构建时预渲染，通过 [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) 运行在 Cloudflare Worker 上，导航菜单、主题切换与咨询弹窗是 React 客户端组件；Cloudflare Workers Builds 监听 `main` 自动部署，GitHub Actions 只做检查。

## 中英文

中文在根路径（`/`、`/privacy/`、`/terms/`），英文在 `/en/` 下（`/en/`、`/en/privacy/`、`/en/terms/`），由 `src/app` 下的 `(zh)` 与 `(en)` 两个路由组实现，各有一个根布局。页头的「EN / 中」切换到另一种语言的同一页面；每页都输出互指的 `hreflang`，`x-default` 指向中文版。不按浏览器语言自动跳转。

- 全部界面文案在 `src/i18n/zh.ts` 与 `src/i18n/en.ts`，二者都实现 `src/i18n/types.ts` 的 `Copy`，漏写字段会在 `pnpm typecheck` 时报错；`tests/i18n.test.ts` 还会检查两份文案的结构（列表长度、字段）一致。服务端组件用 `useCopy(lang)` 取当前语言的文案、联动地址与带语言前缀的站内路径。
- 中文标题用全角句号、英文用半角，取 `t.dot`；只在部分宽度换行的标题，两行之间用 `t.space`（英文是空格）。
- 联动地址由 `linksFor(lang)` 生成：onboard 的英文页在 `/en/` 下，网页邮箱与状态页按浏览器语言显示，两种语言用同一个地址。
- 客户端组件（`Header`、`ThemePicker`、`InquiryDialog`）不引用文案模块，由 `SiteLayout` 通过 props 传入各自用得到的文案，浏览器脚本里不带两种语言的全部文案；路径工具放在 `src/i18n/paths.ts` 也是这个原因。咨询内容与邮件主题由 `src/lib/inquiry.ts` 按语言生成。
- 法律页面：中文 `src/content/legal/zh/privacy.mdx`、`terms.mdx`，英文 `src/content/legal/en/privacy.mdx`、`terms.mdx`。英文版开头注明是译文、以中文版为准；修改条款时两边一起改，并同步 `updated`。

## 与其他站点联动

官网本身不收款、不开通邮箱，实际操作都在下面几个站点完成。地址统一由 `src/data/site.ts` 的 `linksFor(lang)` 生成（onboard 的英文页在 `/en/` 下），页头、首屏、「从这里开始」入口卡片、服务卡片、开通流程、收尾面板与页脚都从这里取，换域名时只改这一处。

| 入口           | 地址                                           | 所在仓库                                           |
| -------------- | ---------------------------------------------- | -------------------------------------------------- |
| 购买邮箱       | `https://onboard.abnormalhq.com/shop/`         | [onboard](https://github.com/abnormal-bid/onboard) |
| 兑换开通       | `https://onboard.abnormalhq.com/`              | onboard                                            |
| 我的订单与续费 | `https://onboard.abnormalhq.com/shop/account/` | onboard                                            |
| 使用教程       | `https://onboard.abnormalhq.com/guide/`        | onboard                                            |
| 网页邮箱       | `https://webmail.abnormalhq.com/`              | [mail](https://github.com/abnormal-bid/mail)       |
| 服务状态       | `https://console.abnormalhq.com/status`        | mail                                               |

反方向：onboard 页头与页脚的「官网」、网页邮箱登录页与状态页的「官网」链接都指回 `https://abnormalhq.com/`。

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
pnpm lint          # ESLint（eslint-config-next）
pnpm typecheck     # next typegen 与 TypeScript 检查
pnpm test          # 咨询逻辑、文案结构与主题偏好测试
pnpm format:check  # 格式检查
pnpm build         # next build
pnpm cf:preview    # OpenNext 构建，并在本地 workerd 里预览（端口 8787）
pnpm cf:build      # 完整发布前检查：check、format:check、OpenNext 构建到 .open-next/ 与 wrangler deploy --dry-run
pnpm cf:deploy     # 部署已有的 .open-next/ 产物
```

`pnpm install` 会通过 `prepare` 装好 git 钩子：提交前 lint-staged 只处理暂存的文件（代码先 `eslint --fix` 再 `prettier --write`），提交信息由 commitlint 按 Conventional Commits 检查（允许的类型与 mail 相同）。Dependabot 每周一检查 npm 依赖与 GitHub Actions 的更新。

## 项目结构

```text
src/
  app/            路由：(zh)/ 中文页、(en)/en/ 英文页，各有一个根布局；global-not-found.tsx 是两种语言共用的 404
  components/     SiteLayout、页头、Hero、邮箱服务卡片、流程、FAQ、咨询弹窗等组件，样式放在同名 .module.css
  content/legal/  MDX 编写的隐私政策与服务条款，zh/ 与 en/ 各一份
  data/site.ts    公开联系方式与联动站点地址（linksFor）
  i18n/           中英文文案（zh.ts、en.ts、types.ts）与语言路径工具（paths.ts）
  lib/            inquiry.ts 咨询文案与联系方式的纯函数；metadata.ts 页面 SEO
  scripts/        theme-init.js：内联进头部的主题初始化脚本
  styles/         Tailwind 主题、基础样式和共享 utility
public/           favicon、字体等由静态资源服务直接响应的文件
tests/            咨询逻辑、文案结构与主题行为回归测试
open-next.config.ts  OpenNext 配置：预渲染结果放在只读的静态资源里
wrangler.jsonc       Cloudflare Worker 与静态资源配置
```

主要布局、排版、状态和响应式设计使用 Tailwind utility；组件特有的样式放在 CSS Modules 里。只有 `Header`、`ThemePicker`、`InquiryDialog` 是客户端组件，其余都是服务端组件，在构建时预渲染。Worker 运行时不能用 `fs` 读项目文件，所以法律文档在构建时由 MDX 编译成组件，`theme-init.js` 由 `next.config.ts` 的 `raw-loader` 规则打包成字符串。页面里任意位置要打开咨询弹窗，用 `InquiryButton`（`product` 指定预选的服务）。

## 视觉设计

视觉与 [mailhq](https://github.com/abnormal-bid/mail) 及 [onboard](https://github.com/abnormal-bid/onboard) 统一，用 abnormal 品牌（路线 A）：墨色压在暖灰纸色上、深色主题就是墨色本身，主色就是墨色，荧光黄是唯一的彩色品牌色；正文 Inter、标题 Bricolage Grotesque、代码 JetBrains Mono；套在 Resend 式的结构上——1px 细线分隔、面板不铺底色、没有阴影。

- `src/styles/global.css` 的令牌（配色、圆角、焦点色）照抄 mailhq 的 `src/app/globals.css`，改配色时几边一起改。组件的 CSS Modules 里直接用 `var(--text)`、`var(--text-secondary)`、`var(--border)` 等原始令牌；Tailwind 工具类用 `text-foreground`、`text-muted-foreground`、`text-brand` 等映射名。
- 品牌色就是墨色，只用在主按钮上：浅色下是 `#141412` 配白字（18.4:1），深色下是 `#f0f0ea` 配墨色字（16.1:1）。勾选图标与链接悬停用墨色或灰色。
- 荧光黄 `--highlight`（`#ffe14d`）是唯一的彩色，标记「当前、选中、新、展示」：品牌标记、选中文字、开通流程的编号（像被荧光笔划过的一道黄）、首屏插图的黄色卡片、推荐入口与主推套餐的图标块、咨询弹窗的标题图标。黄色上永远是墨色字，浅色底上不出现黄色文字。
- `--highlight-muted`（浅色 `#fff4bf`、深色 `#34311b`）是柔和的浅黄面，留给选中或当前的行、提示块；上面正文 16.6:1 / 11.5:1、次要文字 6.1:1 / 5.3:1。
- `--signal`（浅色墨色、深色荧光黄）给小号指示用：小标前的圆点、标题末尾的句号、字标 `abnormal.` 的句点、未读点、法律页的章节编号。浅色底上黄色太淡，所以这些小记号在浅色下是墨色。
- 圆角收紧，呼应方形标志：徽章 4px、按钮与控件 6px、小面板 8px、卡片与对话框 12px。按钮按下缩到 0.98，悬停只改底色或描边，不上浮、不加阴影。
- 控件照 mailhq：半透明 `control` 底、`input` 细描边；悬停与聚焦时描边加深，键盘焦点是 2px 灰色描边。只有浮层（主题菜单、咨询对话框）使用 `--popover-bg` 与浮层阴影。
- 品牌标记与 mailhq 的 BrandMark 同一幅图：荧光黄方块上一个墨色小写 a，带纸白色错位影子和右上箭头，颜色固定、不随主题变化；`public/favicon.svg` 也是这幅图。
- Inter（正文）、Bricolage Grotesque（标题）、JetBrains Mono（代码）三款可变字体（拉丁子集，OFL）自托管在 `public/fonts/`，与 mailhq 同一份文件，页面头部预载 Inter 与 Bricolage Grotesque；中文字形回退到苹方 / 微软雅黑等系统字体，不访问 Google Fonts。

## 外观主题

导航栏提供「跟随系统」「浅色模式」「深色模式」。首次访问默认跟随系统，系统外观变化时同步更新；手动选择保存在当前浏览器的 `localStorage`（`abnormal-theme`），选择跟随系统会清除该偏好。不同标签页自动同步选择，浏览器禁用存储时仍可临时切换。

主题初始化脚本在页面头部同步执行，提前设置实际主题，避免刷新时闪过错误配色。全局色彩在 `src/styles/global.css` 维护，浅色与深色各一套令牌，挂在 `<html data-theme>` 上；脚本未运行时按系统偏好取色。`<meta name="theme-color">` 随生效的主题切换（`#f7f7f4` / `#141412`）。

## 配置经营信息

联系方式在 `src/data/site.ts`，服务与价格文案在 `src/i18n/zh.ts` / `en.ts`：

- `site.contact.wechat`：真实微信号。
- `site.contact.email`：真实咨询邮箱；邮件咨询按钮会填入选定的服务类型、使用时长和需求。
- `site.contact.telegram`：完整的 `https://t.me/...` 链接。有效 Telegram 优先；无效时回退到邮箱。
- `services.products`（两份文案各一套）：统一维护邮箱服务名称、类别、描述、标签、`price` 与 `priceNote`。`price` 留空时显示「咨询报价」；填了 `href` 的卡片按钮直接前往该地址（如商店），否则打开咨询弹窗。
- `linksFor`（site.ts）与 `start.entries`、`process.steps`（文案）：联动站点地址、首页入口卡片与开通流程；文案里用 `link` 键引用地址。

这些配置会公开到网页中，请勿放入密钥、密码或私人信息。修改后提交到 `main` 即会自动重新构建并部署。

联系信息未配置时，页面明确提示「咨询渠道即将公布」。咨询弹窗只在浏览器内整理和复制需求，不发送数据、不创建订单，也不收款。具体套餐、费用及服务条件需事先确认。

## 隐私政策与服务条款

`src/content/legal/zh/` 与 `src/content/legal/en/` 下的 `privacy.mdx`、`terms.mdx` 在构建时由 [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx) 编译，通过 `src/components/LegalDocument.tsx` 输出，发布路径为 `/privacy/` 与 `/terms/`（英文 `/en/privacy/`、`/en/terms/`），页脚与咨询弹窗都有入口。正文使用 MDX 编写（普通文字里的 `{`、`}`、`<` 会被当成语法，要写成 `\{`、`\}`、`\<`），每个二级标题自动编号并生成目录；「联系我们」一节由组件根据 `site.contact` 生成，正文中无需重复联系方式。

frontmatter 字段：`title`、`description`（页面 meta 描述）、`eyebrow`（页首英文小标）、`summary`（页首导语）、`effective` 与 `updated`（`YYYY-MM-DD`，修改正文后请更新 `updated`）、`highlights`（页首「要点速览」）。

两份文本覆盖官网、商店与开通页（onboard）、网页邮箱与状态页（mail）。其中与系统行为对应的部分（订阅服务期限从付款成功时起算、到期后 7 天宽限期与 30 天保留期、购买会话 Cookie、15 分钟登录链接、AI 功能的数据流向）照 mail 仓库 `src/lib/shop/` 与 onboard 的文案写成，相关逻辑变化时请同步修改。

以下是经营上的约定而不是系统行为，正式经营前请按实际情况核对：订单记录保留期限（12 个月）、退款规则（未使用兑换码全额退、已开通原则上不退、订阅扣款后 48 小时酌情退）、答复与验收时限、管理员访问邮箱的情形、适用法律与管辖法院，以及是否需要补充经营主体名称。

## 部署

站点通过 OpenNext 部署为 Cloudflare Worker（`wrangler.jsonc`，Worker 名 `abnormal-bid`，入口是生成的 `.open-next/worker.js`）。页面都是预渲染的，预渲染结果放在只读的静态资源里（`open-next.config.ts`），不需要 R2 或队列；字体等静态文件由静态资源服务直接响应。生产发布由 [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) 直接监听 `main` 分支，每次推送自动检查、构建并部署；任何一步失败都不会部署，上一个成功版本继续可用。

`.github/workflows/ci.yml` 只在 PR 与 `main` 推送时执行相同的检查与构建，不负责发布，也不需要 Cloudflare 凭据。Actions 与 mail、onboard 一样只写大版本标签（如 `actions/checkout@v7`），大版本升级由 Dependabot 提 PR。

### Cloudflare 一次性配置

这些已经配好，需要重建时照此设置。在 Workers & Pages 里连接 GitHub 仓库 `abnormal-bid/abnormal-bid.github.io`：

- Worker 名称：`abnormal-bid`（必须与 `wrangler.jsonc` 一致）
- 生产分支：`main`，根目录：`/`
- 构建命令：`pnpm install --frozen-lockfile && pnpm cf:build`
- 部署命令：`pnpm cf:deploy`
- 构建变量：

  | 变量                      | 值        | 作用                                           |
  | ------------------------- | --------- | ---------------------------------------------- |
  | `PNPM_VERSION`            | `12.16.1` | 与 `package.json` 的 `packageManager` 一致     |
  | `SKIP_DEPENDENCY_INSTALL` | `1`       | 跳过默认安装，使用上面的冻结 lockfile 安装命令 |
  | `NEXT_TELEMETRY_DISABLED` | `1`       | 禁用 Next.js 构建遥测                          |

Node.js 版本由 `.node-version` 指定。

### 域名

绑定都在 Cloudflare 一侧，`wrangler.jsonc` 不声明 `routes`，所以推送不会改动线上域名，部署也不加 `--strict`（严格模式会把配置里没有的绑定当成要删除的差异）。

- `abnormalhq.com`：Worker `abnormal-bid` 的自定义域名，DNS 里对应一条由 Cloudflare 管理的 `AAAA 100::`。需要重新绑定时，先确认主机名上没有其他 A、AAAA 或 CNAME 记录，再执行 `pnpm cf:build` 和 `pnpm exec opennextjs-cloudflare deploy -- --domain abnormalhq.com`。
- `abnormal.bid` 与 `www.abnormal.bid`：旧地址，域名继续持有。zone 的 Redirect Rule（`http_request_dynamic_redirect` 阶段）用 301 跳到 `https://abnormalhq.com`，保留路径与查询参数；DNS 里只有一条代理的 `AAAA 100::` 占位记录。
- `abnormal.bid` 根域名上的 MX 与 TXT 记录属于邮件服务（`@abnormal.bid` 邮箱），改 DNS 时不要动。

GitHub Pages 已不再使用：部署流程已删除，线上由上面的 Worker 提供。GitHub 不允许停用这个仓库的 Pages（API 返回 422），`abnormal-bid.github.io` 因此继续 301 跳到 `abnormal.bid`，再由上面的 Redirect Rule 跳到新地址。不要清除 Pages 设置里的自定义域名，否则这个地址会直接显示最后一次部署的旧站。

### 本机部署

先 `pnpm exec wrangler login`，再执行：

```sh
pnpm cf:build
pnpm cf:deploy
```

## 其他

- 使用原生 `<dialog>` 和 `<details>`，支持键盘操作、Esc 关闭、焦点恢复与减少动态效果偏好。
- 不包含统计脚本、Cookie 或客户数据存储。
- 字体随站点自托管，不请求第三方字体服务。
- 首屏邮箱界面与地址卡片为服务概念示意，不代表实际邮件客户端界面。
