import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JmesCsvTool } from "@/components/JmesCsvTool";
import { JmesLoadButton } from "@/components/JmesLoadButton";
import { JsonLd } from "@/components/JsonLd";
import { AWS_SCENARIOS } from "@/lib/jmes-aws-scenarios";
import { articleJsonLd, faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "JMESPath Create CSV - Convert JSON to CSV Online | Free Tool",
  description:
    "Use JMESPath to query JSON data and export results to CSV format. Perfect for AWS CLI outputs, API responses, and JSON data analysis. Free online tool with instant download.",
  canonicalPath: "/jmespath/create-csv",
});

const faqItems = [
  {
    q: "Can I use this for large JSON files?",
    a: "Yes, but for very large payloads you should filter first with JMESPath to reduce size before exporting. The tool runs in-browser.",
  },
  {
    q: "How do I handle nested arrays in CSV?",
    a: "Flatten with projections like people[].skills[] or use multi-select hashes {Name: name, Skill: skills[0]} to produce consistent columns.",
  },
  {
    q: "Can I automate this process?",
    a: "Yes. Use the Python or Bash examples below to run JMESPath and export CSV in scripts or CI pipelines.",
  },
  {
    q: "Is the CSV format compatible with Excel?",
    a: "Choose UTF-8 with BOM for the broadest compatibility. Tab or comma delimiters both open in Excel and Google Sheets.",
  },
  {
    q: "What if my JSON has inconsistent structure?",
    a: "Define explicit projections to normalized keys, e.g., {Name: name, Region: region || 'unknown'}. Missing fields will be blank.",
  },
  {
    q: "Can I export multiple files at once?",
    a: "Use the automation snippets to iterate through inputs and write multiple CSV files; the online tool downloads one file at a time.",
  },
  {
    q: "Does JMESPath natively support CSV?",
    a: "No. JMESPath is a query language only. This tool bridges the gap so you can convert JSON to CSV without extra scripts.",
  },
  {
    q: "How do I avoid leaking secrets?",
    a: "Remove sensitive fields in your expression, e.g., {Id: id, Name: name} to exclude tokens or ARNs before download. Everything runs locally in your browser.",
  },
];

const comparisonRows = [
  {
    method: "JMESPath + this CSV tool",
    steps: "Paste JSON → Write expression → Export CSV",
    pros: "No installs, works with AWS CLI output, reusable expressions",
    cons: "Browser-based; huge files may need pre-filtering",
  },
  {
    method: "jq",
    steps: "Install jq → Learn filters → Use @csv",
    pros: "Powerful CLI, streams large data",
    cons: "Requires shell proficiency; harder for teams to share recipes",
  },
  {
    method: "Python pandas",
    steps: "Install pandas → Load JSON → Normalize → Export CSV",
    pros: "Very flexible, good for complex transforms",
    cons: "Heavier dependency, more code to maintain",
  },
  {
    method: "Generic online converters",
    steps: "Upload JSON → Download CSV",
    pros: "Quick for trivial data",
    cons: "No JMESPath filtering, privacy concerns, limited formatting",
  },
];

