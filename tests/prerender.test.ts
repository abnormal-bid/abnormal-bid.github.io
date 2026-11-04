import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const serverComponents = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".tsx") && !file.includes("components/ui/"))
  .map((file) => ({ file, source: readFileSync(join("src", file), "utf8") }))
  .filter(({ source }) => !source.startsWith('"use client"'));

test("prerendered components read the clock only as CurrentYear's placeholder", () => {
  // Every page is prerendered once at build (open-next.config.ts), so a date shown from server code freezes until the
  // next deploy, like the copyright year did. Hand the build-time value to a client component that updates it.
  for (const { file, source } of serverComponents) {
    for (const [read] of source.matchAll(/new Date\(\)|Date\.now\(\)/g)) {
      const line = source.slice(source.lastIndexOf("\n", source.indexOf(read)) + 1).split("\n")[0]!;
      assert.match(line, /<CurrentYear buildYear=\{new Date\(\)\.getFullYear\(\)\} \/>/, `${file}: ${line.trim()}`);
    }
  }
});

test("CurrentYear hydrates with the prerendered year, then shows the visitor's", () => {
  const source = readFileSync("src/components/CurrentYear.tsx", "utf8");
  assert.ok(source.startsWith('"use client"'));
  assert.match(source, /useSyncExternalStore\(subscribe, thisYear, \(\) => buildYear\)/);
});
