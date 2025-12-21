"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Copy, Download, Highlighter, Search, WandSparkles } from "lucide-react";
import { JsonEditor } from "@/components/JsonEditor";
import { Toast } from "@/components/Toast";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useXPath, normalizeMarkup, type XPathEngineVersion, type XPathMode } from "@/hooks/useXPath";
import { cn } from "@/lib/cn";
import { generateXPathCode, type XPathCodegenTarget } from "@/lib/xpath-codegen";
import {
  XPATH_DEFAULT_EXPR,
  XPATH_DEFAULT_HTML,
  XPATH_DEFAULT_XML,
  XPATH_EXAMPLE_LIBRARY,
  XPATH_QUICK_EXAMPLE_GROUPS,
} from "@/lib/xpath-samples";

const CODE_TABS: { target: XPathCodegenTarget; label: string }[] = [
  { target: "python-selenium", label: "Python + Selenium" },
  { target: "javascript-playwright", label: "JavaScript + Playwright" },
  { target: "python-lxml", label: "Python + lxml" },
  { target: "java-selenium", label: "Java + Selenium" },
  { target: "csharp-selenium", label: "C# + Selenium" },
  { target: "javascript-vanilla", label: "JavaScript (browser)" },
];

function getInitialState(): { expr: string; doc: string; mode: XPathMode } {
  if (typeof window === "undefined") {
    return { expr: XPATH_DEFAULT_EXPR, doc: XPATH_DEFAULT_HTML, mode: "html" as XPathMode };
  }
  const params = new URLSearchParams(window.location.search);
  const expr = params.get("xpath") || XPATH_DEFAULT_EXPR;
  const doc = params.get("doc") || XPATH_DEFAULT_HTML;
  const modeParam: XPathMode = params.get("mode") === "xml" ? "xml" : "html";
  return { expr, doc, mode: modeParam };
}

