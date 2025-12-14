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
    if (!jsonText.trim()) return { ok: true, valueText: "[]"}; // empty input
    let json: any;
    try {
      json = JSON.parse(jsonText) as any;
    } catch (e) {
      return {
        ok: false,
        valueText: "",
        error: "Invalid JSON input. Fix JSON before evaluating JSONPath.",
      };
    }

    try {
      const result = JSONPath({
        path: path?.trim() || "$",
        json,
        wrap: true,
      });
      return { ok: true, valueText: JSON.stringify(result, null, 2) };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return {
        ok: false,
        valueText: "",
        error: `Invalid JSONPath: ${message}`,
      };
    }
  }, [jsonText, path]);
}
