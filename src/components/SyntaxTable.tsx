const rows = [
  { token: "$", meaning: "Root object/array", example: "$.store.book" },
  { token: "@", meaning: "Current node (in filters)", example: "$.book[?(@.price < 10)]" },
  { token: "*", meaning: "Wildcard", example: "$.store.*" },
  { token: "..", meaning: "Recursive descent", example: "$..author" },
  { token: "[n]", meaning: "Array index", example: "$.store.book[0]" },
  { token: "[a,b]", meaning: "Union", example: "$.store.book[0,2]" },
  { token: "[start:end]", meaning: "Slice", example: "$.store.book[0:2]" },
  { token: "[?()]", meaning: "Filter expression", example: "$.store.book[?(@.category=='fiction')]" },
];

export function SyntaxTable() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">JSONPath Syntax Cheatsheet</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/5 text-black/70 dark:bg-white/5 dark:text-white/70">
            <tr>
              <th className="px-4 py-2 font-medium">Token</th>
              <th className="px-4 py-2 font-medium">Meaning</th>
              <th className="px-4 py-2 font-medium">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 bg-white/40 dark:divide-white/10 dark:bg-black/20">
            {rows.map((row) => (
              <tr key={row.token}>
                <td className="whitespace-nowrap px-4 py-2 font-mono text-xs">
                  {row.token}
                </td>
                <td className="px-4 py-2 text-black/70 dark:text-white/70">
                  {row.meaning}
                </td>
                <td className="px-4 py-2 font-mono text-xs text-black/70 dark:text-white/70">
                  {row.example}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

