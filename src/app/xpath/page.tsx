import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { XPathPlayground } from "@/components/XPathPlayground";
import { articleJsonLd, softwareApplicationJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "XPath Online Tester & Evaluator | XPath Playground for Selenium",
  description:
    "Real-time XPath tester for HTML and XML. Validate XPath with live feedback, highlight matches, and generate Selenium, Playwright, and Python scraping code automatically.",
  canonicalPath: "/xpath",
});

const faqItems = [
  {
    q: "Can I test Selenium XPath selectors here?",
    a: "Yes. Paste any HTML snippet, enter your XPath, and the playground will highlight matches and generate Selenium-ready code for Python, Java, C#, and JavaScript.",
  },
  {
    q: "Do you support XML as well as HTML?",
    a: "The editor supports both HTML and XML modes. Use the dropdown to switch parsing mode and run XPath 1.0 or experimental 2.0 evaluation fully in the browser.",
  },
  {
    q: "Is my HTML uploaded to a server?",
    a: "No. Everything runs locally in your browser. We do not persist or send your HTML, XML, or XPath expressions anywhere.",
  },
  {
    q: "How is this different from Chrome DevTools $x()?",
    a: "You get formatted results, element paths, code generation, a cheatsheet, and an examples library—no need to open DevTools or run your test suite each time.",
  },
];

export default function XPathPage() {
  const pageUrl = `${SITE.url}/xpath`;
  const heroLinks = [
    { href: "/xpath/selenium", label: "Selenium Guide" },
    { href: "/xpath/cheatsheet", label: "Cheat Sheet" },
    { href: "/xpath/examples", label: "Examples" },
  ];
  const tagLinks = [
    { href: "/xpath/selenium", label: "Selenium XPath" },
    { href: "/xpath/cheatsheet", label: "XPath Cheat Sheet" },
    { href: "/xpath/web-scraping", label: "Web Scraping" },
    { href: "/xpath/chrome-devtools", label: "Chrome DevTools" },
    { href: "/xpath/vs-css-selector", label: "vs CSS Selector" },
  ];
  const featureCards = [
    {
      title: "Real-time validation",
      body: "Evaluate XPath 1.0/2.0 with debounced live feedback, match counts, and inline errors.",
    },
    {
      title: "Code generation",
      body: "Copy-ready snippets for Selenium, Playwright, lxml, and vanilla JavaScript with optional error handling.",
    },
    {
      title: "Bidirectional navigation",
      body: "Test parent, ancestor, sibling, and descendant axes that CSS selectors cannot express.",
    },
    {
      title: "100+ functions",
      body: "contains(), starts-with(), position(), normalize-space(), translate(), and more—all with examples.",
    },
  ];
  const promoLinks = [
    { href: "/xpath/tutorial", label: "Interactive tutorial" },
    { href: "/xpath/functions", label: "Functions reference" },
    { href: "/xpath/axes", label: "Axes deep dive" },
    { href: "/xpath/vs-css-selector", label: "XPath vs CSS selector" },
  ];

  return (
    <Container className="py-10">
      <JsonLd data={softwareApplicationJsonLd({ pageUrl, description: metadata.description ?? "" })} />
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath Online Tester & Evaluator",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath tester", "xpath evaluator", "selenium xpath", "xpath online"],
        })}
      />

      <header className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          XPath Online · Free playground
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          XPath Online Tester &amp; Evaluator
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          Test and validate XPath expressions for HTML and XML documents in real-time. Generate Selenium, Playwright, and Python code automatically while you iterate on locators.
        </p>
        <div className="flex flex-wrap gap-2">
          {heroLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-sm font-semibold text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {tagLinks.map((tag) => (
            <Link
              key={tag.href}
              href={tag.href}
              className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-black/70 hover:bg-black/5 dark:border-white/10 dark:bg-black/20 dark:text-white/70 dark:hover:bg-white/10"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </header>

      <XPathPlayground />

      <section className="mt-10 grid gap-4 rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">What is XPath?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <p className="text-black/70 dark:text-white/70">
            XPath (XML Path Language) is a query language for selecting nodes from HTML and XML documents. Introduced in 1999 as part of the XSLT standard, it remains the fastest way to pinpoint elements for Selenium automation, browser testing, and web scraping. Unlike CSS selectors, XPath can navigate up and down the DOM tree (parent, ancestor, sibling), target text nodes, and use 100+ built-in functions to filter results.
          </p>
          <p className="text-black/70 dark:text-white/70">
            Common use cases include Selenium WebDriver locators, Playwright selectors, extracting structured data from web pages, and parsing XML feeds or config files. Chrome DevTools exposes a lightweight evaluator via <code>$x()</code>, but it lacks validation, highlighting, and code generation. This playground fills those gaps: paste HTML, type an expression, see matches instantly, and copy ready-to-run code.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/30"
            >
              <h3 className="text-sm font-semibold text-black dark:text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 p-6 dark:border-purple-900 dark:from-purple-950/40 dark:to-purple-900/30">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-purple-700 dark:text-purple-200">
              🤖 Selenium Automation
            </p>
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Write reliable XPath locators for Selenium and Playwright
            </h3>
            <p className="max-w-2xl text-sm text-black/70 dark:text-white/70">
              Validate selectors before adding them to your test suite. Copy snippets for Python, Java, C#, and JavaScript with a single click, and use the cheat sheet to avoid brittle locators.
            </p>
          </div>
          <Link
            href="/xpath/selenium"
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:bg-purple-700"
          >
            Learn More →
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Why testers love this</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>Debounced execution to see results without rerunning your test suite.</li>
            <li>Hover to highlight matched nodes in your HTML source.</li>
            <li>Pre-built Selenium patterns for buttons, dynamic IDs, forms, and tables.</li>
            <li>Code generator with toggles for error handling and multi-element support.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Cross-linking hub</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {promoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm font-semibold text-black/80 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-white/80"
              >
                {link.label} →
              </Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-black/60 dark:text-white/60">
            Testing APIs? Try our JSONPath tool. Working with AWS? Explore the JMESPath suite.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">XPath syntax at a glance</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              Predicates & operators
            </p>
            <ul className="mt-2 space-y-1">
              <li><code>[condition]</code> — filter nodes, e.g., <code>{"//div[@id='hero']"}</code></li>
              <li><code>[n]</code> — pick an index, e.g., <code>{"//ul/li[1]"}</code></li>
              <li><code>|</code> — union selectors, e.g., <code>{"//h1 | //h2"}</code></li>
              <li><code>and / or / not()</code> — combine predicates for resilient locators.</li>
              <li><code>=, !=, &lt;, &gt;, &lt;=, &gt;=</code> — numeric and string comparisons.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              Common functions
            </p>
            <ul className="mt-2 space-y-1">
              <li><code>{"contains(@class, 'btn')"}</code> — match partial class names.</li>
              <li><code>{"starts-with(@id, 'user-')"}</code> — dynamic IDs and data-test attributes.</li>
              <li><code>text()</code> + <code>normalize-space()</code> — target buttons by visible label.</li>
              <li><code>position()</code>, <code>last()</code> — select first/last items safely.</li>
              <li><code>count()</code> — assert node counts to strengthen selectors.</li>
            </ul>
          </div>
        </div>
      </section>

      <Faq items={faqItems} />
    </Container>
  );
}
