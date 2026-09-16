# Abnormal · AI 订阅服务

适用于 GitHub Pages 的中文 AI 订阅服务官网。原生 HTML、CSS、JavaScript，无需安装依赖，可直接部署仓库根目录。

## 本地预览

需要 Node.js 20 或更新版本。

```sh
npm run dev
```

打开 `http://localhost:4173`。可用 `PORT=其他端口 npm run dev` 修改端口。

## 配置经营信息

编辑 `site-config.js`：

- `contact.wechat`：真实微信号。
- `contact.email`：真实咨询邮箱；配置后显示邮件咨询按钮，自动填入咨询内容。
- `contact.telegram`：完整的 `https://t.me/...` 地址；配置后显示 Telegram 咨询按钮。
- `products`：每项的 `price` 为显示价格（例如包含币种和周期的完整文字），`note` 为套餐说明。未经确认时保持空值，显示「咨询报价」。

联系信息未配置时，页面明确提示「咨询渠道即将公布」。咨询弹窗仅在浏览器内整理和复制需求，不发送数据、不创建订单，也不收款。目录展示不代表当前所有套餐均可办理。发布前请确认实际服务范围、费用和售后条款。

## GitHub Pages

目标网址 `https://abnormal-bid.github.io/` 需要由 GitHub 账号或组织 `abnormal-bid` 持有同名仓库 `abnormal-bid.github.io`。仓库地址为 `https://github.com/abnormal-bid/abnormal-bid.github.io`。

将文件提交并推送至目标仓库后，在仓库 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**，选择 `main` 分支和 `/(root)` 目录保存。本项目包含 `.nojekyll`，不需要 Jekyll 或构建工作流。

如使用其他静态托管平台，可运行 `npm run build`，发布 `dist/`。

## 内容与交互

- 响应式首页：订阅目录、办理流程、常见问题、咨询入口。
- 原生可访问的 FAQ 折叠面板和咨询弹窗，支持键盘与 Esc 关闭。
- 根据产品预选咨询内容、时长选择、补充需求、一键复制及失败时的手动复制提示。
- 无统计脚本、Cookie 或客户数据存储。
- Google Fonts 是可选外部字体资源，加载失败时自动使用系统字体。
- 页面产品图形为装饰性字形，不是官方合作或授权标识。
