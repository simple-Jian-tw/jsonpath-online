import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { JsonPathPlayground } from "@/components/JsonPathPlayground";
import { SyntaxTable } from "@/components/SyntaxTable";
import { getLanguageConfig, LANGUAGES } from "@/lib/languages";
import { buildMetadata } from "@/lib/metadata";
import { softwareApplicationJsonLd } from "@/lib/jsonld";
import { getLanguageFaq } from "@/lib/seo-content";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGES.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const lang = getLanguageConfig(slug);
    if (!lang) return {};
    return buildMetadata({
      title: lang.title,
      description: lang.description,
      canonicalPath: `/lang/${lang.slug}/`,
    });
  });
}

export default async function LanguageLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lang = getLanguageConfig(slug);
  if (!lang) return notFound();

  const url = `${SITE.url}/lang/${lang.slug}/`;

  return (
    <Container className="py-10">
      <JsonLd
        data={softwareApplicationJsonLd({
          pageUrl: url,
          description: lang.description,
        })}
      />

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-black/60 dark:text-white/60">
          {lang.primaryKeyword}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{lang.h1}</h1>
        <p className="max-w-3xl text-black/70 dark:text-white/70">
          {lang.description}
        </p>
      </div>

      <JsonPathPlayground defaultTab={lang.slug} />

      <section className="mt-10 rounded-2xl border border-black/10 bg-white/40 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold">
          {lang.label} JSONPath: quick start
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Write a JSONPath like <code className="font-mono">$.store.book[*]</code>.</li>
          <li>Use the evaluator above to validate results instantly.</li>
          <li>Copy the generated {lang.label} snippet and plug in your JSON + path.</li>
        </ul>
      </section>

      <SyntaxTable />

      <Faq items={getLanguageFaq(lang)} title={`${lang.label} JSONPath FAQ`} />
    </Container>
  );
}
