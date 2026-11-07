/** A releases.json as abnormalhq/mail's desktop/packaging/release.py writes it: two releases, newest first. */
const base = "https://downloads.abnormalhq.com/desktop";

const file = (version: string, platform: string, arch: string, ext: string, size: number) => {
  const name = `Abnormal-Mail-${version}-${platform}-${arch}${ext === "exe" ? "-setup" : ""}.${ext}`;
  return {
    platform,
    arch,
    kind: ext,
    name,
    url: `${base}/${version}/${name}`,
    sha256: "0".repeat(64),
    size,
    signed: false,
  };
};

const release = (version: string, releasedAt: string) => ({
  version,
  released_at: releasedAt,
  manifest_url: `${base}/${version}/latest.json`,
  // Sorted by name, the way release.py lists them, not in the order the page shows them.
  files: [
    file(version, "macos", "universal", "dmg", 20364974),
    file(version, "windows", "arm64", "exe", 7953983),
    file(version, "windows", "x64", "exe", 8869747),
  ],
});

export const releaseIndex = {
  latest: "0.2.0",
  releases: [release("0.2.0", "2026-12-01T08:00:00Z"), release("0.1.0", "2026-11-07T12:19:46Z")],
};
