# Abnormal · 邮箱服务

[线上网站](https://abnormal.bid/)

使用 Next.js（App Router）、Tailwind CSS 4 和 TypeScript 构建的中文邮箱服务官网，介绍个人邮箱、域名邮箱、团队邮箱与邮箱配置服务。全站静态导出，导航菜单、主题切换与咨询弹窗是 React 客户端组件；Cloudflare Workers Builds 监听 `main` 自动部署，GitHub Actions 只做检查。

## 开发

使用 Node.js 24（见 `.node-version`）和 pnpm（版本见 `package.json` 的 `packageManager`）。

```sh
pnpm install
pnpm dev
```

开发地址为 `http://localhost:4321`。

```sh
pnpm typecheck     # next typegen 与 TypeScript 检查
pnpm test          # 咨询逻辑与主题偏好测试
pnpm format:check  # 格式检查
pnpm check         # 依次执行以上三项
pnpm build         # 静态导出到 out/
pnpm preview       # 用 wrangler 在本地按生产规则托管 out/（先 build）
pnpm cf:build      # 完整发布前检查：check、build 与 wrangler deploy --dry-run
```

## 项目结构

```text
src/
  app/            路由：首页、/privacy/、/terms/、404，以及共享根布局与 SEO
  components/     导航、Hero、邮箱服务卡片、流程、FAQ、咨询弹窗等组件，样式放在同名 .module.css
  content/legal/  Markdown 编写的隐私政策与服务条款
  data/site.ts    网站文案、邮箱服务、价格和公开联系方式
  lib/            inquiry.ts 咨询文案与联系方式的纯函数；legal.ts 构建时渲染法律页面；metadata.ts 页面 SEO
  scripts/        theme-init.js：内联进头部的主题初始化脚本
  styles/         Tailwind 主题、基础样式和共享 utility
public/           favicon、字体等直接复制到发布目录的静态文件
tests/            咨询逻辑与主题行为回归测试
wrangler.jsonc    Cloudflare Worker 与静态资源配置
```

主要布局、排版、状态和响应式设计使用 Tailwind utility；组件特有的样式放在 CSS Modules 里。只有 `Header`、`ThemePicker`、`InquiryDialog` 是客户端组件，其余都是服务端组件，在构建时渲染成静态 HTML。页面里任意位置要打开咨询弹窗，用 `InquiryButton`（`product` 指定预选的服务）。

## 视觉设计

视觉与 [mailhq](https://github.com/abnormal-bid/mail) 及 [onboard](https://github.com/abnormal-bid/onboard) 统一：Anthropic 品牌配色（暖调象牙与墨色、深色主题暖炭灰），Inter 字体，唯一的强调色品牌橙，套在 Resend 式的结构上——1px 细线分隔、面板不铺底色、没有阴影。

- `src/styles/global.css` 的令牌（配色、圆角、焦点色）照抄 mailhq 的 `src/app/globals.css`，改配色时几边一起改。组件的 CSS Modules 里直接用 `var(--text)`、`var(--text-secondary)`、`var(--border)` 等原始令牌；Tailwind 工具类用 `text-foreground`、`text-muted-foreground`、`text-brand` 等映射名。
- 品牌橙只用在主按钮、品牌标记、小标前的圆点、标题末尾的句号与少量装饰点；勾选图标、链接悬停与编号都用墨色或灰色。浅色下主按钮用加深一级的陶土色 `#b85636`（白字 4.75:1），深色下用 `#d97757` 配深字。
- 圆角照 Resend：徽章 8px、按钮与控件 12px、小面板 16px、卡片与对话框 24px。按钮按下缩到 0.98，悬停只改底色或描边，不上浮、不加阴影。
- 控件照 mailhq：半透明 `control` 底、`input` 细描边；悬停与聚焦时描边加深，键盘焦点是 2px 灰色描边。只有浮层（主题菜单、咨询对话框）使用 `--popover-bg` 与浮层阴影。
- 品牌标记沿用字母 a 与箭头，照 mailhq 的 BrandMark 放在品牌橙圆角方块里；`public/favicon.svg` 与 onboard 同一枚图标。
- Inter 可变字体（拉丁子集，OFL）自托管在 `public/fonts/`，与 mailhq 同一份文件，页面头部预载；中文字形回退到苹方 / 微软雅黑等系统字体，不访问 Google Fonts。

## 外观主题

导航栏提供「跟随系统」「浅色模式」「深色模式」。首次访问默认跟随系统，系统外观变化时同步更新；手动选择保存在当前浏览器的 `localStorage`（`abnormal-theme`），选择跟随系统会清除该偏好。不同标签页自动同步选择，浏览器禁用存储时仍可临时切换。

主题初始化脚本在页面头部同步执行，提前设置实际主题，避免刷新时闪过错误配色。全局色彩在 `src/styles/global.css` 维护，浅色与深色各一套令牌，挂在 `<html data-theme>` 上；脚本未运行时按系统偏好取色。`<meta name="theme-color">` 随生效的主题切换（`#faf9f5` / `#1f1e1d`）。

## 配置经营信息

编辑 `src/data/site.ts`：

- `site.contact.wechat`：真实微信号。
- `site.contact.email`：真实咨询邮箱；邮件咨询按钮会填入选定的服务类型、使用时长和需求。
- `site.contact.telegram`：完整的 `https://t.me/...` 链接。有效 Telegram 优先；无效时回退到邮箱。
- `products`：统一维护邮箱服务名称、类别、描述、标签、`price` 与 `priceNote`。`price` 留空时显示「咨询报价」。

这些配置会公开到网页中，请勿放入密钥、密码或私人信息。修改后提交到 `main` 即会自动重新构建并部署。

联系信息未配置时，页面明确提示「咨询渠道即将公布」。咨询弹窗只在浏览器内整理和复制需求，不发送数据、不创建订单，也不收款。具体套餐、费用及服务条件需事先确认。

## 隐私政策与服务条款

`src/content/legal/privacy.md` 与 `terms.md` 由 `src/lib/legal.ts` 在构建时渲染，通过 `src/components/LegalDocument.tsx` 输出，发布路径为 `/privacy/` 与 `/terms/`，页脚与咨询弹窗都有入口。正文使用 Markdown 编写，每个二级标题自动编号并生成目录；「联系我们」一节由组件根据 `site.contact` 生成，正文中无需重复联系方式。

frontmatter 字段：`title`、`description`（页面 meta 描述）、`eyebrow`（页首英文小标）、`summary`（页首导语）、`effective` 与 `updated`（`YYYY-MM-DD`，修改正文后请更新 `updated`）、`highlights`（页首「要点速览」）。

正式经营前请按实际情况核对并修改条款中的默认约定：信息保存期限、答复与验收时限、退款规则、适用法律与管辖法院，以及是否需要补充经营主体名称。

## 部署

站点部署为只有静态资源的 Cloudflare Worker（`wrangler.jsonc`，Worker 名 `abnormal-bid`，没有 `main`，请求全部由静态资源服务响应）。生产发布由 [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) 直接监听 `main` 分支，每次推送自动检查、构建并部署；任何一步失败都不会部署，上一个成功版本继续可用。

`.github/workflows/ci.yml` 只在 PR 与 `main` 推送时执行相同的检查与构建，不负责发布，也不需要 Cloudflare 凭据。

### Cloudflare 一次性配置

在 Workers & Pages 里连接 GitHub 仓库 `abnormal-bid/abnormal-bid.github.io`：

- Worker 名称：`abnormal-bid`（必须与 `wrangler.jsonc` 一致）
- 生产分支：`main`，根目录：`/`
- 构建命令：`pnpm install --frozen-lockfile && pnpm cf:build`
- 部署命令：`pnpm run deploy`
- 构建变量：

  | 变量                      | 值        | 作用                                           |
  | ------------------------- | --------- | ---------------------------------------------- |
  | `PNPM_VERSION`            | `12.16.1` | 与 `package.json` 的 `packageManager` 一致     |
  | `SKIP_DEPENDENCY_INSTALL` | `1`       | 跳过默认安装，使用上面的冻结 lockfile 安装命令 |
  | `NEXT_TELEMETRY_DISABLED` | `1`       | 禁用 Next.js 构建遥测                          |

Node.js 版本由 `.node-version` 指定。

### 切换 abnormal.bid

`wrangler.jsonc` 不声明 `routes`，推送不会改动线上域名。首次部署后先在 `*.workers.dev` 地址上检查，确认无误再切换：

1. 在 `abnormal.bid` 的 DNS 里删除根域名与 `www` 指向 GitHub Pages 的记录（自定义域名要求主机名上没有现存记录）。
2. Worker → Settings → Domains & Routes 添加自定义域名 `abnormal.bid`。
3. 原先 `www` 由 GitHub Pages 跳转到根域名，切换后用同一 zone 的 Redirect Rule 把 `www.abnormal.bid` 跳转到 `https://abnormal.bid`（`www` 需要一条代理的 DNS 记录），或把它也绑为自定义域名。
4. 确认新站生效后，在仓库 Settings → Pages 停用 GitHub Pages。

也可以在本机部署（先 `pnpm exec wrangler login`；`deploy` 要写成 `pnpm run deploy`，因为 `pnpm deploy` 是 pnpm 自带的 workspace 命令）：

```sh
pnpm build
pnpm run deploy
```

## 其他

- 使用原生 `<dialog>` 和 `<details>`，支持键盘操作、Esc 关闭、焦点恢复与减少动态效果偏好。
- 不包含统计脚本、Cookie 或客户数据存储。
- 字体随站点自托管，不请求第三方字体服务。
- 首屏邮箱界面与地址卡片为服务概念示意，不代表实际邮件客户端界面。
