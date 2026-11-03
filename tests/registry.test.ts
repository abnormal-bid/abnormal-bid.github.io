import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const componentsDir = "src/components";
const ownComponents = readdirSync(componentsDir).filter((file) => file.endsWith(".tsx"));
const installed = readdirSync(join(componentsDir, "ui"));

test("the website pulls its components from the @abnormal registry", () => {
  const config = JSON.parse(readFileSync("components.json", "utf8"));
  assert.match(config.registries["@abnormal"], /\{name\}\.json$/);
  assert.ok(existsSync("src/styles/abnormal.css"), "@abnormal/theme is installed");
  assert.ok(existsSync("src/lib/utils.ts"), "@abnormal/utils is installed");
  assert.ok(installed.length > 0);
});

test("styles live in className and the theme: no CSS modules or old utility classes", () => {
  const files = readdirSync("src", { recursive: true, encoding: "utf8" });
  assert.deepEqual(
    files.filter((file) => file.endsWith(".module.css")),
    [],
  );
  const global = readFileSync("src/styles/global.css", "utf8");
  assert.ok(global.includes('@import "./abnormal.css"'));
  assert.doesNotMatch(global, /@utility/);
  for (const file of ownComponents) {
    assert.doesNotMatch(
      readFileSync(join(componentsDir, file), "utf8"),
      /\b(page-shell|section-space|btn-primary)\b/,
      file,
    );
  }
});

test("smooth scrolling respects reduced motion", () => {
  const global = readFileSync("src/styles/global.css", "utf8");
  const declaration = global.indexOf("scroll-behavior: smooth");
  assert.ok(declaration > global.indexOf("@media (prefers-reduced-motion: no-preference)"));
  assert.equal(global.match(/scroll-behavior/g)?.length, 1);
});

test("registry components are not edited to import site code", () => {
  for (const file of installed) {
    const source = readFileSync(join(componentsDir, "ui", file), "utf8");
    for (const [, path] of source.matchAll(/from "(@\/[^"]+)"/g)) {
      assert.match(path!, /^@\/(lib\/utils|components\/ui\/)/, `${file}: ${path}`);
    }
  }
});
