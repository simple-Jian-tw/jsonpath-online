import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "XPath vs CSS Selector: When to Use Each",
  description:
    "XPath vs CSS selector comparison for testers and scrapers. Learn syntax differences, performance notes, browser support, and decision rules for Selenium and Playwright.",
  canonicalPath: "/xpath/vs-css-selector",
});

const comparison = [
  { dimension: "Syntax difficulty", xpath: "Moderate—functions and axes", css: "Simple—selectors mirror CSS" },
  { dimension: "Bidirectional navigation", xpath: "Yes (parent, ancestor, sibling)", css: "No (only descendants/siblings)" },
  { dimension: "Text targeting", xpath: "Native text() support", css: "Requires :has-text() in Playwright only" },
  { dimension: "Attribute logic", xpath: "Rich functions: contains, starts-with, normalize-space", css: "Exact/contains via *= ^= $=" },
  { dimension: "Performance", xpath: "Slightly slower in large docs; fine for tests", css: "Generally faster in browsers" },
  { dimension: "Browser support", xpath: "document.evaluate in all modern browsers", css: "querySelectorAll everywhere" },
  { dimension: "Learning curve", xpath: "Steeper but powerful", css: "Shallow, familiar to front-end devs" },
];

const decision = [
  "Need to target parent or ancestor? Choose XPath.",
  "Matching text nodes or combined text + attributes? Choose XPath.",
  "Simple attribute or class matching with no upward traversal? CSS is faster.",
  "Prefer Playwright's role/locator API when available; fall back to XPath for complex cases.",
  "When scraping XML, XPath is the native choice—CSS only works for HTML.",
];

export default function VsCssSelectorPage() {
  const pageUrl = `${SITE.url}/xpath/vs-css-selector`;

  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath vs CSS Selector",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath vs css selector", "selenium xpath css", "playwright xpath"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          Selector comparison
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          XPath vs CSS Selector: Which one should you use?
        </h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          CSS selectors are fast and familiar. XPath is more expressive—parent navigation, text matching, and 100+ functions. Here’s a practical comparison for Selenium and Playwright teams.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { href: "/xpath", label: "XPath playground" },
            { href: "/xpath/cheatsheet", label: "XPath cheat sheet" },
            { href: "/xpath/selenium", label: "Selenium XPath" },
            { href: "/xpath/chrome-devtools", label: "DevTools tips" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Side-by-side comparison</h2>
        <div className="mt-3 overflow-auto rounded-xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/30">
          <table className="min-w-full text-sm">
            <thead className="bg-black/5 text-black dark:bg-white/5 dark:text-white">
              <tr>
                <th className="px-3 py-2 text-left">Dimension</th>
                <th className="px-3 py-2 text-left">XPath</th>
                <th className="px-3 py-2 text-left">CSS Selector</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.dimension} className="border-t border-black/10 text-black/80 dark:border-white/10 dark:text-white/80">
                  <td className="px-3 py-2 font-semibold">{row.dimension}</td>
                  <td className="px-3 py-2">{row.xpath}</td>
                  <td className="px-3 py-2">{row.css}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">When XPath wins</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>Need to move up the DOM: parent, ancestor, preceding-sibling.</li>
            <li>Text-based matches: <code>{"//button[normalize-space()='Submit']"}</code>.</li>
            <li>Complex predicates: <code>{"//div[count(p) > 2]"}</code> or combined conditions.</li>
            <li>Working with XML documents (RSS, SVG, configuration files).</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">When CSS is enough</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>Simple attribute or class matches: <code>.btn.primary</code>.</li>
            <li>Native front-end work where querySelectorAll is already in use.</li>
            <li>High-frequency DOM queries where minimal overhead matters.</li>
            <li>
              Playwright role selectors and CSS fallbacks:{" "}
              <code>{`page.getByRole('button', { name: 'Save' })`}</code>.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Decision guide</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
          {decision.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="mt-3 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm text-black/80 dark:border-purple-900 dark:bg-purple-950/40 dark:text-white/80">
          <p className="font-semibold">Pro tip:</p>
          <p className="mt-1">
            Start with CSS or role selectors. Switch to XPath when you need text matching, upward traversal, or complex predicates. Validate every selector in the <Link href="/xpath">XPath playground</Link> before shipping.
          </p>
        </div>
      </section>
    </Container>
  );
}
