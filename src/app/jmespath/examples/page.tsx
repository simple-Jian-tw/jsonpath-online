import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JmesLoadButton } from "@/components/JmesLoadButton";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

type ExampleItem = {
  title: string;
  description: string;
  expression: string;
  output: string;
  input: string;
  category: string;
};

export const metadata: Metadata = buildMetadata({
  title: "JMESPath Examples Library | 60+ queries",
  description:
    "Browse 60+ JMESPath examples with ready-to-run queries. Includes filtering, projections, functions, nested data, and AWS CLI scenarios. Try them online.",
  canonicalPath: "/jmespath/examples",
});

const inputs = {
  people: `{
  "people": [
    { "name": "Alice", "age": 34, "city": "NYC", "skills": ["aws", "python"] },
    { "name": "Bob", "age": 28, "city": "Seattle", "skills": ["node"] },
    { "name": "Cara", "age": 41, "city": "NYC", "skills": ["go", "aws", "k8s"] }
  ]
}`,
  orders: `{
  "orders": [
    { "id": "o-100", "total": 120.5, "items": [{"sku":"sku-1","qty":2},{"sku":"sku-2","qty":1}] },
    { "id": "o-101", "total": 42, "items": [{"sku":"sku-3","qty":5}] },
    { "id": "o-102", "total": 200, "items": [] }
  ]
}`,
  inventory: `{
  "inventory": [
    { "name": "widget", "stock": 10, "price": 5.5, "tags": ["sale","blue"] },
    { "name": "gizmo", "stock": 0, "price": 15, "tags": ["featured"] },
    { "name": "bolt", "stock": 44, "price": 0.2, "tags": [] }
  ]
}`,
  nested: `{
  "departments": [
    { "name": "Engineering", "teams": [{"name":"Platform","headcount":12},{"name":"Data","headcount":7}] },
    { "name": "Support", "teams": [{"name":"Tier1","headcount":15},{"name":"Tier2","headcount":5}] }
  ]
}`,
};

