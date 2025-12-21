"use client";

import { useMemo } from "react";
import { JSONPath } from "jsonpath-plus";

export type JsonPathResult = {
  ok: boolean;
  valueText: string;
  error?: string;
};

export function useJsonPath(jsonText: string, path: string) {
  return useMemo<JsonPathResult>(() => {
    if (!jsonText.trim()) return { ok: true, valueText: "[]" };
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText) as unknown;
    } catch {
      return {
        ok: false,
        valueText: "",
        error: "Invalid JSON input. Fix JSON before evaluating JSONPath.",
      };
    }

    try {
      const result = JSONPath({
        path: path?.trim() || "$",
        json: parsed as object,
        wrap: true,
      });
      return { ok: true, valueText: JSON.stringify(result, null, 2) };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        valueText: "",
        error: `Invalid JSONPath: ${message}`,
      };
    }
  }, [jsonText, path]);
}
