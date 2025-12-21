import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "XPath Functions Reference (XPath 1.0)",
  description:
    "Complete XPath functions reference with examples: string, numeric, boolean, node, and aggregation helpers. Includes Selenium patterns and browser compatibility notes.",
  canonicalPath: "/xpath/functions",
});

const groups = [
  {
    title: "String functions",
    items: [
      { fn: "contains(haystack, needle)", example: "contains(@class, 'btn')", note: "Partial match for attributes or text nodes." },
      { fn: "starts-with(haystack, prefix)", example: "starts-with(@id, 'user-')", note: "Great for dynamic IDs." },
      { fn: "substring(string, start, length)", example: "substring(text(), 1, 5)", note: "Positions start at 1 in XPath." },
      { fn: "substring-before(string, delimiter)", example: "substring-before(@href, '?')", note: "Use for URL base extraction." },
      { fn: "substring-after(string, delimiter)", example: "substring-after(@href, '=')", note: "Capture query parameter values." },
      { fn: "string-length(string)", example: "string-length(text()) > 10", note: "Guard against empty nodes." },
      { fn: "concat(str1, str2, ...)", example: "concat(@first, '-', @last)", note: "Combine attributes for unique keys." },
      { fn: "normalize-space(string)", example: "normalize-space(text())", note: "Trim and collapse whitespace." },
      { fn: "translate(string, from, to)", example: "translate(@class,'ABC','abc')", note: "Normalize casing." },
    ],
  },
  {
    title: "Numeric functions",
    items: [
      { fn: "count(node-set)", example: "count(//div)", note: "Returns number of nodes." },
      { fn: "sum(node-set)", example: "sum(//price/@amount)", note: "Sum numeric attributes." },
      { fn: "number(value)", example: "number(@value)", note: "Cast strings to numbers." },
      { fn: "floor(number)", example: "floor(3.9)", note: "Round down." },
      { fn: "ceiling(number)", example: "ceiling(3.1)", note: "Round up." },
      { fn: "round(number)", example: "round(3.5)", note: "Banker’s rounding in XPath 1.0." },
    ],
  },
  {
    title: "Boolean functions",
    items: [
      { fn: "boolean(object)", example: "boolean(@checked)", note: "Convert to boolean." },
      { fn: "not(boolean)", example: "not(@disabled)", note: "Negate conditions." },
      { fn: "true()", example: "true()", note: "Return true literal." },
      { fn: "false()", example: "false()", note: "Return false literal." },
    ],
  },
  {
    title: "Node functions",
    items: [
      { fn: "name(node)", example: "name() = 'div'", note: "Full QName." },
      { fn: "local-name(node)", example: "local-name() = 'svg'", note: "Without namespace prefix." },
      { fn: "namespace-uri(node)", example: "namespace-uri()", note: "Useful in SVG/XML docs." },
      { fn: "position()", example: "position() = 1", note: "Index within the current context." },
      { fn: "last()", example: "//li[last()]", note: "Last node in the context set." },
    ],
  },
];

export default function FunctionsPage() {
  const pageUrl = `${SITE.url}/xpath/functions`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath Functions Reference",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath functions", "xpath 1.0 functions", "xpath reference"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          XPath 1.0 functions
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          XPath Functions Reference (with Examples)
        </h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          Every XPath function you need, in one place. Browse string, numeric, boolean, and node helpers with Selenium-friendly examples. Works great with the XPath playground for quick validation.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { href: "/xpath", label: "Test in playground" },
            { href: "/xpath/cheatsheet", label: "Cheat sheet" },
            { href: "/xpath/axes", label: "Axes guide" },
            { href: "/xpath/web-scraping", label: "Scraping recipes" },
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

      <section className="mt-8 space-y-4">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-black/20">
            <h2 className="text-xl font-semibold text-black dark:text-white">{group.title}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {group.items.map((item) => (
                <div
                  key={item.fn}
                  className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80"
                >
                  <p className="font-semibold">{item.fn}</p>
                  <p className="font-mono text-[12px] text-black dark:text-white">{item.example}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Function usage tips</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>String comparison is case-sensitive; normalize with <code>translate()</code> if needed.</li>
            <li>Use <code>number()</code> before math comparisons on numeric-looking attributes.</li>
            <li>
              Combine <code>count()</code> with predicates to enforce structure, e.g.,{" "}
              <code>{"//form[count(input)>=2]"}</code>.
            </li>
            <li><code>position()</code> is relative to the current node set—scope it with a leading dot when chaining.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Browser compatibility</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>document.evaluate (XPath 1.0) is supported in Chrome, Firefox, Safari, Edge.</li>
            <li>XPath 2.0 functions (e.g., matches()) are not available in native browsers—use a library such as fontoxpath.</li>
            <li>SVG and XML namespaces require <code>namespace-uri()</code> or explicit prefixes.</li>
            <li>Playwright supports both CSS and XPath; prefer role selectors first, then XPath for text/ancestor logic.</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Practice quickly</h3>
        <p className="text-sm text-black/70 dark:text-white/70">
          Pick a function, craft a predicate, then run it in the <Link href="/xpath">XPath playground</Link>. Not sure where to start? The{" "}
          <Link href="/xpath/examples">examples library</Link> and <Link href="/xpath/selenium">Selenium guide</Link> show function-heavy selectors you can copy.
        </p>
      </section>
    </Container>
  );
}