function buildExamples(): ExampleItem[] {
  const basic: ExampleItem[] = [
    {
      title: "Select all names",
      description: "Simple projection",
      expression: "people[].name",
      output: `["Alice","Bob","Cara"]`,
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "First person",
      description: "Index access",
      expression: "people[0]",
      output: `{"name":"Alice","age":34,"city":"NYC","skills":["aws","python"]}`,
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "Slice first two",
      description: "Array slicing",
      expression: "people[:2].name",
      output: `["Alice","Bob"]`,
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "All skills nested",
      description: "Nested projection",
      expression: "people[].skills[]",
      output: `["aws","python","node","go","aws","k8s"]`,
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "Cities unique",
      description: "Unique values",
      expression: "people[].city | unique(@)",
      output: `["NYC","Seattle"]`,
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "Count people",
      description: "length function",
      expression: "length(people)",
      output: "3",
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "Check first skill",
      description: "Nested index",
      expression: "people[0].skills[0]",
      output: `"aws"`,
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "Hash projection",
      description: "Rename keys",
      expression: "people[].{Name: name, City: city}",
      output: `[{"Name":"Alice","City":"NYC"},{"Name":"Bob","City":"Seattle"},{"Name":"Cara","City":"NYC"}]`,
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "Deep wildcard",
      description: "Wildcard on arrays",
      expression: "people[*]",
      output: "[...]",
      input: inputs.people,
      category: "Basic selections",
    },
    {
      title: "Map with pipe",
      description: "Pipe to map",
      expression: "people | map(&name, @)",
      output: `["Alice","Bob","Cara"]`,
      input: inputs.people,
      category: "Basic selections",
    },
  ];

  const filters: ExampleItem[] = [
    {
      title: "Age > 30",
      description: "Numeric filter",
      expression: "people[?age > `30`].name",
      output: `["Alice","Cara"]`,
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "City equals",
      description: "String match",
      expression: "people[?city=='NYC']",
      output: "[...]",
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "Has skill aws",
      description: "contains on array",
      expression: "people[?contains(skills, 'aws')].name",
      output: `["Alice","Cara"]`,
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "Missing skill",
      description: "Negated contains",
      expression: "people[? !contains(skills, 'aws')].name",
      output: `["Bob"]`,
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "Between totals",
      description: "Numeric range",
      expression: "orders[?total > `50` && total < `180`].id",
      output: `["o-100"]`,
      input: inputs.orders,
      category: "Filters & conditions",
    },
    {
      title: "Empty items",
      description: "length filter",
      expression: "orders[?length(items)==`0`].id",
      output: `["o-102"]`,
      input: inputs.orders,
      category: "Filters & conditions",
    },
    {
      title: "Out of stock",
      description: "Zero stock",
      expression: "inventory[?stock==`0`].name",
      output: `["gizmo"]`,
      input: inputs.inventory,
      category: "Filters & conditions",
    },
    {
      title: "Stock low",
      description: "< 5 units",
      expression: "inventory[?stock < `5`].name",
      output: `["gizmo"]`,
      input: inputs.inventory,
      category: "Filters & conditions",
    },
    {
      title: "Tagged sale",
      description: "Tag filter",
      expression: "inventory[?contains(tags, 'sale')]",
      output: "[...]",
      input: inputs.inventory,
      category: "Filters & conditions",
    },
    {
      title: "City not NYC",
      description: "Inequality",
      expression: "people[?city!='NYC'].name",
      output: `["Bob"]`,
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "Age and city",
      description: "Multi condition",
      expression: "people[?age > `30` && city=='NYC'].name",
      output: `["Alice","Cara"]`,
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "Exists check",
      description: "Truthy key",
      expression: "people[?skills]",
      output: "[...]",
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "Length of skills > 2",
      description: "length on array",
      expression: "people[?length(skills) > `2`].name",
      output: `["Cara"]`,
      input: inputs.people,
      category: "Filters & conditions",
    },
    {
      title: "Price above 1",
      description: "Numeric filter inventory",
      expression: "inventory[?price > `1`].name",
      output: `["widget","gizmo"]`,
      input: inputs.inventory,
      category: "Filters & conditions",
    },
    {
      title: "Not null city",
      description: "Filter non-null",
      expression: "people[?city!=null]",
      output: "[...]",
      input: inputs.people,
      category: "Filters & conditions",
    },
  ];

  const projections: ExampleItem[] = [
    {
      title: "Order totals",
      description: "Project totals only",
      expression: "orders[].{OrderId:id, Total:total}",
      output: `[{"OrderId":"o-100","Total":120.5},{"OrderId":"o-101","Total":42},{"OrderId":"o-102","Total":200}]`,
      input: inputs.orders,
      category: "Projections & transforms",
    },
    {
      title: "Flatten order items",
      description: "Flatten nested arrays",
      expression: "orders[].items[].{Sku: sku, Qty: qty}",
      output: `[{"Sku":"sku-1","Qty":2},{"Sku":"sku-2","Qty":1},{"Sku":"sku-3","Qty":5}]`,
      input: inputs.orders,
      category: "Projections & transforms",
    },
    {
      title: "Name to city map",
      description: "Object projection",
      expression: "{NYC: people[?city=='NYC'].name, Seattle: people[?city=='Seattle'].name}",
      output: `{"NYC":["Alice","Cara"],"Seattle":["Bob"]}`,
      input: inputs.people,
      category: "Projections & transforms",
    },
    {
      title: "Array of objects",
      description: "Multi-select hash",
      expression: "people[].{Name:name, Skills:skills}",
      output: "[...]",
      input: inputs.people,
      category: "Projections & transforms",
    },
    {
      title: "Totals summary",
      description: "Aggregate with sum",
      expression: "sum(orders[].total)",
      output: "362.5",
      input: inputs.orders,
      category: "Projections & transforms",
    },
    {
      title: "Inventory value",
      description: "Multiply fields",
      expression: "inventory[].{Name:name, Value: price * stock}",
      output: `[{"Name":"widget","Value":55},{"Name":"gizmo","Value":0},{"Name":"bolt","Value":8.8}]`,
      input: inputs.inventory,
      category: "Projections & transforms",
    },
    {
      title: "Team counts",
      description: "Nested projection per team",
      expression: "departments[].teams[].{Team:name, Headcount:headcount}",
      output: `[{"Team":"Platform","Headcount":12},{"Team":"Data","Headcount":7},{"Team":"Tier1","Headcount":15},{"Team":"Tier2","Headcount":5}]`,
      input: inputs.nested,
      category: "Projections & transforms",
    },
    {
      title: "Default value",
      description: "Handle missing tags",
      expression: "inventory[].{Name:name, FirstTag: tags[0] || 'none'}",
      output: `[{"Name":"widget","FirstTag":"sale"},{"Name":"gizmo","FirstTag":"featured"},{"Name":"bolt","FirstTag":"none"}]`,
      input: inputs.inventory,
      category: "Projections & transforms",
    },
    {
      title: "Rename and sort",
      description: "Projection with sort",
      expression: "sort_by(people, &age)[].{Name:name, Age:age}",
      output: "[...]",
      input: inputs.people,
      category: "Projections & transforms",
    },
    {
      title: "Cities with counts",
      description: "Group projection",
      expression: "{NYC:length(people[?city=='NYC']), Seattle:length(people[?city=='Seattle'])}",
      output: `{"NYC":2,"Seattle":1}`,
      input: inputs.people,
      category: "Projections & transforms",
    },
    {
      title: "Item quantities per order",
      description: "Map with pipe",
      expression: "orders[].{id:id, quantities: items[].qty}",
      output: "[...]",
      input: inputs.orders,
      category: "Projections & transforms",
    },
    {
      title: "Extract totals and ids",
      description: "Two arrays",
      expression: "{Ids: orders[].id, Totals: orders[].total}",
      output: `{"Ids":["o-100","o-101","o-102"],"Totals":[120.5,42,200]}`,
      input: inputs.orders,
      category: "Projections & transforms",
    },
  ];

  const functions: ExampleItem[] = [
    {
      title: "Max total",
      description: "max_by",
      expression: "max_by(orders, &total).id",
      output: `"o-102"`,
      input: inputs.orders,
      category: "Functions",
    },
    {
      title: "Min stock",
      description: "min_by",
      expression: "min_by(inventory, &stock).name",
      output: `"gizmo"`,
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Sort by price desc",
      description: "reverse + sort",
      expression: "reverse(sort_by(inventory, &price))[].name",
      output: `["gizmo","widget","bolt"]`,
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Average price",
      description: "avg",
      expression: "avg(inventory[].price)",
      output: "6.9",
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Join tags",
      description: "join",
      expression: "inventory[].{name:name, tags: join(',', tags)}",
      output: "[...]",
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Type of fields",
      description: "type function",
      expression: "people[].{name:name, type:type(age)}",
      output: "[...]",
      input: inputs.people,
      category: "Functions",
    },
    {
      title: "Keys of object",
      description: "keys",
      expression: "keys(inventory[0])",
      output: `["name","stock","price","tags"]`,
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Values of object",
      description: "values",
      expression: "values(inventory[0])",
      output: `["widget",10,5.5,["sale","blue"]]`,
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Not null selection",
      description: "not_null",
      expression: "not_null(inventory[0].tags[0], 'fallback')",
      output: `"sale"`,
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Merge objects",
      description: "merge",
      expression: "merge({a:1}, {b:2})",
      output: `{"a":1,"b":2}`,
      input: inputs.people,
      category: "Functions",
    },
    {
      title: "To array",
      description: "to_array",
      expression: "to_array(people[0].name)",
      output: `["Alice"]`,
      input: inputs.people,
      category: "Functions",
    },
    {
      title: "To string",
      description: "to_string number",
      expression: "to_string(inventory[0].stock)",
      output: `"10"`,
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "To number",
      description: "to_number",
      expression: "to_number('42')",
      output: "42",
      input: inputs.people,
      category: "Functions",
    },
    {
      title: "Ceiling price",
      description: "ceil",
      expression: "ceil(inventory[0].price)",
      output: "6",
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Floor price",
      description: "floor",
      expression: "floor(inventory[0].price)",
      output: "5",
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Starts with tag",
      description: "starts_with",
      expression: "inventory[0].tags[?starts_with(@, 's')]",
      output: `["sale"]`,
      input: inputs.inventory,
      category: "Functions",
    },
    {
      title: "Ends with check",
      description: "ends_with",
      expression: "people[?ends_with(city, 'C')].name",
      output: `["Alice","Cara"]`,
      input: inputs.people,
      category: "Functions",
    },
  ];

  const complex: ExampleItem[] = [
    {
      title: "Pipeline filter then project",
      description: "Pipe usage",
      expression: "people | [?age > `30`] | [].{Name:name, City:city}",
      output: "[...]",
      input: inputs.people,
      category: "Complex queries",
    },
    {
      title: "Top spender order",
      description: "max_by with pipe",
      expression: "max_by(orders, &total) | {Id: id, Total: total}",
      output: `{"Id":"o-102","Total":200}`,
      input: inputs.orders,
      category: "Complex queries",
    },
    {
      title: "Flatten items",
      description: "Flatten without parent id",
      expression: "orders[].items[]",
      output: `[{"sku":"sku-1","qty":2},{"sku":"sku-2","qty":1},{"sku":"sku-3","qty":5}]`,
      input: inputs.orders,
      category: "Complex queries",
    },
    {
      title: "Group cities",
      description: "Buckets",
      expression: "{NYC: people[?city=='NYC'], Others: people[?city!='NYC']}",
      output: "[...]",
      input: inputs.people,
      category: "Complex queries",
    },
    {
      title: "Skills with counts",
      description: "Flatten then count",
      expression: "people[].skills[] | group_by(@, @) | [].{skill: @[0], count: length(@)}",
      output: "[...]",
      input: inputs.people,
      category: "Complex queries",
    },
    {
      title: "Ensure CSV-ready shape",
      description: "Normalize with defaults",
      expression: "inventory[].{Name:name, Stock: stock || `0`, Price: price || `0`}",
      output: "[...]",
      input: inputs.inventory,
      category: "Complex queries",
    },
    {
      title: "Filter items over qty 2",
      description: "Nested filter",
      expression: "orders[].items[?qty > `2`]",
      output: "[...]",
      input: inputs.orders,
      category: "Complex queries",
    },
    {
      title: "Sum quantities per order",
      description: "math with sum",
      expression: "orders[].{id:id, totalQty: sum(items[].qty)}",
      output: "[...]",
      input: inputs.orders,
      category: "Complex queries",
    },
    {
      title: "Sort by headcount",
      description: "Nested sort",
      expression: "departments[].teams | [].sort_by(@, &headcount)[-1]",
      output: "[...]",
      input: inputs.nested,
      category: "Complex queries",
    },
    {
      title: "Department to team names",
      description: "map with projection",
      expression: "map(&{Department: name, Teams: teams[].name}, departments)",
      output: "[...]",
      input: inputs.nested,
      category: "Complex queries",
    },
  ];

  return [...basic, ...filters, ...projections, ...functions, ...complex];
}

