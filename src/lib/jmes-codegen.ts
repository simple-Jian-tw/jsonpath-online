import type { LanguageSlug } from "@/lib/languages";

function escapeDoubleQuotes(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

export function generateJmesCode(language: LanguageSlug, expression: string) {
  const expr = escapeDoubleQuotes(expression || "*");
  switch (language) {
    case "python":
      return `# pip install jmespath
import json
import jmespath

data = json.loads("""...""")
expr = jmespath.compile("${expr}")
result = expr.search(data)
print(json.dumps(result, indent=2))`;
    case "javascript":
      return `// npm i jmespath
import jmespath from "jmespath";

const data = /* your JSON object */;
const result = jmespath.search(data, "${expr}");
console.log(result);`;
    case "go":
      return `// go get github.com/jmespath/go-jmespath
package main

import (
  "encoding/json"
  "fmt"
  jmespath "github.com/jmespath/go-jmespath"
)

func main() {
  var data any
  _ = json.Unmarshal([]byte(/* your JSON */), &data)
  result, err := jmespath.Search("${expr}", data)
  fmt.Println(result, err)
}`;
    case "java":
      return `// Maven: io.burt:jmespath-jackson
import io.burt.jmespath.Expression;
import io.burt.jmespath.jackson.JacksonRuntime;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

JacksonRuntime runtime = new JacksonRuntime();
ObjectMapper mapper = new ObjectMapper();
JsonNode input = mapper.readTree(/* your JSON string */);
Expression<JsonNode> expression = runtime.compile("${expr}");
JsonNode result = expression.search(input);
System.out.println(result.toPrettyString());`;
    case "php":
      return `// composer require mtdowling/jmespath.php
<?php
require 'vendor/autoload.php';
use JmesPath\\Env as JmesPath;

$json = json_decode('{"key":"value"}', true);
$result = JmesPath::search("${expr.replaceAll('"', '\\"')}", $json);
var_dump($result);`;
    case "csharp":
      return `// dotnet add package DevLab.JmesPath
using DevLab.JmesPath;
using System.Text.Json;

var input = JsonDocument.Parse(/* your JSON string */);
var jmes = new JmesPath();
var result = jmes.Transform(input.RootElement, "${expr}");
Console.WriteLine(result);`;
    default:
      return "";
  }
}
