import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { JmesLoadButton } from "@/components/JmesLoadButton";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

type FuncDoc = {
  name: string;
  signature: string;
  description: string;
  examples: { expr: string; result: string }[];
  pitfalls?: string;
};

export const metadata: Metadata = buildMetadata({
  title: "JMESPath Functions Reference | Examples and pitfalls",
  description:
    "Complete JMESPath functions list with signatures, examples, and common pitfalls. Try array, string, object, and type functions online.",
  canonicalPath: "/jmespath/functions",
});

const SAMPLE_JSON = JSON.stringify(
  {
    people: [
      { name: "Alice", age: 34, city: "NYC", skills: ["aws", "python"] },
      { name: "Bob", age: 28, city: "Seattle", skills: ["node"] },
      { name: "Cara", age: 41, city: "NYC", skills: ["go", "aws", "k8s"] },
    ],
    orders: [
      { id: "o-100", total: 120.5 },
      { id: "o-101", total: 42 },
      { id: "o-102", total: 200 },
    ],
    inventory: [
      { name: "widget", price: 5.5, stock: 10, tags: ["sale", "blue"] },
      { name: "gizmo", price: 15, stock: 0, tags: ["featured"] },
      { name: "bolt", price: 0.2, stock: 44, tags: [] },
    ],
  },
  null,
  2,
);

const functionGroups: { title: string; items: FuncDoc[] }[] = [
  {
    title: "Array functions",
    items: [
      {
        name: "length",
        signature: "length(array|string|object)",
        description: "Returns the length of an array, string, or object keys.",
        examples: [
          { expr: "length([1,2,3])", result: "3" },
          { expr: "length(keys({a:1,b:2}))", result: "2" },
        ],
      },
      {
        name: "sort_by",
        signature: "sort_by(array, &expr)",
        description: "Sorts an array of objects by the given expression.",
        examples: [
          { expr: "sort_by(people, &age)[].name", result: `["Bob","Alice","Cara"]` },
        ],
        pitfalls: "Only works on arrays; ensure numbers are comparable.",
      },
      {
        name: "reverse",
        signature: "reverse(array)",
        description: "Reverses an array.",
        examples: [{ expr: "reverse([1,2,3])", result: "[3,2,1]" }],
      },
      {
        name: "max_by / min_by",
        signature: "max_by(array, &expr) / min_by(array, &expr)",
        description: "Returns the element with the max/min value for expr.",
        examples: [{ expr: "max_by(inventory, &price).name", result: `"gizmo"` }],
      },
      {
        name: "sum",
        signature: "sum(array)",
        description: "Sums an array of numbers.",
        examples: [{ expr: "sum(orders[].total)", result: "362.5" }],
      },
      {
        name: "avg",
        signature: "avg(array)",
        description: "Average of numeric array.",
        examples: [{ expr: "avg([1,2,3])", result: "2" }],
      },
    ],
  },
  {
    title: "String functions",
    items: [
      {
        name: "contains",
        signature: "contains(collection, value)",
        description: "Checks if a string contains a substring or array contains value.",
        examples: [
          { expr: "contains('hello', 'ell')", result: "true" },
          { expr: "contains(['a','b'], 'b')", result: "true" },
        ],
      },
      {
        name: "starts_with / ends_with",
        signature: "starts_with(string, prefix) / ends_with(string, suffix)",
        description: "Case-sensitive prefix/suffix check.",
        examples: [{ expr: "starts_with('prod-app', 'prod')", result: "true" }],
      },
      {
        name: "join",
        signature: "join(delimiter, array)",
        description: "Joins array of strings.",
        examples: [{ expr: "join(',', people[0].skills)", result: `"aws,python"` }],
      },
      {
        name: "split",
        signature: "split(delimiter, string)",
        description: "Splits string by delimiter.",
        examples: [{ expr: "split('.', 'a.b.c')", result: `["a","b","c"]` }],
      },
    ],
  },
  {
    title: "Object functions",
    items: [
      {
        name: "keys / values",
        signature: "keys(object) / values(object)",
        description: "Returns keys or values of an object.",
        examples: [{ expr: "keys({a:1,b:2})", result: `["a","b"]` }],
      },
      {
        name: "merge",
        signature: "merge(obj1, obj2, ...)",
        description: "Merges objects from left to right.",
        examples: [{ expr: "merge({a:1}, {b:2})", result: `{"a":1,"b":2}` }],
      },
      {
        name: "to_array",
        signature: "to_array(value)",
        description: "Wraps a value in an array if needed.",
        examples: [{ expr: "to_array('x')", result: `["x"]` }],
      },
      {
        name: "to_string / to_number",
        signature: "to_string(value) / to_number(value)",
        description: "Coerces values to string or number where possible.",
        examples: [
          { expr: "to_number('42')", result: "42" },
          { expr: "to_string(true)", result: `"true"` },
        ],
      },
    ],
  },
  {
    title: "Type & boolean helpers",
    items: [
      {
        name: "type",
        signature: "type(value)",
        description: "Returns the type name (string, number, array, object, boolean, null).",
        examples: [{ expr: "type(people)", result: `"array"` }],
      },
      {
        name: "not_null",
        signature: "not_null(value1, value2, ...)",
        description: "Returns the first non-null argument.",
        examples: [{ expr: "not_null(null, 'fallback')", result: `"fallback"` }],
      },
      {
        name: "map",
        signature: "map(&expr, array)",
        description: "Applies expression to each element; shorthand for projections.",
        examples: [{ expr: "map(&name, people)", result: `["Alice","Bob","Cara"]` }],
      },
    ],
  },
  {
    title: "Math & misc",
    items: [
      {
        name: "abs, ceil, floor",
        signature: "abs(number) / ceil(number) / floor(number)",
        description: "Common math helpers.",
        examples: [
          { expr: "ceil(5.2)", result: "6" },
          { expr: "floor(5.8)", result: "5" },
        ],
      },
      {
        name: "max / min",
        signature: "max(array) / min(array)",
        description: "Max/min of numbers.",
        examples: [{ expr: "max([1,5,2])", result: "5" }],
      },
    ],
  },
];