const examples = buildExamples();

export default function ExamplesPage() {
  const pageUrl = `${SITE.url}/jmespath/examples`;
  const categories = Array.from(new Set(examples.map((e) => e.category)));

  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "JMESPath Examples Library",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["jmespath examples", "jmespath query examples", "jmespath online"],
        })}
      />

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          JMESPath Examples Library
        </h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          60+ practical JMESPath examples for filtering, projections, functions, and AWS-style JSON. Load any example into the playground and try it online.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/jmespath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Open playground
          </Link>
          <Link
            href="/jmespath/create-csv"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            JMESPath create CSV
          </Link>
        </div>
      </header>

      {categories.map((category) => (
        <section key={category} className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black dark:text-white">{category}</h2>
            <span className="text-xs text-black/60 dark:text-white/60">
              {examples.filter((e) => e.category === category).length} examples
            </span>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {examples
              .filter((e) => e.category === category)
              .map((example) => (
                <div
                  key={example.title + example.expression}
                  className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm shadow-sm dark:border-white/10 dark:bg-black/25"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-black dark:text-white">{example.title}</p>
                      <p className="text-xs text-black/60 dark:text-white/60">
                        {example.description}
                      </p>
                    </div>
                    <JmesLoadButton
                      json={example.input}
                      expression={example.expression}
                      scrollToTop
                      className="rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
                    >
                      Try it
                    </JmesLoadButton>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs uppercase tracking-[0.08em] text-black/60 dark:text-white/60">
                      Expression
                    </p>
                    <code className="mt-1 block rounded-md bg-black/5 px-2 py-1 font-mono text-xs text-black dark:bg-white/10 dark:text-white">
                      {example.expression}
                    </code>
                  </div>
                  <details className="mt-2 rounded-md border border-black/10 bg-white/70 p-2 dark:border-white/10 dark:bg-black/30">
                    <summary className="cursor-pointer text-xs font-semibold text-black dark:text-white">
                      Input JSON
                    </summary>
                    <pre className="mt-2 max-h-40 overflow-auto bg-black/5 p-2 font-mono text-[11px] text-black dark:bg-white/10 dark:text-white">
                      {example.input}
                    </pre>
                  </details>
                  <div className="mt-2">
                    <p className="text-xs uppercase tracking-[0.08em] text-black/60 dark:text-white/60">
                      Output
                    </p>
                    <pre className="mt-1 max-h-24 overflow-auto rounded-md bg-black/5 p-2 font-mono text-[11px] text-black dark:bg-white/10 dark:text-white">
                      {example.output}
                    </pre>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </Container>
  );
}
