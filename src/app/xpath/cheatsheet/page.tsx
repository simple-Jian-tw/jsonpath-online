import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "XPath Cheat Sheet: Complete Syntax Reference with Examples",
  description:
    "Comprehensive XPath cheat sheet covering syntax, axes, operators, and functions. Copy-ready examples for Selenium automation, web scraping, and XML parsing.",
  canonicalPath: "/xpath/cheatsheet",
});

const axes = [
  { name: "child", usage: "child::node()", example: "//div/child::p" },
  { name: "parent", usage: "parent::node()", example: "//button/parent::*" },
  { name: "self", usage: "self::node()", example: "//div/self::div" },
  { name: "descendant", usage: "descendant::node()", example: "//ul/descendant::li" },
  { name: "descendant-or-self", usage: "descendant-or-self::node()", example: "//section/descendant-or-self::span" },
  { name: "ancestor", usage: "ancestor::node()", example: "//input/ancestor::form" },
  { name: "ancestor-or-self", usage: "ancestor-or-self::node()", example: "//li/ancestor-or-self::ul" },
  { name: "following", usage: "following::node()", example: "//h2/following::p[1]" },
  { name: "following-sibling", usage: "following-sibling::node()", example: "//label/following-sibling::input" },
  { name: "preceding", usage: "preceding::node()", example: "//h2/preceding::p[1]" },
  { name: "preceding-sibling", usage: "preceding-sibling::node()", example: "//input/preceding-sibling::label" },
  { name: "attribute", usage: "@attr", example: "//a/@href" },
  { name: "namespace", usage: "namespace::node()", example: "//svg/namespace::*" },
];

const operators = [
  { op: "=", meaning: "Equal", example: "//input[@type='email']" },
  { op: "!=", meaning: "Not equal", example: "//div[@role!='alert']" },
  { op: "<", meaning: "Less than", example: "//price[@amount<100]" },
  { op: "<=", meaning: "Less or equal", example: "//item[position()<=3]" },
  { op: ">", meaning: "Greater than", example: "//score[@value>80]" },
  { op: ">=", meaning: "Greater or equal", example: "//price[@amount>=10]" },
  { op: "+", meaning: "Add", example: "//p[position()+1]" },
  { op: "-", meaning: "Subtract", example: "//li[last()-1]" },
  { op: "*", meaning: "Multiply", example: "//item[@price*2]" },
  { op: "div", meaning: "Divide", example: "//order[@total div 2]" },
  { op: "mod", meaning: "Modulo", example: "//li[position() mod 2=0]" },
  { op: "|", meaning: "Union", example: "//div | //span" },
];

const stringFunctions = [
  { fn: "contains()", example: "contains(@class, 'btn')" },
  { fn: "starts-with()", example: "starts-with(@id, 'user-')" },
  { fn: "substring()", example: "substring(text(), 1, 5)" },
  { fn: "substring-before()", example: "substring-before(@href,'?')" },
  { fn: "substring-after()", example: "substring-after(@href,'=')" },
  { fn: "string-length()", example: "string-length(text())>10" },
  { fn: "concat()", example: "concat(@first,'-',@last)" },
  { fn: "normalize-space()", example: "normalize-space(text())" },
  { fn: "translate()", example: "translate(@class,'ABC','abc')" },
  { fn: "text()", example: "//p[text()='Hello']" },
];

const numberFunctions = [
  { fn: "count()", example: "count(//div)" },
  { fn: "sum()", example: "sum(//item/@price)" },
  { fn: "number()", example: "number(@value)" },
  { fn: "floor()", example: "floor(3.7)" },
  { fn: "ceiling()", example: "ceiling(3.2)" },
  { fn: "round()", example: "round(3.5)" },
];

const booleanFunctions = [
  { fn: "boolean()", example: "boolean(@checked)" },
  { fn: "not()", example: "not(@disabled)" },
  { fn: "true()", example: "true()" },
  { fn: "false()", example: "false()" },
];

