import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { LANGUAGES } from "@/lib/languages";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "JSONPath Integrations (Java, Go, Python, JS, PHP, C#) | JSONPath Online",
  description:
    "Copy ready-to-use JSONPath code snippets for Java, Go, Python, JavaScript, PHP, and C#. Learn how to run JSONPath in your language.",
  canonicalPath: "/integrations/",
});

export default function IntegrationsPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        JSONPath Integrations
      </h1>
      <p className="mt-3 max-w-3xl text-black/70 dark:text-white/70">
        Start with the language pages below. Each page includes a JSONPath
        evaluator plus copy-ready code templates.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LANGUAGES.map((l) => (
          <Link
            key={l.slug}
            href={`/lang/${l.slug}`}
            className="rounded-xl border border-black/10 bg-white/40 p-4 hover:bg-black/5 dark:border-white/10 dark:bg-black/20 dark:hover:bg-white/10"
          >
            <div className="text-lg font-semibold">{l.label}</div>
            <div className="mt-1 text-sm text-black/70 dark:text-white/70">
              {l.h1}
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

