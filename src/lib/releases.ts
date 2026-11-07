/**
 * 桌面客户端的版本列表，下载页用它显示当前版本与历史版本。
 *
 * 数据来自 abnormalhq/mail 发布流程写到 downloads.abnormalhq.com 的 desktop/releases.json：
 * 全部版本按新到旧排列，latest 是 desktop/latest/ 下那一版。官网在构建时读取一次（页面是预渲染的），
 * mail 发布后通过 Workers Builds 的 deploy hook 重新构建官网，版本列表随之更新。
 * releases.json 出现以前只有 desktop/latest.json，读不到列表时退回到它，只显示当前版本。
 */
import { desktopDownloads } from "../data/site.ts";

export type DesktopPlatform = "macos" | "windows";

export interface DesktopFile {
  platform: DesktopPlatform;
  arch: "universal" | "x64" | "arm64";
  name: string;
  /** desktop/<version>/ 下带版本号的地址，不会变。 */
  url: string;
  sha256: string;
  size: number;
}

export interface DesktopRelease {
  version: string;
  /** ISO 8601，UTC。 */
  releasedAt: string;
  /** 这一版的 latest.json，列出各文件的 SHA-256。 */
  manifestUrl: string;
  files: DesktopFile[];
}

export interface DesktopReleases {
  current: DesktopRelease;
  /** 比当前版本旧的版本，新到旧。 */
  previous: DesktopRelease[];
}

const fileOrder = ["macos-universal", "windows-x64", "windows-arm64"];

/** 文件在页面上的名字，两种语言相同。 */
export function fileLabel(file: Pick<DesktopFile, "platform" | "arch">): string {
  if (file.platform === "macos") return "macOS";
  return file.arch === "arm64" ? "Windows Arm" : "Windows x64";
}

/** 十进制 MB，与 Finder 和资源管理器的写法接近，保留一位小数。 */
export function formatSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

/** 发布日期写成 2026-11-07（UTC），两种语言通用。 */
export function releaseDate(release: Pick<DesktopRelease, "releasedAt">): string {
  return release.releasedAt.slice(0, 10);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function str(value: unknown, what: string): string {
  if (typeof value !== "string" || !value) throw new Error(`desktop releases: ${what} is not a string`);
  return value;
}

function parseFile(value: unknown): DesktopFile | undefined {
  if (!isObject(value)) throw new Error("desktop releases: a file is not an object");
  const platform = value.platform;
  const arch = value.arch;
  // 以后若多出别的平台或架构，下载页还不认识它，先跳过，不让整个构建失败。
  if (platform !== "macos" && platform !== "windows") return undefined;
  if (arch !== "universal" && arch !== "x64" && arch !== "arm64") return undefined;
  if (typeof value.size !== "number") throw new Error("desktop releases: a file size is not a number");
  return {
    platform,
    arch,
    name: str(value.name, "a file name"),
    url: str(value.url, "a file URL"),
    sha256: str(value.sha256, "a file SHA-256"),
    size: value.size,
  };
}

function parseRelease(value: unknown): DesktopRelease {
  if (!isObject(value) || !Array.isArray(value.files)) throw new Error("desktop releases: a release has no files");
  const version = str(value.version, "a version");
  const files = value.files
    .map(parseFile)
    .filter((file): file is DesktopFile => file !== undefined)
    .sort((a, b) => fileOrder.indexOf(`${a.platform}-${a.arch}`) - fileOrder.indexOf(`${b.platform}-${b.arch}`));
  return {
    version,
    releasedAt: str(value.released_at, `the release date of ${version}`),
    manifestUrl:
      typeof value.manifest_url === "string"
        ? value.manifest_url
        : desktopDownloads.manifest.replace(/latest\.json$/, `${version}/latest.json`),
    files,
  };
}

/** 解析 releases.json：{ latest, releases: [...] }，releases 已按新到旧排列。 */
export function parseReleaseIndex(value: unknown): DesktopReleases {
  if (!isObject(value) || !Array.isArray(value.releases)) throw new Error("desktop releases: no releases list");
  const latest = str(value.latest, "latest");
  const releases = value.releases.map(parseRelease);
  const index = releases.findIndex((release) => release.version === latest);
  if (index === -1) throw new Error(`desktop releases: the latest version ${latest} is not in the list`);
  return { current: releases[index], previous: releases.slice(index + 1) };
}

/** 解析单个版本的 latest.json，用作没有 releases.json 时的退路。 */
export function parseManifest(value: unknown): DesktopReleases {
  return { current: parseRelease(value), previous: [] };
}

async function getJson(url: string): Promise<unknown> {
  // no-store：不写进 Next.js 的数据缓存（.next/cache/fetch-cache）。构建缓存会被下次构建恢复，
  // 写进去的话，mail 发了新版本、deploy hook 触发的那次构建读到的还是旧列表。
  // 用它的页面都是 force-static，所以仍在构建时预渲染，只请求一次。
  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

let loading: Promise<DesktopReleases | undefined> | undefined;

/**
 * 读取版本列表。读不到 releases.json 时用 latest.json；两个都读不到时返回 undefined，
 * 下载页仍然给出固定地址的下载按钮，只是不显示版本号与历史版本，构建不因此失败。
 */
export function loadDesktopReleases(): Promise<DesktopReleases | undefined> {
  loading ??= (async () => {
    try {
      return parseReleaseIndex(await getJson(desktopDownloads.releases));
    } catch (error) {
      console.warn(`Could not read the desktop release list, falling back to latest.json: ${String(error)}`);
    }
    try {
      return parseManifest(await getJson(desktopDownloads.manifest));
    } catch (error) {
      console.warn(`Could not read the desktop release either; the download page shows no versions: ${String(error)}`);
      return undefined;
    }
  })();
  return loading;
}
