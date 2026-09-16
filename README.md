# Abnormal · AI 订阅服务

[线上网站](https://abnormal-bid.github.io/) · [发布记录](https://github.com/abnormal-bid/abnormal-bid.github.io/releases)

使用 Astro、Tailwind CSS 4 和 TypeScript 构建的中文 AI 订阅服务官网。Astro 预渲染静态页面，导航菜单、主题切换与咨询弹窗使用轻量客户端 JavaScript；GitHub Actions 验证并部署到 GitHub Pages，release-please 管理版本与更新日志。

## 开发

使用 Node.js 24（见 `.node-version`）和 npm。

```sh
npm ci
npm run dev
```

开发地址为 `http://localhost:4321`。

```sh
npm run check         # Astro 与 TypeScript 检查
npm test              # 咨询逻辑与主题偏好测试
npm run format:check  # 格式检查
npm run build         # 生成 dist/
npm run preview       # 预览生产构建
```

Astro 检查器当前支持 TypeScript 5/6，因此本项目使用兼容的 TypeScript 6。

## 项目结构

```text
src/
  components/     导航、Hero、订阅卡片、流程、FAQ、咨询弹窗等 Astro 组件
  data/site.ts    网站文案、产品、价格和公开联系方式
  layouts/       共享 HTML 布局、SEO 与全局样式入口
  lib/inquiry.ts 咨询文案和联系方式选择的纯函数
  pages/         页面路由
  scripts/       导航、主题及咨询弹窗的客户端交互
  styles/        Tailwind 主题、基础样式和共享 utility
public/          favicon 等直接复制到发布目录的静态文件
tests/           咨询逻辑与主题行为回归测试
```

主要布局、排版、状态和响应式设计使用 Tailwind utility；Hero 特有的点阵、轨道和卡片装饰使用组件内的少量局部 CSS。没有保留旧的全局 `styles.css` 或 `window.SITE_CONFIG`。

## 外观主题

导航栏提供「跟随系统」「浅色模式」「深色模式」。首次访问默认跟随系统，系统外观变化时同步更新；手动选择保存在当前浏览器的 `localStorage`（`abnormal-theme`），选择跟随系统会清除该偏好。不同标签页自动同步选择，浏览器禁用存储时仍可临时切换。

主题初始化脚本在页面头部同步执行，提前设置实际主题，避免刷新时闪过错误配色。全局色彩在 `src/styles/global.css` 维护，组件通过动态色彩与 `dark:` 样式适配。

## 配置经营信息

编辑 `src/data/site.ts`：

- `site.contact.wechat`：真实微信号。
- `site.contact.email`：真实咨询邮箱；邮件咨询按钮会填入选定的产品、时长和需求。
- `site.contact.telegram`：完整的 `https://t.me/...` 链接。有效 Telegram 优先；无效时回退到邮箱。
- `products`：统一维护产品名称、类别、描述、标签、`price` 与 `priceNote`。`price` 留空时显示「咨询报价」。

这些配置会公开到网页中，请勿放入密钥、密码或私人信息。修改后提交到 `main` 即会重新构建并发布。

联系信息未配置时，页面明确提示「咨询渠道即将公布」。咨询弹窗只在浏览器内整理和复制需求，不发送数据、不创建订单，也不收款。具体套餐、费用及服务条件需事先确认。

## 检查和部署

`.github/workflows/pages.yml` 会在 PR 和 `main` 推送时执行安装、类型检查、格式检查、测试与构建。只有 `main` 推送或在 `main` 手动触发工作流才会上传并部署 `dist/`。

仓库 **Settings → Pages → Build and deployment** 的 Source 应设为 **GitHub Actions**。`astro.config.mjs` 使用组织根域名，因此无需设置 `base` 子路径。部署失败时，上一个成功版本继续可用。

工作流使用内置 `GITHUB_TOKEN`，不需要另加 PAT。第三方 Actions 固定到已验证的完整 commit SHA；Pages 写入与 OIDC 权限仅授予部署任务。

## release-please 发版

`.github/workflows/release-please.yml` 在 `main` 推送后维护版本 PR；合并版本 PR 后，下一次运行会创建对应 `v*` 标签和 GitHub Release。`package.json`、`package-lock.json`、`.release-please-manifest.json` 和 `CHANGELOG.md` 由 release-please 同步更新。

使用 Conventional Commits：

- `feat: ...` → 次版本。
- `fix: ...` → 补丁版本。
- `feat!: ...` 或 `BREAKING CHANGE:` → 主版本。
- 单独的 `docs:`、`chore:`、`refactor:` 默认不会开启一个新版本。

本次迁移从已有 `1.0.0` 版本记录开始，以原始提交作为 bootstrap 基点，无需手动制作旧标签。后续不要手动修改版本或更新日志，审阅并合并 release-please 生成的版本 PR 即可。

GitHub 默认不会因 `GITHUB_TOKEN` 创建的 PR 触发另一条 `pull_request` 工作流，因此发布工作流中额外检出生成 PR 的实际 head SHA，并执行安装、类型检查、测试与构建。检查结果显示在对应的 **Release Please** 工作流中。如果今后启用必须通过 PR head 检查的分支保护，可在版本 PR 分支手动触发 **Check and Deploy**（该分支只检查、不部署），或配置专用 GitHub App。

仓库 **Settings → Actions → General → Workflow permissions** 需要允许 GitHub Actions 创建 PR。保留默认只读权限，具体工作流按任务显式申请写入权限；工作流不会自动批准或自动合并 PR。

## 其他

- 使用原生 `<dialog>` 和 `<details>`，支持键盘操作、Esc 关闭、焦点恢复与减少动态效果偏好。
- 不包含统计脚本、Cookie 或客户数据存储。
- Google Fonts 为可选外部字体，加载失败时回退到系统字体。
- 页面产品图形是装饰性字形，不表示官方授权或合作。
