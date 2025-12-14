import type { LanguageConfig } from "@/lib/languages";

export type FaqItem = { q: string; a: string };

export function getGenericFaq(): FaqItem[] {
  return [
    {
      q: "What is JSONPath?",
      a: "JSONPath is a query language for JSON. It helps you select and extract values from JSON documents using path-like expressions.",
    },
    {
      q: "How do I filter arrays in JSONPath?",
      a: "Use filter expressions like $.items[?(@.price < 10)] to select array elements by conditions.",
    },
    {
      q: "Why does my JSONPath return empty results?",
      a: "Common reasons include invalid JSON input, a typo in keys, mismatched array/object structure, or using a JSONPath syntax not supported by your library.",
    },
    {
      q: "Does this tool support recursive descent?",
      a: "Yes. Use .. to search for keys at any depth, for example $..author.",
    },
  ];
}

export function getLanguageFaq(lang: LanguageConfig): FaqItem[] {
  const base = getGenericFaq();
  return [
    {
      q: `How do I use JSONPath in ${lang.label}?`,
      a: `Use the code generator below to copy a ${lang.label} snippet, then replace the JSON and JSONPath expression with your own.`,
    },
    ...base,
  ];
}

