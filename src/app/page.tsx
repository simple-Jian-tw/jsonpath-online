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

      <Faq items={getGenericFaq()} />
    </Container>
  );
}

