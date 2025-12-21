import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JmesPathPlayground } from "@/components/JmesPathPlayground";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, softwareApplicationJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "JMESPath Online Tester & Evaluator | Test JMESPath Queries",
  description:
    "Free online JMESPath tester and evaluator. Test JMESPath queries in real-time with syntax highlighting, error detection, and code generation for Python, JavaScript, Go, and more.",
  canonicalPath: "/jmespath",
});

const faqItems = [
  {
    q: "What is JMESPath?",
    a: "JMESPath is a query language for JSON, used widely in AWS CLI, Azure CLI, and Ansible to filter and transform JSON output with simple expressions.",
  },
  {
    q: "How is JMESPath different from JSONPath?",
    a: "JMESPath focuses on transformations and projections without the $ prefix, while JSONPath is more path-oriented; JMESPath is built into AWS CLI and supports functions like sort_by and length.",
  },
  {
    q: "Can I use this tool with AWS CLI output?",
    a: "Yes. Paste your AWS CLI JSON output, write a JMESPath expression, and view results instantly. Use the CSV converter page to export filtered data.",
  },
  {
    q: "Does this tool run locally or send data to a server?",
    a: "Everything runs in your browser. JSON input stays on your device; nothing is uploaded to a server.",
  },
  {
    q: "Do I need to add a $ prefix?",
    a: "No. JMESPath expressions do not use the $ prefix. Start directly with keys or functions, e.g., people[?age > `30`].name.",
  },
  {
    q: "How do I generate code for production?",
    a: "Use the code generator tabs to copy ready-made snippets for Python, JavaScript, Go, Java, PHP, or C#. Replace the JSON placeholder and expression with your own.",
  },
];

export default function JmesPathPage() {
  const description =
    "JMESPath online tester with live validation, syntax highlighting, CSV export guidance, and production-ready code snippets.";
  const pageUrl = `${SITE.url}/jmespath`;

  return (
    <Container className="py-10">
      <JsonLd data={softwareApplicationJsonLd({ pageUrl, description })} />
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "JMESPath Online Tester & Evaluator",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["jmespath online", "jmespath tester", "aws cli jmespath"],
        })}
      />

      <header className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          JMESPath Online · Free playground
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          JMESPath Online Tester &amp; Evaluator
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          Test and validate JMESPath queries in real-time. JMESPath is a query language for JSON, used extensively in AWS CLI, Ansible, and other tooling. Paste JSON, write an expression, and get results instantly.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { label: "JMESPath AWS CLI", href: "/jmespath/aws-cli" },
            { label: "JMESPath Python", href: "/jmespath/python" },
            { label: "Create CSV", href: "/jmespath/create-csv" },
            { label: "Examples", href: "/jmespath/examples" },
            { label: "Functions", href: "/jmespath/functions" },
            { label: "vs JSONPath", href: "/jmespath/vs-jsonpath" },
            { label: "vs jq", href: "/jmespath/vs-jq" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <JmesPathPlayground defaultTab="python" />

      <section className="mt-10 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 shadow-sm dark:border-white/10 dark:bg-black/20">
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">
            What is JMESPath?
          </h2>
          <p className="mt-2 max-w-4xl text-black/70 dark:text-white/70">
            JMESPath is a declarative JSON query language. It lets you project, filter, and reshape JSON data without writing loops or custom code. AWS CLI, Azure CLI, and Ansible all rely on JMESPath to extract values from command outputs and API responses.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/30">
            <h3 className="text-sm font-semibold text-black/80 dark:text-white/80">
              Key capabilities
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
              <li>Filtering arrays with simple boolean conditions</li>
              <li>Projections for arrays and objects to reshape data</li>
              <li>Built-in functions such as sort_by, length, join, and more</li>
              <li>Pipe expressions to chain transformations</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/30">
            <h3 className="text-sm font-semibold text-black/80 dark:text-white/80">
              Common use cases
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
              <li>Filtering AWS CLI output for reports and dashboards</li>
              <li>Validating API responses in DevOps pipelines</li>
              <li>Transforming JSON before exporting to CSV or spreadsheets</li>
              <li>Building dynamic projections inside applications</li>
            </ul>
          </div>
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-r from-green-50 to-emerald-50 p-5 dark:border-emerald-900 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-200">
                New · CSV Export
              </p>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Export JMESPath results to CSV in one click
              </h3>
              <p className="text-sm text-black/70 dark:text-white/70">
                Bridge the gap: JMESPath itself does not output CSV. Our converter gives you instant CSV downloads tailored for AWS CLI data.
              </p>
            </div>
            <Link
              href="/jmespath/create-csv"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-green-600"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "AWS CLI guide",
            body: "Practical JMESPath patterns for EC2, S3, Lambda, IAM, and more with copy-ready commands.",
            href: "/jmespath/aws-cli",
          },
          {
            title: "Python integration",
            body: "jmespath library usage, compiled expressions, pandas CSV export, and error handling.",
            href: "/jmespath/python",
          },
          {
            title: "JMESPath functions",
            body: "Reference for every JMESPath function with examples and pitfalls.",
            href: "/jmespath/functions",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-black/10 bg-white/60 p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-black/30"
          >
            <h3 className="text-lg font-semibold text-black dark:text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">{card.body}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-emerald-600 dark:text-emerald-300">
              Read →
            </span>
          </Link>
        ))}
      </section>

      <Faq items={faqItems} />
    </Container>
  );
}
