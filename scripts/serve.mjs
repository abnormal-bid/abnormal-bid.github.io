import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, extname } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = new Set([
  "index.html",
  "styles.css",
  "app.js",
  "site-config.js",
  "favicon.svg",
]);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};
const port = Number(process.env.PORT || 4173);
const server = createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end("Method not allowed");
  }
  let path;
  try {
    path =
      decodeURIComponent(new URL(req.url, "http://localhost").pathname).replace(
        /^\/+/,
        "",
      ) || "index.html";
  } catch {
    res.writeHead(400);
    return res.end("Bad request");
  }
  if (!files.has(path)) {
    res.writeHead(404);
    return res.end("Not found");
  }
  try {
    const content = await readFile(join(root, path));
    res.writeHead(200, {
      "Content-Type": types[extname(path)],
      "Cache-Control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(500);
    res.end("Unable to read file");
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Abnormal preview: http://localhost:${port}`),
);