const nodeFunctions = [
  { fn: "name()", example: "name() = 'div'" },
  { fn: "local-name()", example: "local-name() = 'svg'" },
  { fn: "namespace-uri()", example: "namespace-uri()" },
  { fn: "position()", example: "position() = 1" },
  { fn: "last()", example: "//div[last()]" },
];

const seleniumPatterns = [
  { label: "Button by text", expr: "//button[text()='Submit']" },
  { label: "Link by href", expr: "//a[@href='/login']" },
  { label: "Input by name", expr: "//input[@name='username']" },
  { label: "Table cell", expr: "//table//tr[2]//td[3]" },
  { label: "Last list item", expr: "//ul[@class='menu']/li[last()]" },
  { label: "Multi-class error", expr: "//div[contains(@class,'error') and contains(@class,'visible')]" },
  { label: "OR condition", expr: "//button[@type='submit' or @class='submit-btn']" },
  { label: "No class paragraphs", expr: "//*[@id='main']//p[not(@class)]" },
  { label: "Data-test container", expr: "//div[@data-test-id='login-form']//input" },
  { label: "Iframe content", expr: "//iframe[@name='content']//*" },
  { label: "Selected option", expr: "//select[@name='country']/option[@selected]" },
  { label: "Checked checkbox", expr: "//input[@type='checkbox' and @checked]" },
  { label: "Dynamic ID", expr: "//div[starts-with(@id, 'dynamic-')]" },
  { label: "Error text", expr: "//span[contains(text(), 'Error') and @class='msg']" },
  { label: "Parent button", expr: "//*[text()='Next']/parent::button" },
];

