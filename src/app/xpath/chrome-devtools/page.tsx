import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Chrome DevTools XPath Guide ($x, Elements search)",
  description:
    "Learn how to test XPath in Chrome DevTools using $x(), the Elements panel, and copy XPath. Includes tips for debugging Selenium locators with live DOM inspection.",
  canonicalPath: "/xpath/chrome-devtools",
});

const tips = [
  "$x(\"//button[text()='Save']\") returns a NodeList. Inspect length to confirm matches.",
  "In Elements panel, press Ctrl+F (⌘+F) and prefix with // to search via XPath directly.",
  "Right-click an element → Copy → Copy XPath for a quick starting selector (refine afterward).",
  "Use :scope in CSS queries inside DevTools if a simple CSS selector suffices—mix with XPath when needed.",
  "Wrap text selectors with normalize-space() to match trimmed button labels.",
];

export default function ChromeDevtoolsPage() {
  const pageUrl = `${SITE.url}/xpath/chrome-devtools`;

  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "Chrome DevTools XPath Guide",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["chrome devtools xpath", "chrome xpath", "selenium xpath devtools"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          DevTools · Live debugging
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          Chrome DevTools XPath Guide ($x, Elements search)
        </h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          Quickly validate XPath in Chrome. Use $x() in the console, search with // in Elements, and copy XPath from inspected nodes. Pair these tricks with the XPath playground to refine locators before committing tests.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/xpath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Open playground
          </Link>
          <Link
            href="/xpath/selenium"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Selenium guide
          </Link>
          <Link
            href="/xpath/cheatsheet"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Cheat sheet
          </Link>
        </div>
      </header>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">$x() console workflow</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Open DevTools (F12) → Console.</li>
          <li>
            Run <code>{`$x("//button[text()='Login']")`}</code>. Hover results to highlight in the DOM.
          </li>
          <li>Inspect <code>length</code> to confirm match count; click items in the array to jump to Elements panel.</li>
          <li>Iterate quickly by editing the XPath string and re-running.</li>
        </ol>
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          Use this for quick checks; rely on the <Link href="/xpath">XPath playground</Link> to view paths, code snippets, and formatted results.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Elements panel search</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>Press Ctrl+F (⌘+F on macOS) in Elements.</li>
            <li>Prefix with <code>{"//"}</code> to search via XPath; use CSS otherwise.</li>
            <li>Results are highlighted in the DOM tree—great for verifying dynamic IDs.</li>
            <li>
              Use <code>{"//div[contains(@class,'toast')]"}</code> to locate transient notifications.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Copying selectors</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>Right-click → Copy → Copy XPath for a starting point.</li>
            <li>Refine with contains()/starts-with() to remove brittle indexes.</li>
            <li>Copy selector (CSS) can be used as a fallback when XPath is unnecessary.</li>
            <li>Paste into the playground to confirm match counts and generate code.</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Tips &amp; gotchas</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          For advanced debugging (network waits, frame switching, screenshots), complement DevTools with your Selenium/Playwright test runner.
        </p>
      </section>
    </Container>
  );
}
