export type LanguageSlug =
  | "java"
  | "go"
  | "python"
  | "javascript"
  | "php"
  | "csharp";

export type LanguageConfig = {
  slug: LanguageSlug;
  label: string;
  h1: string;
  title: string;
  description: string;
  primaryKeyword: string;
};

export const LANGUAGES: LanguageConfig[] = [
  {
    slug: "java",
    label: "Java",
    h1: "How to use JSONPath in Java",
    title: "Java JSONPath Playground (Jayway JsonPath) | JSONPath Online",
    description:
      "Validate JSONPath online and generate Jayway JsonPath code for Java. Test filters, wildcards, and recursive descent with instant results.",
    primaryKeyword: "java jsonpath",
  },
  {
    slug: "go",
    label: "Go",
    h1: "Golang JSONPath Playground",
    title: "Go JSONPath Playground | JSONPath Online",
    description:
      "Test and validate JSONPath online, then generate Go code snippets to extract values from JSON with JSONPath expressions.",
    primaryKeyword: "go jsonpath",
  },
  {
    slug: "python",
    label: "Python",
    h1: "Python JSONPath Evaluator",
    title: "Python JSONPath Evaluator | JSONPath Online",
    description:
      "Validate JSONPath online and generate Python JSONPath code examples. Quickly debug JSONPath queries and copy results.",
    primaryKeyword: "python jsonpath",
  },
  {
    slug: "javascript",
    label: "JavaScript",
    h1: "JavaScript JSONPath Playground",
    title: "JavaScript JSONPath Playground | JSONPath Online",
    description:
      "Run JSONPath in JavaScript with instant evaluation. Validate JSONPath online and generate JavaScript code snippets.",
    primaryKeyword: "javascript jsonpath",
  },
  {
    slug: "php",
    label: "PHP",
    h1: "PHP JSONPath Parser",
    title: "PHP JSONPath Parser | JSONPath Online",
    description:
      "Validate JSONPath online and generate PHP JSONPath code templates. Debug JSONPath queries with live results.",
    primaryKeyword: "php jsonpath",
  },
  {
    slug: "csharp",
    label: "C#",
    h1: "C# JSONPath Evaluator",
    title: "C# JSONPath Evaluator | JSONPath Online",
    description:
      "Test JSONPath expressions online and generate C# code examples to query JSON. Copy results, debug errors, iterate fast.",
    primaryKeyword: "c# jsonpath",
  },
];

export function getLanguageConfig(slug: string) {
  return LANGUAGES.find((l) => l.slug === slug);
}