export default function FunctionsPage() {
  const pageUrl = `${SITE.url}/jmespath/functions`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "JMESPath Functions Reference",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["jmespath functions", "jmespath function examples"],
        })}
      />

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          JMESPath Functions Reference
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          All official JMESPath functions with signatures, examples, and common pitfalls. Copy any expression into the playground and test instantly.
        </p>
      </header>

      <section className="mt-6 grid gap-4">
        {functionGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/25"
          >
            <h2 className="text-xl font-semibold text-black dark:text-white">{group.title}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {group.items.map((fn) => (
                <div
                  key={fn.name}
                  className="rounded-xl border border-black/10 bg-white/70 p-4 text-sm dark:border-white/10 dark:bg-black/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-black dark:text-white">{fn.name}</p>
                      <p className="text-xs text-black/60 dark:text-white/60">{fn.signature}</p>
                    </div>
                    <JmesLoadButton
                      json={SAMPLE_JSON}
                      expression={fn.examples[0]?.expr ?? fn.name}
                      className="rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
                    >
                      Try
                    </JmesLoadButton>
                  </div>
                  <p className="mt-1 text-black/70 dark:text-white/70">{fn.description}</p>
                  <div className="mt-2 space-y-2">
                    {fn.examples.map((ex) => (
                      <div key={ex.expr}>
                        <code className="block rounded-md bg-black/5 px-2 py-1 font-mono text-xs text-black dark:bg-white/10 dark:text-white">
                          {ex.expr}
                        </code>
                        <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                          → {ex.result}
                        </p>
                      </div>
                    ))}
                  </div>
                  {fn.pitfalls && (
                    <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
                      Pitfall: {fn.pitfalls}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Container>
  );
}