export default function CreateCsvPage() {
  const pageUrl = `${SITE.url}/jmespath/create-csv`;
  return (
    <Container className="py-10">
      <div id="top" />
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "JMESPath to CSV Converter",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["jmespath create csv", "jmespath to csv", "aws cli csv"],
        })}
      />
      <JsonLd data={faqJsonLd({ questions: faqItems.map((f) => ({ question: f.q, answer: f.a })) })} />

      <header className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200">
          JMESPath create csv · Built for AWS CLI
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          JMESPath to CSV Converter
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          Query JSON data with JMESPath and instantly export results to CSV format. Perfect for AWS CLI outputs, API responses, and spreadsheet-friendly reports.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
            ⚡ Instant Export
          </span>
          <span className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
            🔧 AWS CLI Ready
          </span>
          <span className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
            📊 Excel Friendly
          </span>
        </div>
      </header>

      <JmesCsvTool />

      <section className="mt-10 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-200">
              Why this tool exists
            </p>
            <h2 className="text-xl font-semibold text-black dark:text-white">
              JMESPath doesn&apos;t natively support CSV. This tool bridges the gap.
            </h2>
            <p className="mt-2 max-w-3xl text-black/70 dark:text-white/70">
              AWS CLI users often search for &quot;jmespath create csv&quot; because they need spreadsheet-friendly results. Instead of chaining jq, sed, and manual scripts, write one JMESPath query, preview the CSV, and download immediately.
            </p>
          </div>
          <Link
            href="/jmespath"
            className="inline-flex h-fit items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/80 shadow-sm hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
          >
            Back to JMESPath tester
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-sm dark:border-emerald-900 dark:from-green-950/20 dark:to-emerald-950/20">
            <p className="font-semibold text-black dark:text-white">Traditional path ❌</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-black/70 dark:text-white/70">
              <li>Run AWS CLI to get JSON</li>
              <li>Install jq and craft filters</li>
              <li>Pipe and debug shell quoting</li>
              <li>Manually save CSV</li>
              <li>Hope spreadsheets open correctly</li>
            </ol>
          </div>
          <div className="rounded-xl border-2 border-emerald-300 bg-white/80 p-4 text-sm shadow-sm dark:border-emerald-800 dark:bg-black/40">
            <p className="font-semibold text-black dark:text-white">Our path ✅</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-black/70 dark:text-white/70">
              <li>Paste AWS CLI JSON</li>
              <li>Write JMESPath query</li>
              <li>Preview CSV columns</li>
              <li>Click &quot;Export to CSV&quot;</li>
              <li>Open in Excel/Sheets instantly</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          10 AWS CLI scenarios ready to try
        </h2>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          Realistic JSON outputs plus JMESPath expressions you can load directly into the converter. Click “Try this example” to prefill the tool and export CSV.
        </p>
        <div className="mt-4 grid gap-4">
          {AWS_SCENARIOS.map((scenario) => (
            <div
              key={scenario.slug}
              className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-sm dark:border-white/10 dark:bg-black/25"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{scenario.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60">{scenario.command}</p>
                  </div>
                </div>
                <JmesLoadButton
                  json={scenario.json}
                  expression={scenario.expression}
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 hover:from-emerald-600 hover:to-green-600"
                >
                  Try this example
                </JmesLoadButton>
              </div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{scenario.explanation}</p>

              <details className="mt-3 rounded-xl border border-black/10 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-black/30">
                <summary className="cursor-pointer font-semibold text-black dark:text-white">
                  View JSON output
                </summary>
                <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-black/5 p-3 font-mono text-xs text-black dark:bg-white/10 dark:text-white">
                  {scenario.json}
                </pre>
              </details>

              <div className="mt-3 grid gap-2 rounded-xl border border-black/10 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-black/30">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-black/60 dark:text-white/60">
                    JMESPath
                  </p>
                  <code className="mt-1 block rounded-md bg-black/5 px-2 py-1 font-mono text-xs text-black dark:bg-white/10 dark:text-white">
                    {scenario.expression}
                  </code>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-black/60 dark:text-white/60">
                    CSV preview
                  </p>
                  <div className="overflow-auto rounded-md border border-black/10 bg-white text-xs dark:border-white/10 dark:bg-black/40">
                    <table className="min-w-full divide-y divide-black/10 text-left dark:divide-white/10">
                      <thead className="bg-black/5 dark:bg-white/10">
                        <tr>
                          {scenario.csvPreview.headers.map((h) => (
                            <th key={h} className="px-2 py-1 font-semibold text-black dark:text-white">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10 dark:divide-white/10">
                        {scenario.csvPreview.rows.map((row, idx) => (
                          <tr key={idx}>
                            {row.map((cell, cidx) => (
                              <td key={cidx} className="px-2 py-1 text-black/80 dark:text-white/80">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">
            How to create CSV from JSON using JMESPath
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>
              Paste your JSON data. Use AWS CLI output, API responses, or any structured JSON.
            </li>
            <li>
              Write your JMESPath query. Use filters, projections, and functions to shape columns.
            </li>
            <li>
              Export to CSV. Adjust delimiter, encoding, and quotes. Preview the first rows before download.
            </li>
          </ol>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm dark:border-green-800 dark:bg-green-950/20">
            <h3 className="font-semibold text-black dark:text-white">Do&apos;s</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-black/70 dark:text-white/70">
              <li>Use multi-select hashes like {`{Name: name, Age: age}`}</li>
              <li>Filter early to reduce CSV size</li>
              <li>Rename keys for human-friendly headers</li>
              <li>Validate JSON before exporting</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm dark:border-red-800 dark:bg-red-950/20">
            <h3 className="font-semibold text-black dark:text-white">Don&apos;ts</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-black/70 dark:text-white/70">
              <li>Avoid deeply nested objects—flatten first</li>
              <li>Avoid massive arrays without filtering</li>
              <li>Don&apos;t mix inconsistent shapes in one projection</li>
              <li>Don&apos;t include secrets or tokens in exports</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Automate it</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-black/5 p-4 font-mono text-xs text-black dark:border-white/10 dark:bg-white/10 dark:text-white">
            <p className="mb-2 font-sans text-sm font-semibold text-black dark:text-white">
              Python (pip install jmespath pandas)
            </p>
            <pre>{`import json
import jmespath
import pandas as pd

with open("input.json") as f:
    data = json.load(f)

expr = jmespath.compile("Reservations[].Instances[].{Id: InstanceId, Type: InstanceType}")
rows = expr.search(data)
df = pd.json_normalize(rows)
df.to_csv("jmespath-result.csv", index=False, encoding="utf-8-sig")`}</pre>
          </div>
          <div className="rounded-xl border border-black/10 bg-black/5 p-4 font-mono text-xs text-black dark:border-white/10 dark:bg-white/10 dark:text-white">
            <p className="mb-2 font-sans text-sm font-semibold text-black dark:text-white">
              Bash (npm i -g jmespath)
            </p>
            <pre>{`#!/usr/bin/env bash
set -euo pipefail

aws ec2 describe-instances --region us-east-1 \\
  | jp 'Reservations[].Instances[].{Id: InstanceId, State: State.Name}' \\
  | jq -r '(.[0] | keys_unsorted) as $cols | $cols, (.[] | [.[]]) | @csv' \\
  > jmespath-result.csv

echo "Saved jmespath-result.csv"`}</pre>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-black dark:text-white">Which method to choose?</h2>
        <div className="mt-3 overflow-auto rounded-xl border border-black/10 bg-white text-sm dark:border-white/10 dark:bg-black/30">
          <table className="min-w-full divide-y divide-black/10 text-left dark:divide-white/10">
            <thead className="bg-black/5 dark:bg-white/10">
              <tr>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">Method</th>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">Steps</th>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">Pros</th>
                <th className="px-3 py-2 font-semibold text-black dark:text-white">Cons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {comparisonRows.map((row) => (
                <tr key={row.method}>
                  <td className="px-3 py-2 font-semibold text-black dark:text-white">{row.method}</td>
                  <td className="px-3 py-2 text-black/70 dark:text-white/70">{row.steps}</td>
                  <td className="px-3 py-2 text-black/70 dark:text-white/70">{row.pros}</td>
                  <td className="px-3 py-2 text-black/70 dark:text-white/70">{row.cons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Faq items={faqItems} />

      <section className="mt-10 rounded-2xl border border-blue/10 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-500/30 dark:from-blue-500 dark:to-indigo-500">
        <h2 className="text-2xl font-semibold">Ready to convert your JSON to CSV?</h2>
        <p className="mt-2 text-sm text-white/80">
          Use JMESPath to shape your data, then export to CSV instantly. Built for AWS CLI, API responses, and spreadsheet workflows.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="#top"
            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
          >
            Start converting →
          </a>
          <Link
            href="/jmespath"
            className="inline-flex items-center justify-center rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Try JMESPath tester
          </Link>
        </div>
      </section>
    </Container>
  );
}
