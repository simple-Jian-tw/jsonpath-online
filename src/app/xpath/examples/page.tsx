import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { XPATH_EXAMPLE_LIBRARY } from "@/lib/xpath-samples";

export const metadata: Metadata = buildMetadata({
  title: "XPath Examples Library (60+ Patterns)",
  description:
    "Browse 60+ XPath examples with HTML snippets and explanations. Includes basic selections, attributes, text matching, axes, functions, Selenium patterns, and web scraping recipes.",
  canonicalPath: "/xpath/examples",
});

export default function XPathExamplesPage() {
  const pageUrl = `${SITE.url}/xpath/examples`;
  const grouped = XPATH_EXAMPLE_LIBRARY.reduce<Record<string, typeof XPATH_EXAMPLE_LIBRARY>>((acc, example) => {
    acc[example.category] = acc[example.category] || [];
    acc[example.category].push(example);
    return acc;
  }, {});

  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath Examples Library",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath examples", "xpath patterns", "selenium xpath examples"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          60+ XPath examples · Copy-ready
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">XPath Examples Library</h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          Copy-ready XPath examples grouped by use case: basic selection, attributes, text, axes, functions, Selenium patterns, and web scraping scenarios. Click “Try it” to load each pattern in the playground with its HTML snippet.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { href: "/xpath", label: "Open playground" },
            { href: "/xpath/cheatsheet", label: "Cheat sheet" },
            { href: "/xpath/selenium", label: "Selenium guide" },
            { href: "/xpath/web-scraping", label: "Web scraping" },
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

      <div className="mt-8 space-y-8">
        {Object.entries(grouped).map(([category, examples]) => (
          <section key={category} className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">{category}</h2>
              <span className="text-xs text-black/60 dark:text-white/60">{examples.length} examples</span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {examples.map((ex) => {
                const tryHref = `/xpath?xpath=${encodeURIComponent(ex.expression)}&doc=${encodeURIComponent(ex.html)}`;
                return (
                  <div
                    key={`${category}-${ex.expression}`}
                    className="rounded-xl border border-black/10 bg-white/80 p-4 text-sm text-black/80 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-white/80"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                      {category}
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-black dark:text-white">{ex.expression}</p>
                    <p className="mt-2 text-sm text-black/70 dark:text-white/70">{ex.description}</p>
                    <p className="mt-1 text-xs text-purple-700 dark:text-purple-200">Preview: {ex.takeaway}</p>
                    <details className="mt-2 rounded-lg border border-black/10 bg-black/5 p-2 text-xs text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                      <summary className="cursor-pointer text-[11px] uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                        HTML snippet
                      </summary>
                      <pre className="mt-2 max-h-32 overflow-auto font-mono text-[11px]">{ex.html}</pre>
                    </details>
                    <Link
                      href={tryHref}
                      className="mt-3 inline-flex items-center justify-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                      Try it
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
