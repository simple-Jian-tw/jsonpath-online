"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { JsonEditor } from "@/components/JsonEditor";
import { Toast } from "@/components/Toast";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useJmesPath } from "@/hooks/useJmesPath";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { evaluateCsv } from "@/lib/csv-export";
import { JMES_DEFAULT_EXPR, JMES_DEFAULT_JSON } from "@/lib/jmes-sample";
import { cn } from "@/lib/cn";

type Encoding = "utf8" | "utf8-bom" | "gbk";
type QuoteStyle = "auto" | "all" | "none";

export function JmesCsvTool() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [jsonText, setJsonText] = useState(JMES_DEFAULT_JSON);
  const [expression, setExpression] = useState(JMES_DEFAULT_EXPR);
  const debouncedExpr = useDebouncedValue(expression, 300);

  const [delimiter, setDelimiter] = useState<string>(",");
  const [customDelimiter, setCustomDelimiter] = useState<string>("");
  const [quoteStyle, setQuoteStyle] = useState<QuoteStyle>("auto");
  const [encoding, setEncoding] = useState<Encoding>("utf8");
  const [fileName, setFileName] = useState("jmespath-result.csv");

  const [toast, setToast] = useState<{ kind: "info" | "error"; message: string } | null>(null);

  const csvOptions = useMemo(() => {
    const resolvedDelimiter = delimiter === "custom" ? customDelimiter || "," : delimiter;
    return {
      delimiter: resolvedDelimiter,
      quoteStyle,
      bom: encoding === "utf8-bom",
    };
  }, [customDelimiter, delimiter, quoteStyle, encoding]);

  const jmesResult = useJmesPath(jsonText, debouncedExpr);
  const csvResult = useMemo(
    () => evaluateCsv({ jsonText, expression: debouncedExpr, options: csvOptions }),
    [jsonText, debouncedExpr, csvOptions],
  );

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ json: string; expression: string }>).detail;
      if (!detail) return;
      setJsonText(detail.json);
      setExpression(detail.expression);
      setToast({ kind: "info", message: "Loaded example into the tool." });
    };
    window.addEventListener("jmespath:load-example", handler);
    return () => window.removeEventListener("jmespath:load-example", handler);
  }, []);

  useEffect(() => {
    if (!jmesResult.ok && jmesResult.error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToast({ kind: "error", message: jmesResult.error });
    }
  }, [jmesResult]);

  const previewRows =
    csvResult.ok && csvResult.preview.rows.length > 0 ? csvResult.preview.rows : [];
  const previewColumns = csvResult.ok ? csvResult.preview.columns : [];

  async function onCopy(text: string) {
    await navigator.clipboard.writeText(text);
    setToast({ kind: "info", message: "Copied to clipboard." });
  }

  function onFormatJson() {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch {
      // handled by inline error
    }
  }

  function downloadCsv() {
    if (!csvResult.ok) {
      setToast({ kind: "error", message: csvResult.error });
      return;
    }
    const csv = csvResult.preview.csv;
    const blob = new Blob([csv], {
      type:
        encoding === "gbk"
          ? "text/csv;charset=gbk"
          : encoding === "utf8-bom"
            ? "text/csv;charset=utf-8"
            : "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "jmespath-result.csv";
    a.click();
    URL.revokeObjectURL(url);
    setToast({ kind: "info", message: "CSV downloaded." });
  }

  const exportDisabled = !csvResult.ok || previewColumns.length === 0;

  return (
    <section className="mt-6">
      <Toast
        message={toast?.message ?? null}
        kind={toast?.kind}
        onClear={() => setToast(null)}
      />
      <div className="rounded-2xl border border-black/10 bg-white/40 p-4 dark:border-white/10 dark:bg-black/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-xl">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium text-black/80 dark:text-white/80">
                JMESPath expression
              </label>
              <span className="hidden text-xs text-black/50 dark:text-white/40 sm:inline">
                Example: <span className="font-mono">people[?age &gt; `30`].name</span>
              </span>
            </div>
            <div
              className={cn(
                "mt-2 flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2 shadow-sm ring-1 ring-transparent focus-within:ring-2 focus-within:ring-black/20 dark:border-white/10 dark:bg-black/40 dark:focus-within:ring-white/20",
                !jmesResult.ok &&
                  "border-red-500/60 focus-within:ring-red-500/25 dark:border-red-500/60",
              )}
            >
              <Search className="h-4 w-4 shrink-0 text-black/40 dark:text-white/40" />
              <input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                spellCheck={false}
                className="w-full bg-transparent font-mono text-[13px] text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/30"
                placeholder="people[*].{name: name, city: location.city}"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onFormatJson()}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              Format JSON
            </button>
            <button
              type="button"
              onClick={() => onCopy(jmesResult.valueText)}
              disabled={!jmesResult.ok}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              Copy Result
            </button>
          </div>
        </div>

        {!jmesResult.ok && jmesResult.error && (
          <p className="mt-2 text-sm text-red-500">{jmesResult.error}</p>
        )}

        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1.3fr]">
          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                Input JSON
              </h2>
              <span className="text-xs text-black/50 dark:text-white/40">Live evaluation</span>
            </div>
            <div className="h-[360px] overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
              {isDesktop ? (
                <JsonEditor
                  language="json"
                  value={jsonText}
                  onChange={setJsonText}
                  height={360}
                />
              ) : (
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  className="h-full w-full resize-none bg-white p-3 font-mono text-xs text-black outline-none dark:bg-black/40 dark:text-white"
                />
              )}
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                  CSV export options
                </h2>
              </div>
              <div className="grid gap-3 rounded-xl border border-black/10 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-black/30">
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="flex items-center justify-between gap-2">
                    <span className="text-black/70 dark:text-white/70">Delimiter</span>
                    <select
                      value={delimiter}
                      onChange={(e) => setDelimiter(e.target.value)}
                      className="w-32 rounded-md border border-black/10 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-black/40"
                    >
                      <option value=",">Comma (,)</option>
                      <option value="\t">Tab (\\t)</option>
                      <option value=";">Semicolon (;)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </label>
                  {delimiter === "custom" && (
                    <input
                      value={customDelimiter}
                      onChange={(e) => setCustomDelimiter(e.target.value)}
                      placeholder="Enter delimiter"
                      className="w-full rounded-md border border-black/10 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-black/40"
                    />
                  )}
                  <label className="flex items-center justify-between gap-2">
                    <span className="text-black/70 dark:text-white/70">Quote style</span>
                    <select
                      value={quoteStyle}
                      onChange={(e) => setQuoteStyle(e.target.value as QuoteStyle)}
                      className="w-40 rounded-md border border-black/10 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-black/40"
                    >
                      <option value="auto">Only when needed</option>
                      <option value="all">All fields</option>
                      <option value="none">No quotes</option>
                    </select>
                  </label>
                  <label className="flex items-center justify-between gap-2">
                    <span className="text-black/70 dark:text-white/70">Encoding</span>
                    <select
                      value={encoding}
                      onChange={(e) => setEncoding(e.target.value as Encoding)}
                      className="w-40 rounded-md border border-black/10 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-black/40"
                    >
                      <option value="utf8">UTF-8</option>
                      <option value="utf8-bom">UTF-8 with BOM</option>
                      <option value="gbk">GBK</option>
                    </select>
                  </label>
                  <label className="flex items-center justify-between gap-2">
                    <span className="text-black/70 dark:text-white/70">File name</span>
                    <input
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="w-full rounded-md border border-black/10 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-black/40"
                    />
                  </label>
                </div>
                {csvResult.ok && previewColumns.length === 0 && (
                  <p className="text-xs text-black/60 dark:text-white/60">
                    No columns detected. Make sure your JMESPath returns an array of objects.
                  </p>
                )}
                {!csvResult.ok && (
                  <p className="text-xs text-red-500">{csvResult.error}</p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                  CSV preview (first 5 rows)
                </h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => csvResult.ok && onCopy(csvResult.preview.csv)}
                    disabled={!csvResult.ok}
                    className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs text-black/80 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
                  >
                    Copy CSV
                  </button>
                  <button
                    type="button"
                    onClick={downloadCsv}
                    disabled={exportDisabled}
                    className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/30 hover:from-emerald-600 hover:to-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export to CSV
                  </button>
                </div>
              </div>
              <div className="overflow-auto rounded-xl border border-black/10 bg-white/70 text-sm dark:border-white/10 dark:bg-black/30">
                <table className="min-w-full divide-y divide-black/10 text-left text-xs text-black/80 dark:divide-white/10 dark:text-white/80">
                  <thead className="bg-black/5 dark:bg-white/10">
                    <tr>
                      {previewColumns.map((col) => (
                        <th key={col} className="px-3 py-2 font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 dark:divide-white/5">
                    {previewRows.map((row, idx) => (
                      <tr key={idx}>
                        {row.map((cell, cidx) => (
                          <td key={cidx} className="px-3 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {previewRows.length === 0 && (
                      <tr>
                        <td className="px-3 py-4 text-black/60 dark:text-white/60">
                          Add a JMESPath that returns an array of objects to see CSV preview.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
