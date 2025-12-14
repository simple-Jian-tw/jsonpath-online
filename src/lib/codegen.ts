import type { LanguageSlug } from "@/lib/languages";

function escapeDoubleQuotes(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

export function generateCode(language: LanguageSlug, path: string) {
  const p = escapeDoubleQuotes(path || "$");
  switch (language) {
    case "java":
      return `// Maven: com.jayway.jsonpath:json-path
import com.jayway.jsonpath.JsonPath;

String json = /* your JSON string */;
Object result = JsonPath.read(json, "${p}");
System.out.println(result);`;
    case "go":
      return `// go get github.com/PaesslerAG/jsonpath
package main

import (
  "encoding/json"
  "fmt"
  "github.com/PaesslerAG/jsonpath"
)

func main() {
  var doc any
  _ = json.Unmarshal([]byte(/* your JSON */), &doc)
  result, err := jsonpath.Get("${p}", doc)
  fmt.Println(result, err)
}`;
    case "python":
      return `# pip install jsonpath-ng
import json
from jsonpath_ng.ext import parse

doc = json.loads("""...""")
expr = parse('${p.replaceAll("'", "\\'")}')
matches = [match.value for match in expr.find(doc)]
print(matches)`;
    case "javascript":
      return `// npm i jsonpath-plus
import { JSONPath } from "jsonpath-plus";

const json = /* your JSON object */;
const result = JSONPath({ path: "${p}", json });
console.log(result);`;
    case "php":
      return `// composer require softcreatr/jsonpath
<?php

use SoftCreatR\\JsonPath\\JsonPath;

$json = json_decode('{"key":"value"}', true);
$result = (new JsonPath())->find($json, '${p.replaceAll("'", "\\'")}')->data();
var_dump($result);`;
    case "csharp":
      return `// dotnet add package JsonPath.Net
using Json.Path;
using System.Text.Json;

var node = JsonNode.Parse(/* your JSON string */);
var path = JsonPath.Parse("${p}");
var result = path.Evaluate(node);
Console.WriteLine(result.Matches?.Count ?? 0);`;
    default:
      return "";
  }
}

