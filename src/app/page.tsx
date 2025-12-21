import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { JsonPathPlayground } from "@/components/JsonPathPlayground";
import { SyntaxTable } from "@/components/SyntaxTable";
import { LANGUAGES } from "@/lib/languages";
import { buildMetadata } from "@/lib/metadata";
import { softwareApplicationJsonLd } from "@/lib/jsonld";
import { getGenericFaq } from "@/lib/seo-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "JSONPath Online Evaluator & Validator | JSONPath Online",
  description:
    "Validate JSONPath online with a modern editor. Test JSONPath queries, debug errors, and generate code snippets for Java, Go, Python, JavaScript, PHP, and C#.",
  canonicalPath: "/",
});

export default function HomePage() {
  const description =
    "JSONPath online evaluator and validator with code generator for Java, Go, Python, JavaScript, PHP, and C#.";
  const url = SITE.url;

  return (
    <Container className="py-10">
      <JsonLd data={softwareApplicationJsonLd({ pageUrl: url, description })} />

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          JSONPath Online Evaluator &amp; Validator
        </h1>
        <p className="max-w-3xl text-black/70 dark:text-white/70">
          A modern JSONPath playground with a VS Code-style editor. Validate
          expressions, debug errors, and generate copy-ready code for popular
          languages.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {LANGUAGES.map((l) => (
            <Link
              key={l.slug}
              href={`/lang/${l.slug}`}
              className="rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/20 dark:text-white/80 dark:hover:bg-white/10"
            >
              {l.label} JSONPath
            </Link>
          ))}
        </div>
      </div>

      <JsonPathPlayground defaultTab="javascript" />

      <SyntaxTable />

      <section className="mt-10 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/60 dark:text-white/60">
              Also exploring JSON queries?
            </p>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Try our new JMESPath Online suite
            </h2>
            <p className="text-sm text-black/70 dark:text-white/70">
              Filter AWS CLI output, test JMESPath expressions, and export CSV instantly.
            </p>
          </div>
          <Link
            href="/jmespath"
            className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/80 shadow-sm hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
          >
            Open JMESPath →
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 p-5 dark:border-purple-900 dark:from-purple-950/30 dark:to-purple-900/20">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-purple-700 dark:text-purple-200">
              New · XPath Online
            </p>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              XPath tester for Selenium, Playwright, and web scraping
            </h2>
            <p className="text-sm text-black/70 dark:text-white/70">
              Paste HTML or XML, validate XPath expressions with live highlights, and copy Selenium/Playwright code.
            </p>
          </div>
          <Link
            href="/xpath"
            className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:bg-purple-700"
          >
            Open XPath →
          </Link>
        </div>
      </section>

      <Faq items={getGenericFaq()} />
    </Container>
  );
}
