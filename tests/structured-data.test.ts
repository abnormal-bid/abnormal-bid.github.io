import { test } from "node:test";
import assert from "node:assert/strict";
import { site } from "../src/data/site.ts";
import { copies } from "../src/i18n/index.ts";
import { homeStructuredData, legalStructuredData, serializeJsonLd } from "../src/lib/structured-data.ts";

type Node = Record<string, unknown>;
const nodes = (data: { "@graph": Node[] }) => data["@graph"];
const ofType = (graph: Node[], type: string) =>
  graph.find((node) => [node["@type"]].flat().includes(type)) as Node | undefined;

for (const lang of ["zh", "en"] as const) {
  test(`${lang} home describes the organization, the site and every FAQ answer on the page`, () => {
    const t = copies[lang];
    const graph = nodes(homeStructuredData(lang));
    assert.equal(ofType(graph, "Organization")?.name, site.name);
    assert.equal(ofType(graph, "WebSite")?.url, `${site.url}/`);
    const page = ofType(graph, "FAQPage")!;
    assert.equal(page.url, lang === "en" ? `${site.url}/` : `${site.url}/zh/`);
    assert.equal(page.inLanguage, t.htmlLang);
    const questions = page.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    assert.deepEqual(
      questions.map(({ name, acceptedAnswer }) => [name, acceptedAnswer.text]),
      t.faq.items.map(({ question, answer }) => [question, answer]),
    );
  });
}

test("a legal page carries its dates and a breadcrumb back to its language's home", () => {
  const frontmatter = {
    title: "Terms of Service",
    description: "The rules.",
    eyebrow: "TERMS",
    summary: "Summary.",
    effective: "2026-09-21",
    updated: "2026-11-04",
    highlights: ["One"],
  };
  const page = ofType(nodes(legalStructuredData("zh", "/terms/", frontmatter)), "WebPage")!;
  assert.equal(page.url, `${site.url}/zh/terms/`);
  assert.equal(page.datePublished, "2026-09-21");
  assert.equal(page.dateModified, "2026-11-04");
  const crumbs = (page.breadcrumb as { itemListElement: { item: string }[] }).itemListElement;
  assert.deepEqual(
    crumbs.map(({ item }) => item),
    [`${site.url}/zh/`, `${site.url}/zh/terms/`],
  );
});

test("every @id the graph refers to is defined in it", () => {
  const graph = nodes(homeStructuredData("zh"));
  const defined = new Set(graph.map((node) => node["@id"]));
  const refs = JSON.stringify(graph).match(/\{"@id":"[^"]+"\}/g) ?? [];
  for (const ref of refs) assert.ok(defined.has(JSON.parse(ref)["@id"]), ref);
});

test("serialized JSON-LD cannot close its script tag", () => {
  const text = serializeJsonLd({ answer: "</script><script>alert(1)</script>" });
  assert.ok(!text.includes("<"));
  assert.deepEqual(JSON.parse(text), { answer: "</script><script>alert(1)</script>" });
});
