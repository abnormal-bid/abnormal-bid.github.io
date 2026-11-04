import { test } from "node:test";
import assert from "node:assert/strict";
import { en } from "../src/i18n/en.ts";
import { zh } from "../src/i18n/zh.ts";
import { pageMetadata } from "../src/lib/metadata.ts";

test("a page with its own title and description shares them, not the homepage's", () => {
  const metadata = pageMetadata({
    lang: "en",
    path: "/privacy/",
    title: "Privacy Policy — Abnormal",
    description: "How we handle your information.",
  });
  assert.equal(metadata.title, "Privacy Policy — Abnormal");
  assert.deepEqual(
    { title: metadata.openGraph?.title, description: metadata.openGraph?.description, url: metadata.openGraph?.url },
    { title: "Privacy Policy — Abnormal", description: "How we handle your information.", url: "/en/privacy/" },
  );
});

test("the homepage shares the social copy of its language", () => {
  const metadata = pageMetadata({ lang: "zh", path: "/" });
  assert.equal(metadata.title, zh.meta.title);
  assert.equal(metadata.openGraph?.title, zh.meta.socialTitle);
  assert.equal(metadata.openGraph?.description, zh.meta.socialDescription);
  assert.equal(pageMetadata({ lang: "en", path: "/" }).openGraph?.title, en.meta.socialTitle);
  assert.deepEqual(metadata.alternates?.languages, { "zh-CN": "/", en: "/en/", "x-default": "/" });
});
