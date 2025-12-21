import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "XPath for Web Scraping: Patterns and Code",
  description:
    "XPath recipes for web scraping with Python (lxml, Scrapy) and JavaScript. Extract links, text, images, tables, and avoid ads with robust predicates.",
  canonicalPath: "/xpath/web-scraping",
});

const recipes = [
  { title: "Extract all links", expr: "//a/@href", tip: "Attributes return URLs directly; filter with starts-with(@href, 'http')." },
  { title: "Article titles", expr: "//article//h2/text()", tip: "Use text() to avoid wrapping tags when exporting." },
  { title: "Image sources", expr: "//img/@src", tip: "Pair with @alt to keep context." },
  { title: "List items", expr: "//ul[@class='products']/li", tip: "Scope to the product list to avoid nav menus." },
  { title: "Skip ads", expr: "//div[not(contains(@class,'ad'))]", tip: "Exclude common ad wrappers." },
  { title: "Price fields", expr: "//span[contains(text(),'$')]", tip: "Use contains on text and refine with parent context." },
];

const codeSamples = [
  {
    title: "Python + lxml",
    snippet: `from lxml import html
import requests

resp = requests.get("https://example.com/articles")
doc = html.fromstring(resp.text)
titles = doc.xpath("//article//h2/text()")
links = doc.xpath("//article//a/@href")
print(titles, links)`,
  },
  {
    title: "Python + Scrapy",
    snippet: `def parse(self, response):
    for article in response.xpath("//article"):
        yield {
            "title": article.xpath(".//h2/text()").get(),
            "url": article.xpath(".//a/@href").get(),
            "tags": article.xpath(".//a[@class='tag']/text()").getall(),
        }`,
  },
  {
    title: "JavaScript (browser/Node)",
    snippet: `import { JSDOM } from "jsdom";

const dom = await JSDOM.fromURL("https://example.com");
const doc = dom.window.document;
const result = doc.evaluate("//a/@href", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
const links = [];
for (let i = 0; i < result.snapshotLength; i++) {
  links.push(result.snapshotItem(i)?.textContent);
}
console.log(links);`,
  },
];

export default function WebScrapingPage() {
  const pageUrl = `${SITE.url}/xpath/web-scraping`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath for Web Scraping",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath web scraping", "xpath lxml", "xpath scrapy"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          Web scraping recipes
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          XPath for Web Scraping: Reliable Extraction Patterns
        </h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          Copy-ready XPath selectors and code snippets for Python (lxml, Scrapy) and JavaScript. Extract links, headlines, prices, and attributes while skipping ads and noise.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/xpath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Test in playground
          </Link>
          <Link
            href="/xpath/examples"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Examples library
          </Link>
          <Link
            href="/xpath/functions"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Functions reference
          </Link>
        </div>
      </header>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Common scraping recipes</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {recipes.map((recipe) => {
            const tryHref = `/xpath?xpath=${encodeURIComponent(recipe.expr)}`;
            return (
              <div
                key={recipe.expr}
                className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80"
              >
                <p className="text-[11px] uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                  {recipe.title}
                </p>
                <p className="font-mono text-[12px] text-black dark:text-white">{recipe.expr}</p>
                <p className="text-xs text-black/60 dark:text-white/60">{recipe.tip}</p>
                <Link
                  href={tryHref}
                  className="mt-2 inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                >
                  Try it
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {codeSamples.map((sample) => (
          <div
            key={sample.title}
            className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm text-black/80 dark:border-white/10 dark:bg-black/20 dark:text-white/80"
          >
            <p className="text-sm font-semibold text-black dark:text-white">{sample.title}</p>
            <pre className="mt-2 max-h-[260px] overflow-auto rounded-lg bg-black/5 p-3 font-mono text-[12px] text-black dark:bg-white/5 dark:text-white">
              {sample.snippet}
            </pre>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Scraping tips</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Scope selectors to the main content container to avoid nav/footer noise.</li>
          <li>
            Combine predicates to exclude ads or placeholders: <code>{"//div[not(contains(@class,'ad'))]"}</code>.
          </li>
          <li>Export attributes directly (href, src, data-*) when building datasets.</li>
          <li>Pair XPath with request caching and polite crawl delays; this guide focuses purely on selector quality.</li>
        </ul>
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          Next, compare XPath with CSS for your stack in the <Link href="/xpath/vs-css-selector">selector comparison</Link> page or jump to the{" "}
          <Link href="/xpath/examples">examples library</Link> for more scraping-specific patterns.
        </p>
      </section>
    </Container>
  );
}
