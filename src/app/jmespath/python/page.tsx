/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "JMESPath Python Guide | jmespath.search examples",
  description:
    "Learn how to use the Python jmespath library. Copy-ready examples for APIs, AWS SDK, pandas CSV export, compiled expressions, and error handling.",
  canonicalPath: "/jmespath/python",
});

const faqItems = [
  {
    q: "How do I install JMESPath for Python?",
    a: "Run pip install jmespath. It is a small pure-Python library.",
  },
  {
    q: "How do I compile an expression?",
    a: "Use jmespath.compile('expression'), then call .search(data) repeatedly for better performance.",
  },
  {
    q: "Can I combine JMESPath with pandas?",
    a: "Yes. Search first, then pass the result into pandas.json_normalize and export to CSV.",
  },
  {
    q: "How do I handle missing keys?",
    a: "Use default values or filters: expr = \"items[].{name: name || 'unknown'}\".",
  },
  {
    q: "Is JMESPath part of boto3?",
    a: "boto3 uses JMESPath internally for resources, but you can still import jmespath directly for custom searches.",
  },
  {
    q: "Does it mutate my data?",
    a: "No. jmespath.search returns a new object and does not change the original data structure.",
  },
];

const codeExamples = [
  {
    title: "Basic search",
    code: `import json, jmespath

data = json.loads('{"people":[{"name":"Ana","age":32},{"name":"Ben","age":27}]}')
print(jmespath.search("people[?age > \`30\`].name", data))`,
  },
  {
    title: "Compiled expression (faster)",
    code: `import jmespath

expr = jmespath.compile("items[].{id:id, price:price}")
for payload in payloads:
    rows = expr.search(payload)
    process(rows)`,
  },
  {
    title: "Error handling",
    code: `import json, jmespath
try:
    data = json.loads(bad_json)
    result = jmespath.search("orders[].id", data)
except json.JSONDecodeError as e:
    print("Invalid JSON", e)
except jmespath.exceptions.JMESPathError as e:
    print("Invalid expression", e)`,
  },
  {
    title: "Flatten nested arrays",
    code: `import jmespath, json

data = json.loads(open("orders.json").read())
expr = "orders[].items[].{orderId: orderId, sku: sku, qty: quantity}"
rows = jmespath.search(expr, data)`,
  },
  {
    title: "With pandas CSV export",
    code: `import json, jmespath, pandas as pd

data = json.loads(open("input.json").read())
rows = jmespath.search("people[].{Name:name, City:location.city}", data)
df = pd.json_normalize(rows)
df.to_csv("people.csv", index=False, encoding="utf-8-sig")`,
  },
  {
    title: "Custom function (uppercase)",
    code: `import jmespath

class UpperRuntime(jmespath.functions.Functions):
    @jmespath.functions.signature({'types': ['string']})
    def _func_upper(self, s):
        return s.upper()

options = jmespath.Options(custom_functions=UpperRuntime())
print(jmespath.search("upper('hello')", {"dummy": 1}, options=options))`,
  },
];

export default function PythonPage() {
  const pageUrl = `${SITE.url}/jmespath/python`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "JMESPath Python Guide",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["jmespath python", "python jmespath", "jmespath.search"],
        })}
      />

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          JMESPath for Python
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          Learn the jmespath Python library with ready-to-use snippets. Search JSON payloads, optimize with compiled expressions, and export to CSV with pandas.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/jmespath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Test online
          </Link>
          <Link
            href="/jmespath/create-csv"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            JMESPath create CSV
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Quick start</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Install: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">pip install jmespath</code></li>
          <li>Import and search: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">jmespath.search(expression, data)</code></li>
          <li>Compile for loops: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">expr = jmespath.compile("..."); expr.search(data)</code></li>
        </ol>
      </section>

      <section className="mt-8 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Examples you can copy</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-black/10 bg-black/5 p-4 text-sm dark:border-white/10 dark:bg-white/10"
            >
              <p className="mb-2 font-semibold text-black dark:text-white">{item.title}</p>
              <pre className="whitespace-pre-wrap font-mono text-xs text-black dark:text-white">
                {item.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Patterns with AWS SDK (boto3)</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Filter EC2 responses: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">jmespath.search("Reservations[].Instances[].InstanceId", resp)</code></li>
          <li>Summaries for dashboards: <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs text-black dark:bg-white/10 dark:text-white">{`jmespath.search("Functions[].{name:FunctionName,runtime:Runtime}", resp)`}</code></li>
          <li>Combine with paginator loops; compile the expression once and reuse.</li>
        </ul>
      </section>

      <section className="mt-8 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">CSV with pandas</h2>
        <p className="text-sm text-black/70 dark:text-white/70">
          Use JMESPath to normalize, then pandas to export. This is ideal for &quot;jmespath create csv&quot; workflows in CI.
        </p>
        <pre className="mt-3 rounded-xl bg-black/5 p-4 font-mono text-xs text-black dark:bg-white/10 dark:text-white">{`rows = jmespath.search("Reservations[].Instances[].{Id:InstanceId,Type:InstanceType}", data)
df = pd.json_normalize(rows)
df.to_csv("instances.csv", index=False, encoding="utf-8-sig")`}</pre>
      </section>

      <section className="mt-8 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Debugging tips</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Validate JSON before search: wrap loads in try/except.</li>
          <li>Start simple: search(&quot;[0]&quot;, data) to confirm shape.</li>
          <li>Log intermediate results: split expressions into smaller parts.</li>
          <li>Use the online tester to iterate quickly, then copy the final expression into Python.</li>
        </ul>
      </section>

      <Faq items={faqItems} />
    </Container>
  );
}
