import jmespath from "jmespath";

export type CsvOptions = {
  delimiter: "," | "\t" | ";" | string;
  quoteStyle: "auto" | "all" | "none";
  bom: boolean;
};

export type CsvPreview = {
  csv: string;
  rows: string[][];
  columns: string[];
};

type NormalizedRow = Record<string, unknown>;

function normalizeRows(value: unknown): NormalizedRow[] {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        return item as NormalizedRow;
      }
      return { value: item, index };
    });
  }

  if (value && typeof value === "object") {
    return [value as NormalizedRow];
  }

  return [{ value }];
}

function collectColumns(rows: NormalizedRow[]): string[] {
  const cols = new Set<string>();
  rows.slice(0, 50).forEach((row) => {
    Object.keys(row).forEach((k) => cols.add(k));
  });
  return Array.from(cols);
}

function needsQuoting(text: string, delimiter: string) {
  return text.includes(delimiter) || text.includes('"') || /\r|\n/.test(text);
}

function stringifyValue(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

export function evaluateCsv({
  jsonText,
  expression,
  options,
}: {
  jsonText: string;
  expression: string;
  options: CsvOptions;
}): { ok: true; preview: CsvPreview } | { ok: false; error: string } {
  let data: unknown;
  try {
    data = JSON.parse(jsonText);
  } catch {
    return { ok: false, error: "Invalid JSON input. Fix JSON before exporting." };
  }

  let result: unknown;
  try {
    result = jmespath.search(data, expression?.trim() || "*");
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: `Invalid JMESPath: ${message}` };
  }

  const rows = normalizeRows(result);
  const columns = collectColumns(rows);
  const delimiter = options.delimiter || ",";

  const stringRows = rows.map((row) =>
    columns.map((col) => stringifyValue((row as Record<string, unknown>)[col])),
  );

  const allRows = [columns, ...stringRows];
  const csvLines = allRows.map((line) =>
    line
      .map((cell) => {
        const shouldQuote =
          options.quoteStyle === "all" ||
          (options.quoteStyle === "auto" && needsQuoting(cell, delimiter));
        const escaped = cell.replaceAll('"', '""');
        return shouldQuote ? `"${escaped}"` : escaped;
      })
      .join(delimiter),
  );

  const csv = (options.bom ? "\ufeff" : "") + csvLines.join("\n");

  return {
    ok: true,
    preview: {
      csv,
      rows: stringRows.slice(0, 5),
      columns,
    },
  };
}
