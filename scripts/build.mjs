import { mkdir, copyFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const output = new URL("dist/", root);
await mkdir(output, { recursive: true });
for (const file of [
  "index.html",
  "styles.css",
  "app.js",
  "site-config.js",
  "favicon.svg",
  ".nojekyll",
]) {
  await copyFile(new URL(file, root), new URL(file, output));
}
console.log("Static site ready in dist/");
