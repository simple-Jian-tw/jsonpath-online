"use client";

import { useMemo } from "react";
import jmespath from "jmespath";

export type JmesPathResult = {
  ok: boolean;
  valueText: string;
  error?: string;
};

export function useJmesPath(jsonText: string, expression: string) {
  return useMemo<JmesPathResult>(() => {
    if (!jsonText.trim()) return { ok: true, valueText: "null" };
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText) as unknown;
    } catch {
      return {
        ok: false,
        valueText: "",
        error: "Invalid JSON input. Fix JSON before evaluating JMESPath.",
      };
    }

    try {
      const expr = expression?.trim() || "";
      const result = jmespath.search(parsed as unknown, expr || "*");
      return { ok: true, valueText: JSON.stringify(result, null, 2) };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        valueText: "",
        error: `Invalid JMESPath: ${message}`,
      };
    }
  }, [jsonText, expression]);
}
