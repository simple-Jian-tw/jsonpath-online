import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "JMESPath vs jq | Choose the right JSON tool",
  description:
    "Compare JMESPath vs jq for JSON processing. Understand syntax, CSV support, performance, and when to use each tool for AWS CLI and scripting.",
  canonicalPath: "/jmespath/vs-jq",
});

const comparison = [
  ["Form factor", "Embedded query language", "Standalone CLI tool"],
  ["CSV output", "Needs helper (like this site)", "Built-in @csv and @tsv"],
  ["Learning curve", "Simple expressions, functions", "Powerful but steeper"],
  ["Use in apps", "Lightweight library bindings", "Usually shell-only"],
  ["Streaming", "Not streaming", "Supports streaming and large files"],
  ["AWS CLI", "Native with --query", "Requires piping output to jq"],
];

const scenarios = [
  {
    title: "AWS CLI quick filter",
    best: "JMESPath",
    why: "No extra install; use --query directly and export with our CSV tool.",
  },
  {
    title: "Massive log crunching on server",
    best: "jq",
    why: "Streaming and filters excel on huge files.",
  },
  {
    title: "Application-level JSON transforms",
    best: "JMESPath",
    why: "Embed in Python/JS/Go/Java; small dependency footprint.",
  },
  {
    title: "One-off CLI data wrangling",
    best: "jq",
    why: "Rich operators, regex, math, and CSV formatting inline.",
  },
];

export default function VsJqPage() {
  const pageUrl = `${SITE.url}/jmespath/vs-jq`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "JMESPath vs jq",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["jmespath vs jq", "jq vs jmespath"],
        })}
      />

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          JMESPath vs jq
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          jq is a powerhouse CLI; JMESPath is the lightweight query language built into AWS CLI and SDKs. Here’s how to pick the right tool for each job.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/jmespath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            JMESPath playground
          </Link>
          <Link
            href="/jmespath/create-csv"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            JMESPath create CSV
          </Link>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-black dark:text-white">Feature comparison</h2>
        <div className="mt-3 overflow-auto rounded-xl border border-black/10 bg-white text-sm dark:border-white/10 dark:bg-black/30">
          <table className="min-w-full divide-y divide-black/10 text-left dark:divide-white/10">
            <thead className="bg-black/5 dark:bg-white/10">
              <tr>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">Aspect</th>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">JMESPath</th>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">jq</th>
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
          <h2 className="text-xl font-semibold text-black dark:text-white">Which to use?</h2>
          <Link
            href="/jmespath/aws-cli"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-300"
          >
            AWS CLI guide →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {scenarios.map((sc) => (
            <div
              key={sc.title}
              className="rounded-xl border border-black/10 bg-white/70 p-4 text-sm dark:border-white/10 dark:bg-black/30"
            >
              <p className="font-semibold text-black dark:text-white">{sc.title}</p>
              <p className="mt-1 text-xs text-black/60 dark:text-white/60">Best: {sc.best}</p>
              <p className="mt-2 text-black/70 dark:text-white/70">{sc.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Sample commands</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-black/5 p-4 font-mono text-xs text-black dark:border-white/10 dark:bg-white/10 dark:text-white">
            <p className="mb-2 font-sans text-sm font-semibold text-black dark:text-white">JMESPath</p>
            <pre>{`aws ec2 describe-instances --query "Reservations[].Instances[].{Id:InstanceId,State:State.Name}" --output json
# Export to CSV with our JMESPath create CSV tool`}</pre>
          </div>
          <div className="rounded-xl border border-black/10 bg-black/5 p-4 font-mono text-xs text-black dark:border-white/10 dark:bg-white/10 dark:text-white">
            <p className="mb-2 font-sans text-sm font-semibold text-black dark:text-white">jq</p>
            <pre>{`aws ec2 describe-instances \\
  | jq -r '.Reservations[].Instances[] | [.InstanceId, .State.Name] | @csv' \\
  > instances.csv`}</pre>
          </div>
        </div>
      </section>
    </Container>
  );
}
