"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-lg border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5" />
  ),
});

export type JsonEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  language: "json" | "plaintext" | "javascript";
  readOnly?: boolean;
  height?: string | number;
};

export function JsonEditor({
  value,
  onChange,
  language,
  readOnly,
  height = 420,
}: JsonEditorProps) {
  const options = useMemo(
    () => ({
      readOnly: Boolean(readOnly),
      minimap: { enabled: false },
      fontSize: 13,
      tabSize: 2,
      wordWrap: "on" as const,
      scrollBeyondLastLine: false,
      folding: true,
      lineNumbers: "on" as const,
      automaticLayout: true,
    }),
    [readOnly],
  );

  return (
    <MonacoEditor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange?.(v ?? "")}
      options={options}
    />
  );
}

