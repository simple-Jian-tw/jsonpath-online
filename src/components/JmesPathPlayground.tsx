"use client";
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { JsonEditor } from "@/components/JsonEditor";
import { Toast } from "@/components/Toast";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useJmesPath } from "@/hooks/useJmesPath";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { generateJmesCode } from "@/lib/jmes-codegen";
import { JMES_DEFAULT_EXPR, JMES_DEFAULT_JSON, JMES_QUICK_EXAMPLES } from "@/lib/jmes-sample";
import { cn } from "@/lib/cn";
import type { LanguageSlug } from "@/lib/languages";

const CODE_TABS: { slug: LanguageSlug; label: string }[] = [
  { slug: "python", label: "Python" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "go", label: "Go" },
  { slug: "java", label: "Java" },
  { slug: "php", label: "PHP" },
  { slug: "csharp", label: "C#" },
];

export function JmesPathPlayground({
  defaultTab = "python",
}: {
  defaultTab?: LanguageSlug;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [jsonText, setJsonText] = useState(JMES_DEFAULT_JSON);
  const [expression, setExpression] = useState(JMES_DEFAULT_EXPR);
  const debouncedExpr = useDebouncedValue(expression, 300);

  const [activeTab, setActiveTab] = useState<LanguageSlug>(defaultTab);
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const { ok, valueText, error } = useJmesPath(jsonText, debouncedExpr);
  const [toast, setToast] = useState<{ kind: "info" | "error"; message: string } | null>(null);

  useEffect(() => {
    const initialExpr = new URLSearchParams(window.location.search).get("expr");
    if (initialExpr && initialExpr.trim()) {
      setExpression(initialExpr.trim());
    }
  }, []);

  useEffect(() => {
    if (!ok && error) {
      setToast({ kind: "error", message: error });
    }
  }, [ok, error]);

  const code = useMemo(
    () => generateJmesCode(activeTab, debouncedExpr?.trim() || "*"),
    [activeTab, debouncedExpr],
  );

  async function onCopy(text: string) {
    await navigator.clipboard.writeText(text);
    setToast({ kind: "info", message: "Copied to clipboard." });
  }

  function onFormatJson() {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch {
      // keep inline error guidance
    }
  }

  function applyExample(expr: string) {
    setExpression(expr);
    setJsonText((prev) => prev || JMES_DEFAULT_JSON);
  }

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
                !ok &&
                  "border-red-500/60 focus-within:ring-red-500/25 dark:border-red-500/60",
              )}
            >
              <Search className="h-4 w-4 shrink-0 text-black/40 dark:text-white/40" />
              <input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                spellCheck={false}
                className="w-full bg-transparent font-mono text-[13px] text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/30"
                placeholder="people[?age > `30`].name"
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
              onClick={() => onCopy(valueText)}
              disabled={!ok}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              Copy Result
            </button>
          </div>
        </div>

        {!ok && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {JMES_QUICK_EXAMPLES.map((ex) => (
              <button
                key={ex.expression}
                type="button"
                onClick={() => applyExample(ex.expression)}
                className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
              >
                <span className="font-medium">{ex.title}</span>
                <span className="hidden text-[11px] text-black/50 dark:text-white/50 sm:inline">
                  {ex.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                Input JSON
              </h2>
              <span className="text-xs text-black/50 dark:text-white/40">
                Live evaluation (300ms)
              </span>
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

          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-black/80 dark:text-white/80">
                Result
              </h2>
              <span className="text-xs text-black/50 dark:text-white/40">
                JSON output
              </span>
            </div>
            <div className="h-[360px] overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
              {isDesktop ? (
                <JsonEditor language="json" value={ok ? valueText : ""} readOnly height={360} />
              ) : (
                <pre className="h-full overflow-auto bg-white p-3 font-mono text-xs text-black dark:bg-black/40 dark:text-white">
                  {ok ? valueText : ""}
                </pre>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold">Generate Code</h2>
            <div className="flex flex-wrap gap-1 rounded-lg border border-black/10 bg-white/50 p-1 dark:border-white/10 dark:bg-black/20">
              {CODE_TABS.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setActiveTab(t.slug)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm",
                    activeTab === t.slug
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            {isDesktop ? (
              <JsonEditor language="javascript" value={code} readOnly height={220} />
            ) : (
              <pre className="max-h-[220px] overflow-auto bg-white p-3 font-mono text-xs text-black dark:bg-black/40 dark:text-white">
                {code}
              </pre>
            )}
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => onCopy(code)}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
