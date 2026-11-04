"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const thisYear = () => new Date().getFullYear();

/**
 * 当前年份。页面只在构建时预渲染一次，服务端给的 buildYear 只是占位：
 * 水合时先用它（与预渲染的 HTML 一致），随后换成访问者的年份，跨年后不必等下次部署；不运行脚本时显示构建那年。
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  return useSyncExternalStore(subscribe, thisYear, () => buildYear);
}
