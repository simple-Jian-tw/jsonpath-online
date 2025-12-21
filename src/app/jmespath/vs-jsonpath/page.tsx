import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "JMESPath vs JSONPath | Differences and when to use each",
  description:
    "Compare JMESPath vs JSONPath: syntax, functions, filters, AWS CLI support, and examples. Learn when to choose each and try queries online.",
  canonicalPath: "/jmespath/vs-jsonpath",
});

const comparison = [
  ["Standardization", "JMESPath (spec + test suite)", "No formal standard"],
  ["Prefix", "No $ prefix", "$ root prefix required"],
  ["Functions", "20+ built-in functions", "No built-in functions"],
  ["Projections", "Array + object projections", "Array projections only"],
  ["Filters", "Boolean filters with expressions", "Filters vary by implementation"],
  ["AWS CLI", "Native support", "Not supported"],
  ["Learning curve", "Moderate, function-rich", "Simple for path traversal"],
];

const dualExamples = [
  {
    need: "Select all book titles",
    jmespath: "store.book[].title",
    jsonpath: "$.store.book[*].title",
  },
  {
    need: "Filter price < 10",
    jmespath: "store.book[?price < `10`].title",
    jsonpath: "$.store.book[?(@.price < 10)].title",
  },
  {
    need: "Project fields",
    jmespath: "store.book[].{Title: title, Author: author}",
    jsonpath: "$.store.book[*].[\"title\",\"author\"]",
  },
  {
    need: "Count items",
    jmespath: "length(store.book)",
    jsonpath: "$.store.book.length()",
  },
  {
    need: "Sort by price",
    jmespath: "sort_by(store.book, &price)[].title",
    jsonpath: "No built-in sort (needs client code)",
  },
];

export default function VsJsonPathPage() {
  const pageUrl = `${SITE.url}/jmespath/vs-jsonpath`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "JMESPath vs JSONPath",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["jmespath vs jsonpath", "jsonpath vs jmespath"],
        })}
      />

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          JMESPath vs JSONPath
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          Key differences between JMESPath and JSONPath, plus side-by-side examples so you can choose the right query language for your project.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            JSONPath playground
          </Link>
          <Link
            href="/jmespath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            JMESPath playground
          </Link>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-black dark:text-white">Feature comparison</h2>
        <div className="mt-3 overflow-auto rounded-xl border border-black/10 bg-white text-sm dark:border-white/10 dark:bg-black/30">
          <table className="min-w-full divide-y divide-black/10 text-left dark:divide-white/10">
            <thead className="bg-black/5 dark:bg-white/10">
              <tr>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">Feature</th>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">JMESPath</th>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">JSONPath</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {comparison.map((row) => (
                <tr key={row[0]}>
                  <td className="px-3 py-2 font-semibold text-black dark:text-white">{row[0]}</td>
                  <td className="px-3 py-2 text-black/70 dark:text-white/70">{row[1]}</td>
                  <td className="px-3 py-2 text-black/70 dark:text-white/70">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">Side-by-side examples</h2>
          <Link
            href="/jmespath/examples"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-300"
          >
            More examples →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {dualExamples.map((ex) => (
            <div
              key={ex.need}
              className="rounded-xl border border-black/10 bg-white/70 p-4 text-sm dark:border-white/10 dark:bg-black/30"
            >
              <p className="font-semibold text-black dark:text-white">{ex.need}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.08em] text-black/60 dark:text-white/60">
                JMESPath
              </p>
              <code className="block rounded-md bg-black/5 px-2 py-1 font-mono text-xs text-black dark:bg-white/10 dark:text-white">
                {ex.jmespath}
              </code>
              <p className="mt-2 text-xs uppercase tracking-[0.08em] text-black/60 dark:text-white/60">
                JSONPath
              </p>
              <code className="block rounded-md bg-black/5 px-2 py-1 font-mono text-xs text-black dark:bg-white/10 dark:text-white">
                {ex.jsonpath}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">When to choose which</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Use <strong>JMESPath</strong> for AWS CLI, Ansible, Azure CLI, or when you need functions like sort_by, length, join.</li>
          <li>Use <strong>JSONPath</strong> when you only need path traversal and your runtime already supports it.</li>
          <li>Interoperate: fetch data with JSONPath, reshape with JMESPath, and export with our CSV converter.</li>
        </ul>
      </section>
    </Container>
  );
}
