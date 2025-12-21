import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "XPath Axes Explained (13 Axes with Examples)",
  description:
    "Understand all XPath axes—child, parent, ancestor, sibling, following, preceding, self, namespace—with practical examples for Selenium and scraping.",
  canonicalPath: "/xpath/axes",
});

const axisExamples = [
  { axis: "child", example: "//div/child::p", note: "Direct children only." },
  { axis: "parent", example: "//button/parent::*", note: "Move to the parent container." },
  { axis: "self", example: "//div/self::div", note: "Current node (rarely used directly)." },
  { axis: "ancestor", example: "//input/ancestor::form", note: "Walk upward to the closest form." },
  { axis: "ancestor-or-self", example: "//li/ancestor-or-self::ul", note: "Return ul ancestors and the li if it is a ul." },
  { axis: "descendant", example: "//ul/descendant::li", note: "All nested list items." },
  { axis: "descendant-or-self", example: "//section/descendant-or-self::h2", note: "Include the current node when it matches." },
  { axis: "following", example: "//h2/following::p[1]", note: "First paragraph after an h2 (any depth)." },
  { axis: "following-sibling", example: "//label/following-sibling::input", note: "Next sibling inputs after a label." },
  { axis: "preceding", example: "//h2/preceding::p[1]", note: "Nearest paragraph before an h2." },
  { axis: "preceding-sibling", example: "//input/preceding-sibling::label", note: "Labels immediately before inputs." },
  { axis: "attribute", example: "//a/@href", note: "Select attributes as nodes." },
  { axis: "namespace", example: "//svg/namespace::*", note: "Namespace nodes in XML/SVG." },
];

export default function AxesPage() {
  const pageUrl = `${SITE.url}/xpath/axes`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath Axes Explained",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath axes", "xpath ancestor", "xpath sibling"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          Axes deep dive
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          XPath Axes: Navigate Up, Down, and Across the DOM
        </h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          Axes are the superpower that separates XPath from CSS selectors. Learn the 13 axes with practical Selenium and scraping examples, plus tips to avoid over-matching.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/xpath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Test in playground
          </Link>
          <Link
            href="/xpath/cheatsheet"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Cheat sheet
          </Link>
          <Link
            href="/xpath/selenium"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Selenium guide
          </Link>
        </div>
      </header>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Axes reference table</h2>
        <div className="mt-3 overflow-auto rounded-xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/30">
          <table className="min-w-full text-sm">
            <thead className="bg-black/5 text-black dark:bg-white/5 dark:text-white">
              <tr>
                <th className="px-3 py-2 text-left">Axis</th>
                <th className="px-3 py-2 text-left">Example</th>
                <th className="px-3 py-2 text-left">When to use</th>
              </tr>
            </thead>
            <tbody>
              {axisExamples.map((axis) => (
                <tr key={axis.axis} className="border-t border-black/10 text-black/80 dark:border-white/10 dark:text-white/80">
                  <td className="px-3 py-2 font-semibold">{axis.axis}</td>
                  <td className="px-3 py-2 font-mono text-[12px]">{axis.example}</td>
                  <td className="px-3 py-2">{axis.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Axes patterns for Selenium</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li><code>{"//label[text()='Email']/following-sibling::input"}</code> — connects label to its input.</li>
            <li><code>{"//input[@id='password']/parent::div"}</code> — find container to assert error state.</li>
            <li><code>{"//tr[td[contains(., 'Active')]]/following-sibling::tr[1]"}</code> — next row after an active row.</li>
            <li><code>{"//div[contains(@class,'toast')]/preceding::*[1]"}</code> — element right before a toast.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Axes patterns for scraping</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li><code>{"//article/descendant::h2"}</code> — collect headings in articles.</li>
            <li><code>{"//h2/following::p[1]"}</code> — first paragraph after each heading.</li>
            <li><code>{"//img/ancestor::figure"}</code> — caption containers for images.</li>
            <li><code>{"//a/ancestor::div[@class='card']"}</code> — full card when you have just the link.</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Tips</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Start with descendant axes, then switch to ancestor/parent to scope results.</li>
          <li>Use <code>self::</code> when combining multiple axes in a single expression for clarity.</li>
          <li>For performance, avoid <code>{"//*"}</code> where possible—scope to a container ID first.</li>
          <li>When debugging, split complex selectors into smaller axis-based parts and test each in the playground.</li>
        </ul>
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          Practice these axes in the <Link href="/xpath">XPath playground</Link> or browse ready-made selectors in the{" "}
          <Link href="/xpath/examples">examples library</Link>.
        </p>
      </section>
    </Container>
  );
}