export default function CheatsheetPage() {
  const pageUrl = `${SITE.url}/xpath/cheatsheet`;

  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath Cheat Sheet",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath cheat sheet", "xpath syntax", "xpath reference"],
        })}
      />

      <header className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          XPath Cheat Sheet · Printable reference
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          XPath Cheat Sheet: Complete Syntax Reference
        </h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          A practical XPath cheatsheet with syntax, axes, operators, and functions. Built for Selenium engineers, Playwright testers, web scrapers, and anyone who needs a fast XPath reference without digging through specifications.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { href: "/xpath", label: "Open playground" },
            { href: "/xpath/selenium", label: "Selenium patterns" },
            { href: "/xpath/examples", label: "Examples library" },
            { href: "/xpath/vs-css-selector", label: "XPath vs CSS" },
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
        <h2 className="text-xl font-semibold text-black dark:text-white">Core syntax</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">Basics</p>
            <ul className="mt-2 space-y-1">
              <li><code>{"//tag"}</code> — anywhere in the document.</li>
              <li><code>{"/html/body/div[1]"}</code> — absolute path to first div.</li>
              <li><code>{"//div[@id='main']"}</code> — attribute equals.</li>
              <li><code>{"//div[contains(@class, 'btn')]"}</code> — partial attribute.</li>
              <li><code>{"//div[text()='Save']"}</code> — exact text.</li>
              <li><code>{"//div[normalize-space()='Save']"}</code> — trim whitespace.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">Predicates</p>
            <ul className="mt-2 space-y-1">
              <li><code>{"//ul/li[1]"}</code> — first item.</li>
              <li><code>{"//ul/li[last()]"}</code> — last item.</li>
              <li><code>{"//ul/li[position() < 3]"}</code> — first two items.</li>
              <li><code>{"//table//tr[td[contains(., 'Paid')]]"}</code> — row filter.</li>
              <li><code>{"//div[count(p) > 2]"}</code> — count function.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Axes reference</h2>
        <div className="mt-3 overflow-auto rounded-xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/30">
          <table className="min-w-full text-sm">
            <thead className="bg-black/5 text-black dark:bg-white/5 dark:text-white">
              <tr>
                <th className="px-3 py-2 text-left">Axis</th>
                <th className="px-3 py-2 text-left">Usage</th>
                <th className="px-3 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              {axes.map((axis) => (
                <tr key={axis.name} className="border-t border-black/10 text-black/80 dark:border-white/10 dark:text-white/80">
                  <td className="px-3 py-2 font-semibold">{axis.name}</td>
                  <td className="px-3 py-2 font-mono text-[12px]">{axis.usage}</td>
                  <td className="px-3 py-2 font-mono text-[12px]">{axis.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-black/60 dark:text-white/60">
          Tip: combine axes for readability, e.g., <code>{"//label[text()='Email']/following-sibling::input"}</code>.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Operators</h3>
          <div className="mt-3 overflow-auto rounded-xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/30">
            <table className="min-w-full text-sm">
              <thead className="bg-black/5 text-black dark:bg-white/5 dark:text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Operator</th>
                  <th className="px-3 py-2 text-left">Meaning</th>
                  <th className="px-3 py-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((op) => (
                  <tr key={op.op} className="border-t border-black/10 text-black/80 dark:border-white/10 dark:text-white/80">
                    <td className="px-3 py-2 font-semibold">{op.op}</td>
                    <td className="px-3 py-2">{op.meaning}</td>
                    <td className="px-3 py-2 font-mono text-[12px]">{op.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
          <h3 className="text-lg font-semibold text-black dark:text-white">Selenium patterns (15)</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {seleniumPatterns.map((p) => (
              <div key={p.expr} className="rounded-lg border border-black/10 bg-white/80 p-3 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
                <p className="text-[11px] uppercase tracking-[0.08em] text-black/50 dark:text-white/50">{p.label}</p>
                <p className="font-mono text-[12px]">{p.expr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Functions reference</h3>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-black/30">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              String functions
            </p>
            <ul className="mt-2 space-y-1 text-sm text-black/80 dark:text-white/80">
              {stringFunctions.map((fn) => (
                <li key={fn.fn}>
                  <code>{fn.fn}</code> — <span className="font-mono text-[12px]">{fn.example}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-black/30">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              Number functions
            </p>
            <ul className="mt-2 space-y-1 text-sm text-black/80 dark:text-white/80">
              {numberFunctions.map((fn) => (
                <li key={fn.fn}>
                  <code>{fn.fn}</code> — <span className="font-mono text-[12px]">{fn.example}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-black/30">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              Boolean functions
            </p>
            <ul className="mt-2 space-y-1 text-sm text-black/80 dark:text-white/80">
              {booleanFunctions.map((fn) => (
                <li key={fn.fn}>
                  <code>{fn.fn}</code> — <span className="font-mono text-[12px]">{fn.example}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-black/30">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              Node functions
            </p>
            <ul className="mt-2 space-y-1 text-sm text-black/80 dark:text-white/80">
              {nodeFunctions.map((fn) => (
                <li key={fn.fn}>
                  <code>{fn.fn}</code> — <span className="font-mono text-[12px]">{fn.example}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Common patterns</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Selenium automation",
              tips: [
                "Prefer @data-test-id to avoid copy churn.",
                "Scope to a parent container to reduce match count.",
                "Use normalize-space() for button text.",
              ],
            },
            {
              title: "Web scraping",
              tips: [
                "Collect attributes directly: //a/@href.",
                "Filter ads: //div[not(contains(@class,'ad'))].",
                "Pick top results: //ul/li[position()<=3].",
              ],
            },
            {
              title: "Debugging",
              tips: [
                "Test in browser console: $x(\"//button\")",
                "Leverage the playground for counts and preview.",
                "Use contains() + starts-with() on dynamic values.",
              ],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-black/30"
            >
              <p className="text-sm font-semibold text-black dark:text-white">{card.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
                {card.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          Need interactive practice? Jump to the <Link href="/xpath/tutorial">XPath tutorial</Link> or load examples in the{" "}
          <Link href="/xpath">XPath playground</Link>.
        </p>
      </section>
    </Container>
  );
}
