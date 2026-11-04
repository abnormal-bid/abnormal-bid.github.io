import { test } from "node:test";
import assert from "node:assert/strict";
import { revalidateInBrowser } from "../src/lib/cache.ts";

const withCacheControl = (value: string, init: ResponseInit = {}) =>
  new Response("body", { ...init, headers: { "Cache-Control": value, ETag: '"abc"', Vary: "RSC" } });

test("prerendered responses revalidate instead of being served stale", async () => {
  for (const value of ["s-maxage=31536000, stale-while-revalidate=2592000", "s-maxage=31536000"]) {
    const response = revalidateInBrowser(withCacheControl(value));
    assert.equal(response.headers.get("cache-control"), "public, max-age=0, must-revalidate");
    assert.equal(response.headers.get("etag"), '"abc"');
    assert.equal(response.headers.get("vary"), "RSC");
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "body");
  }
});

test("other cache policies are left alone", () => {
  const error = "private, no-cache, no-store, max-age=0, must-revalidate";
  assert.equal(revalidateInBrowser(withCacheControl(error, { status: 404 })).headers.get("cache-control"), error);

  const none = new Response(null, { status: 301, headers: { Location: "/" } });
  assert.equal(revalidateInBrowser(none), none);
});
