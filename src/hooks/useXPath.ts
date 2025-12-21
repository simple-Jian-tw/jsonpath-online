"use client";

import { useMemo } from "react";

export type XPathEngineVersion = "1.0" | "2.0";
export type XPathMode = "html" | "xml";

export type XPathMatch = {
  path: string;
  outerHTML: string;
  nodeName: string;
  textSnippet: string;
  lineNumbers: number[];
};

export type XPathEvaluation = {
  ok: boolean;
  count: number;
  matches: XPathMatch[];
  normalizedSource: string;
  error?: string;
  warning?: string;
};

function prettify(xml: string) {
  const reg = /(>)(<)(\/*)/g;
  const formatted = xml.replace(reg, "$1\n$2$3");
  let pad = 0;
  return formatted
    .split("\n")
    .map((line) => {
      let indent = 0;
      if (line.match(/<\/\w/)) {
        pad = Math.max(pad - 1, 0);
      }
      indent = pad;
      if (line.match(/<\w[^>]*[^/]>/)) {
        pad += 1;
      }
      if (line.match(/<\w[^>]*\/>/)) {
        indent = pad;
      }
      return `${"  ".repeat(indent)}${line.trim()}`;
    })
    .join("\n");
}

export function normalizeMarkup(source: string, mode: XPathMode) {
  try {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(
      source,
      mode === "html" ? "text/html" : "application/xml",
    );
    if (mode === "xml" && parsed.getElementsByTagName("parsererror").length > 0) {
      return { ok: false, normalized: source, error: "Invalid XML. Please fix markup before evaluating XPath." };
    }
    const serializer = new XMLSerializer();
    const serialized =
      mode === "html"
        ? parsed.documentElement?.outerHTML || source
        : serializer.serializeToString(parsed);
    return { ok: true, normalized: prettify(serialized) };
  } catch {
    return { ok: false, normalized: source, error: "Unable to format document." };
  }
}

function buildPath(node: Node | null): string {
  if (!node) return "";
  if (node.nodeType === Node.DOCUMENT_NODE) return "";
  if (node.nodeType === Node.ATTRIBUTE_NODE) {
    const attr = node as Attr;
    const owner = attr.ownerElement;
    return `${buildPath(owner)}/@${attr.name}`;
  }
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentNode;
    let index = 1;
    if (parent) {
      for (const s of Array.from(parent.childNodes)) {
        if (s === node) break;
        if (s.nodeType === Node.TEXT_NODE) {
          index += 1;
        }
      }
    }
    return `${buildPath(parent)}/text()[${index}]`;
  }

  const el = node as Element;
  const parentPath = buildPath(el.parentElement);
  let index = 1;
  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.tagName === el.tagName) index += 1;
    sibling = sibling.previousElementSibling;
  }
  return `${parentPath}/${el.tagName.toLowerCase()}[${index}]`;
}

function computeLineNumbers(source: string, fragment: string) {
  if (!fragment) return [];
  const idx = source.indexOf(fragment.trim());
  if (idx === -1) return [];
  const prefix = source.slice(0, idx);
  const startLine = prefix.split("\n").length;
  const lineCount = fragment.split("\n").length || 1;
  return Array.from({ length: lineCount }, (_, i) => startLine + i);
}

function serializeNode(node: Node, serializer: XMLSerializer) {
  if (node.nodeType === Node.ATTRIBUTE_NODE) {
    const attr = node as Attr;
    return `${attr.name}="${attr.value}"`;
  }
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent || "").trim();
  }
  return serializer.serializeToString(node);
}

export function useXPath(
  source: string,
  expression: string,
  mode: XPathMode,
  version: XPathEngineVersion = "1.0",
): XPathEvaluation {
  return useMemo<XPathEvaluation>(() => {
    if (!source.trim()) {
      return { ok: true, count: 0, matches: [], normalizedSource: "" };
    }
    const formatted = normalizeMarkup(source, mode);
    if (!formatted.ok) {
      return {
        ok: false,
        count: 0,
        matches: [],
        normalizedSource: formatted.normalized,
        error: formatted.error,
      };
    }
    const normalizedSource = formatted.normalized;
    try {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(
        normalizedSource,
        mode === "html" ? "text/html" : "application/xml",
      );
      if (mode === "xml" && parsed.getElementsByTagName("parsererror").length > 0) {
        return {
          ok: false,
          count: 0,
          matches: [],
          normalizedSource,
          error: "Invalid XML document. Fix parsing errors to continue.",
        };
      }

      const evaluator = new XPathEvaluator();
      const result = evaluator.evaluate(
        expression?.trim() || "//*",
        parsed,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null,
      );

      const serializer = new XMLSerializer();
      const matches: XPathMatch[] = [];
      for (let i = 0; i < result.snapshotLength; i += 1) {
        const item = result.snapshotItem(i);
        if (!item) continue;
        const outerHTML = serializeNode(item, serializer);
        matches.push({
          path: buildPath(item),
          outerHTML,
          nodeName:
            item.nodeType === Node.TEXT_NODE
              ? "#text"
              : item.nodeType === Node.ATTRIBUTE_NODE
                ? `@${(item as Attr).name}`
                : (item as Element).tagName.toLowerCase(),
          textSnippet: (item.textContent || "").trim().slice(0, 140),
          lineNumbers: computeLineNumbers(normalizedSource, outerHTML),
        });
      }

      return {
        ok: true,
        count: matches.length,
        matches,
        normalizedSource,
        warning:
          version === "2.0"
            ? "XPath 2.0 selected. Advanced 2.0-only functions may be limited by the browser evaluator."
            : undefined,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        count: 0,
        matches: [],
        normalizedSource: formatted.normalized,
        error: `Invalid XPath: ${message}`,
      };
    }
  }, [expression, mode, source, version]);
}