export function XPathPlayground() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const initial = getInitialState();
  const [documentText, setDocumentText] = useState(initial.doc);
  const [mode, setMode] = useState<XPathMode>(initial.mode);
  const [expression, setExpression] = useState(initial.expr);
  const debouncedExpression = useDebouncedValue(expression, 200);
  const [version, setVersion] = useState<XPathEngineVersion>("1.0");
  const [activeCodeTab, setActiveCodeTab] = useState<XPathCodegenTarget>("python-selenium");
  const [includeErrorHandling, setIncludeErrorHandling] = useState(false);
  const [highlightDocument, setHighlightDocument] = useState(true);
  const [hoverLines, setHoverLines] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string; kind: "info" | "error" } | null>(null);

  const evaluation = useXPath(documentText, debouncedExpression, mode, version);

  const generatedCode = useMemo(
    () => generateXPathCode(activeCodeTab, debouncedExpression, { includeErrorHandling }),
    [activeCodeTab, debouncedExpression, includeErrorHandling],
  );

  const allHighlightedLines = useMemo(() => {
    if (!highlightDocument) return new Set<number>();
    const lines = new Set<number>();
    evaluation.matches.forEach((m) => {
      m.lineNumbers.forEach((l) => lines.add(l));
    });
    return lines;
  }, [evaluation.matches, highlightDocument]);

  const activeHoverLines = hoverLines.length ? new Set(hoverLines) : allHighlightedLines;

  async function copy(text: string, successMessage = "Copied to clipboard.") {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ kind: "info", message: successMessage });
    } catch {
      setToast({ kind: "error", message: "Copy failed. Please try again." });
    }
  }

  function loadSample() {
    setDocumentText(mode === "html" ? XPATH_DEFAULT_HTML : XPATH_DEFAULT_XML);
  }

  function formatMarkup() {
    const formatted = normalizeMarkup(documentText, mode);
    if (formatted.ok) {
      setDocumentText(formatted.normalized);
    } else {
      setToast({ kind: "error", message: formatted.error || "Could not format document." });
    }
  }

  const resultJson = useMemo(
    () =>
      JSON.stringify(
        evaluation.matches.map((m) => ({
          path: m.path,
          nodeName: m.nodeName,
          outerHTML: m.outerHTML,
          text: m.textSnippet,
        })),
        null,
        2,
      ),
    [evaluation.matches],
  );

  return (
    <section className="mt-6">
      <Toast
        message={toast?.message ?? null}
        kind={toast?.kind}
        onClear={() => setToast(null)}
      />

      <div className="rounded-2xl border border-black/10 bg-white/50 p-5 shadow-sm dark:border-white/10 dark:bg-black/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              <Search className="h-4 w-4" />
              XPath expression
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2 ring-1 ring-transparent focus-within:ring-2 focus-within:ring-black/20 dark:border-white/10 dark:bg-black/40 dark:focus-within:ring-white/20",
                !evaluation.ok && "border-red-500/60 focus-within:ring-red-500/30 dark:border-red-500/60",
              )}
            >
              <input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                spellCheck={false}
                className="w-full bg-transparent font-mono text-[13px] text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/40"
                placeholder="//button[@type='submit']"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-black/60 dark:text-white/60">
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                {evaluation.ok ? `Matches: ${evaluation.count}` : "Validation failed"}
              </span>
              <label className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                  Engine
                </span>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value as XPathEngineVersion)}
                  className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs text-black/80 dark:border-white/10 dark:bg-black/40 dark:text-white/80"
                >
                  <option value="1.0">XPath 1.0</option>
                  <option value="2.0">XPath 2.0 (experimental)</option>
                </select>
              </label>
              <label className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                  Document
                </span>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as XPathMode)}
                  className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs text-black/80 dark:border-white/10 dark:bg-black/40 dark:text-white/80"
                >
                  <option value="html">HTML</option>
                  <option value="xml">XML</option>
                </select>
              </label>
              <span className="text-[11px] text-black/50 dark:text-white/50">Debounced 200ms</span>
            </div>
            {evaluation.warning && (
              <p className="text-xs text-amber-600 dark:text-amber-300">{evaluation.warning}</p>
            )}
            {!evaluation.ok && evaluation.error && (
              <p className="text-xs text-red-600 dark:text-red-400">{evaluation.error}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={formatMarkup}
              className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              <WandSparkles className="h-4 w-4" />
              Format
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={() => copy(expression, "XPath copied")}
              className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              <Copy className="h-4 w-4" />
              Copy XPath
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-black dark:text-white">Input document</h2>
                <p className="text-xs text-black/60 dark:text-white/50">
                  Paste HTML or XML. Validation happens locally.
                </p>
              </div>
              <span className="text-xs text-black/60 dark:text-white/50">{mode === "html" ? "HTML" : "XML"} mode</span>
            </div>
            <div className="h-[360px] overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
              {isDesktop ? (
                <JsonEditor
                  language={mode === "html" ? "html" : "xml"}
                  value={documentText}
                  onChange={setDocumentText}
                  height={360}
                />
              ) : (
                <textarea
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  className="h-full w-full resize-none bg-white p-3 font-mono text-xs text-black outline-none dark:bg-black/40 dark:text-white"
                />
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-black dark:text-white">Results</h2>
                <p className="text-xs text-black/60 dark:text-white/50">
                  Hover a result to highlight it in the document preview.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <label className="inline-flex items-center gap-1 text-black/70 dark:text-white/70">
                  <input
                    type="checkbox"
                    checked={highlightDocument}
                    onChange={(e) => setHighlightDocument(e.target.checked)}
                    className="h-4 w-4 rounded border-black/20 dark:border-white/30"
                  />
                  Highlight in Document
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copy(resultJson, "Results JSON copied")}
                  className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  Export as JSON
                </button>
                <button
                  type="button"
                  onClick={() => copy(evaluation.matches.map((m) => m.path).join("\n") || "", "Paths copied")}
                  className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
                >
                  Copy Paths
                </button>
              </div>

              <div className="max-h-[360px] space-y-2 overflow-auto rounded-xl border border-black/10 bg-white/60 p-3 dark:border-white/10 dark:bg-black/30">
                {evaluation.matches.length === 0 && (
                  <p className="text-sm text-black/60 dark:text-white/60">
                    No elements matched. Try adjusting your XPath.
                  </p>
                )}
                {evaluation.matches.map((m, idx) => (
                  <div
                    key={`${m.path}-${idx}`}
                    onMouseEnter={() => setHoverLines(m.lineNumbers)}
                    onMouseLeave={() => setHoverLines([])}
                    className="rounded-lg border border-black/10 bg-white/80 p-3 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-black/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="font-mono text-xs text-black/80 dark:text-white/80">{m.path || "/"}</p>
                        <p className="text-xs text-black/60 dark:text-white/60">{m.nodeName}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copy(m.outerHTML, "Node copied")}
                        className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs text-black/70 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/70 dark:hover:bg-white/10"
                      >
                        Copy node
                      </button>
                    </div>
                    <pre className="mt-2 overflow-auto rounded-md bg-black/5 p-2 font-mono text-[11px] text-black/80 dark:bg-white/5 dark:text-white/80">
                      {m.outerHTML}
                    </pre>
                    {m.textSnippet && (
                      <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                        Text: {m.textSnippet}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Highlighter className="h-4 w-4 text-purple-500" />
              <div>
                <h3 className="text-sm font-semibold text-black dark:text-white">Document preview</h3>
                <p className="text-xs text-black/60 dark:text-white/50">
                  Lines matching results are shaded.
                </p>
              </div>
            </div>
            <span className="text-xs text-black/60 dark:text-white/50">Read-only</span>
          </div>
          <pre className="mt-3 max-h-[260px] overflow-auto rounded-lg border border-black/10 bg-white/70 p-3 text-[11px] leading-[1.4] text-black dark:border-white/10 dark:bg-black/30 dark:text-white">
            {evaluation.normalizedSource.split("\n").map((line, i) => {
              const lineNumber = i + 1;
              const isActive = activeHoverLines.has(lineNumber);
              return (
                <div
                  key={lineNumber}
                  className={cn(
                    "flex gap-3",
                    isActive && "bg-purple-100/70 text-black dark:bg-purple-500/10 dark:text-white",
                  )}
                >
                  <span className="w-12 select-none text-right text-[10px] text-black/40 dark:text-white/40">
                    {lineNumber.toString().padStart(3, "0")}
                  </span>
                  <span className="whitespace-pre-wrap">{line || " "}</span>
                </div>
              );
            })}
          </pre>
        </div>

        <div className="mt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-black dark:text-white">Code Generator</h2>
            <label className="inline-flex items-center gap-2 text-xs text-black/70 dark:text-white/70">
              <input
                type="checkbox"
                checked={includeErrorHandling}
                onChange={(e) => setIncludeErrorHandling(e.target.checked)}
                className="h-4 w-4 rounded border-black/20 dark:border-white/30"
              />
              Add error handling
            </label>
            <div className="flex flex-wrap gap-1 rounded-lg border border-black/10 bg-white/50 p-1 dark:border-white/10 dark:bg-black/20">
              {CODE_TABS.map((tab) => (
                <button
                  key={tab.target}
                  type="button"
                  onClick={() => setActiveCodeTab(tab.target)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm",
                    activeCodeTab === tab.target
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            {isDesktop ? (
              <JsonEditor language="javascript" value={generatedCode} readOnly height={240} />
            ) : (
              <pre className="max-h-[240px] overflow-auto bg-white p-3 font-mono text-xs text-black dark:bg-black/40 dark:text-white">
                {generatedCode}
              </pre>
            )}
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => copy(generatedCode, "Code copied")}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:bg-white/10"
            >
              Copy Code
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Quick Examples</h3>
        <p className="text-sm text-black/70 dark:text-white/70">Click to load XPath and HTML instantly.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {XPATH_QUICK_EXAMPLE_GROUPS.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/30"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-black dark:text-white">{group.title}</h4>
                <span className="text-[11px] text-black/50 dark:text-white/50">
                  {group.items.length} patterns
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {group.items.map((item) => (
                  <button
                    key={item.expression}
                    type="button"
                    onClick={() => {
                      setExpression(item.expression);
                      setDocumentText(item.html);
                    }}
                    className="rounded-lg border border-black/10 bg-white/90 px-3 py-2 text-left text-sm text-black/80 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-white/80"
                  >
                    <p className="font-mono text-[12px] text-black dark:text-white">{item.expression}</p>
                    <p className="text-xs text-black/60 dark:text-white/60">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-black/10 bg-white/30 p-5 dark:border-white/10 dark:bg-black/10">
        <h3 className="text-lg font-semibold text-black dark:text-white">Example library preview</h3>
        <p className="text-sm text-black/70 dark:text-white/70">
          The XPath examples page contains 60+ scenarios. Here are a few highlights:
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {XPATH_EXAMPLE_LIBRARY.slice(0, 6).map((ex) => (
            <div
              key={ex.expression}
              className="rounded-xl border border-black/10 bg-white/70 p-3 dark:border-white/10 dark:bg-black/30"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                {ex.category}
              </p>
              <p className="mt-1 font-mono text-[12px] text-black dark:text-white">{ex.expression}</p>
              <p className="mt-1 text-xs text-black/60 dark:text-white/60">{ex.description}</p>
              <p className="mt-1 text-xs text-purple-700 dark:text-purple-200">Preview: {ex.takeaway}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
