import { test, type TestContext } from "node:test";
import assert from "node:assert/strict";
import { desktopDownloads } from "../src/data/site.ts";
import {
  fetchDesktopReleases,
  fileLabel,
  formatSize,
  parseManifest,
  parseReleaseIndex,
  releaseDate,
} from "../src/lib/releases.ts";
import { releaseIndex } from "./support/releases.ts";

test("the release index splits into the current version and the previous ones", () => {
  const { current, previous } = parseReleaseIndex(releaseIndex);
  assert.equal(current.version, "0.2.0");
  assert.deepEqual(
    previous.map((release) => release.version),
    ["0.1.0"],
  );
  assert.equal(releaseDate(previous[0]), "2026-11-07");
  assert.equal(previous[0].manifestUrl, "https://downloads.abnormalhq.com/desktop/0.1.0/latest.json");
});

test("files show macOS, then Windows x64, then Windows Arm", () => {
  const { current } = parseReleaseIndex(releaseIndex);
  assert.deepEqual(current.files.map(fileLabel), ["macOS", "Windows x64", "Windows Arm"]);
  assert.equal(formatSize(current.files[0].size), "20.4 MB");
});

test("a version newer than latest (such as a pre-release) is not listed as a previous version", () => {
  const index = { latest: "0.1.0", releases: [releaseIndex.releases[0], releaseIndex.releases[1]] };
  const { current, previous } = parseReleaseIndex(index);
  assert.equal(current.version, "0.1.0");
  assert.deepEqual(previous, []);
});

test("files for a platform the page does not know yet are left out", () => {
  const release = structuredClone(releaseIndex.releases[1]);
  release.files.push({
    ...release.files[0],
    platform: "linux",
    arch: "x64",
    name: "Abnormal-Mail-0.1.0-linux.AppImage",
  });
  assert.equal(parseManifest(release).current.files.length, 3);
});

test("a single latest.json, from before releases.json existed, gives the current version alone", () => {
  const manifest: Record<string, unknown> = { ...releaseIndex.releases[1] };
  delete manifest.manifest_url;
  const { current, previous } = parseManifest({
    ...manifest,
    files: releaseIndex.releases[1].files.map((file) => ({
      ...file,
      latest_url: "https://downloads.abnormalhq.com/desktop/latest/x",
    })),
  });
  assert.equal(current.version, "0.1.0");
  assert.equal(current.manifestUrl, "https://downloads.abnormalhq.com/desktop/0.1.0/latest.json");
  assert.deepEqual(previous, []);
});

test("a broken index is an error, not an empty list", () => {
  assert.throws(() => parseReleaseIndex({ releases: [] }), /latest/);
  assert.throws(() => parseReleaseIndex({ latest: "0.3.0", releases: releaseIndex.releases }), /0\.3\.0/);
  assert.throws(() => parseReleaseIndex(null), /releases/);
});

/** Answers fetch with the given response (or error) per URL; any other URL is a test bug. */
function mockFetch(t: TestContext, responses: Record<string, unknown>) {
  const requested: string[] = [];
  t.mock.method(console, "warn", () => {});
  t.mock.method(globalThis, "fetch", async (input: string | URL | Request) => {
    const url = String(input);
    requested.push(url);
    if (!(url in responses)) throw new Error(`unexpected fetch ${url}`);
    const answer = responses[url];
    if (answer instanceof Error) throw answer;
    if (typeof answer === "number") return new Response(null, { status: answer });
    return Response.json(answer);
  });
  return requested;
}

test("the loader reads releases.json and does not need latest.json", async (t) => {
  const requested = mockFetch(t, { [desktopDownloads.releases]: releaseIndex });
  const releases = await fetchDesktopReleases();
  assert.equal(releases?.current.version, "0.2.0");
  assert.deepEqual(requested, [desktopDownloads.releases]);
});

for (const [why, answer] of [
  ["is missing", 404],
  ["is broken", { latest: "0.9.0", releases: [] }],
  ["cannot be reached", new TypeError("fetch failed")],
] as const) {
  test(`the loader falls back to latest.json when releases.json ${why}`, async (t) => {
    mockFetch(t, { [desktopDownloads.releases]: answer, [desktopDownloads.manifest]: releaseIndex.releases[1] });
    const releases = await fetchDesktopReleases();
    assert.equal(releases?.current.version, "0.1.0");
    assert.deepEqual(releases?.previous, []);
  });
}

test("the loader gives no versions, without throwing, when neither file can be read", async (t) => {
  mockFetch(t, { [desktopDownloads.releases]: 503, [desktopDownloads.manifest]: new TypeError("fetch failed") });
  assert.equal(await fetchDesktopReleases(), undefined);
});
