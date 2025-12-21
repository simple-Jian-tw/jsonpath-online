/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "JSONPath Cheatsheet (Syntax Quick Reference) | JSONPath Online",
  description:
    "A practical JSONPath syntax cheatsheet with examples: root $, wildcards, recursive descent, array slices, unions, and filters.",
  canonicalPath: "/docs/",
});

export default function DocsPage() {
  return (
    <>
      <h1>JSONPath Cheatsheet</h1>
      <p>
        New to JSONPath? Start here. JSONPath is a query language for JSON (like
        XPath for XML). It lets you extract values from JSON using a compact
        path expression. Use the <Link href="/">evaluator</Link> to test
        expressions instantly.
      </p>

      <h2>How to read a JSONPath</h2>
      <ul>
        <li>
          JSONPath usually starts with <code>$</code> (the root JSON value).
        </li>
        <li>
          Use dot notation for properties: <code>$.store</code>.
        </li>
        <li>
          Use brackets for array indexes and special keys:{" "}
          <code>$['weird-key']</code>.
        </li>
        <li>
          Many expressions return <strong>multiple matches</strong>, so tools
          often output an array of results.
        </li>
      </ul>

      <h2>Sample JSON</h2>
      <p>
        The evaluator homepage uses a sample JSON like this. You can use it to
        follow along:
      </p>
      <pre>
        <code>{`{
  "store": {
    "book": [
      { "category": "reference", "title": "Sayings", "price": 8.95 },
      { "category": "fiction", "title": "Sword", "price": 12.99 },
      { "category": "fiction", "title": "Moby Dick", "price": 8.99 }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}`}</code>
      </pre>

      <h2>Common syntax (quick table)</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Meaning</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>$</code>
            </td>
            <td>Root object/array</td>
            <td>
              <code>$.store.book</code>{" "}
              <Link href="/?path=%24.store.book">(try)</Link>
            </td>
          </tr>
          <tr>
            <td>
              <code>@</code>
            </td>
            <td>Current node (in filters)</td>
            <td>
              <code>$.store.book[?(@.price &lt; 10)]</code>{" "}
              <Link href="/?path=%24.store.book%5B%3F(%40.price%20%3C%2010)%5D">
                (try)
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <code>*</code>
            </td>
            <td>Wildcard</td>
            <td>
              <code>$.store.*</code>{" "}
              <Link href="/?path=%24.store.*">(try)</Link>
            </td>
          </tr>
          <tr>
            <td>
              <code>..</code>
            </td>
            <td>Recursive descent</td>
            <td>
              <code>$..title</code>{" "}
              <Link href="/?path=%24..title">(try)</Link>
            </td>
          </tr>
          <tr>
            <td>
              <code>[n]</code>
            </td>
            <td>Array index</td>
            <td>
              <code>$.store.book[0]</code>{" "}
              <Link href="/?path=%24.store.book%5B0%5D">(try)</Link>
            </td>
          </tr>
          <tr>
            <td>
              <code>[a,b]</code>
            </td>
            <td>Union</td>
            <td>
              <code>$.store.book[0,2]</code>{" "}
              <Link href="/?path=%24.store.book%5B0%2C2%5D">(try)</Link>
            </td>
          </tr>
          <tr>
            <td>
              <code>[start:end]</code>
            </td>
            <td>Slice</td>
            <td>
              <code>$.store.book[0:2]</code>{" "}
              <Link href="/?path=%24.store.book%5B0%3A2%5D">(try)</Link>
            </td>
          </tr>
          <tr>
            <td>
              <code>[?()]</code>
            </td>
            <td>Filter expression</td>
            <td>
              <code>$.store.book[?(@.category=='fiction')]</code>{" "}
              <Link href="/?path=%24.store.book%5B%3F(%40.category%3D%3D'fiction')%5D">
                (try)
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Beginner examples</h2>
      <p>Here are the patterns most people use day-to-day:</p>
      <ul>
        <li>
          Get a property: <code>$.store.bicycle</code>{" "}
          <Link href="/?path=%24.store.bicycle">(try)</Link>
        </li>
        <li>
          Get one field from each item in an array:{" "}
          <code>$.store.book[*].title</code>{" "}
          <Link href="/?path=%24.store.book%5B*%5D.title">(try)</Link>
        </li>
        <li>
          Filter by a condition: <code>$.store.book[?(@.price &lt; 10)]</code>{" "}
          <Link href="/?path=%24.store.book%5B%3F(%40.price%20%3C%2010)%5D">
            (try)
          </Link>
        </li>
        <li>
          Pick multiple properties (varies by implementation):{" "}
          <code>$['store']['bicycle','book']</code>{" "}
          <Link href="/?path=%24%5B'store'%5D%5B'bicycle'%2C'book'%5D">(try)</Link>
        </li>
        <li>
          Search for keys at any depth: <code>$..price</code>{" "}
          <Link href="/?path=%24..price">(try)</Link>
        </li>
      </ul>

      <h2>Common mistakes</h2>
      <ul>
        <li>
          Mixing up arrays vs objects (e.g. using <code>[0]</code> on an object
          key).
        </li>
        <li>
          Keys with special characters: use brackets like{" "}
          <code>$['my-key']</code> instead of dot notation.
        </li>
        <li>
          Different libraries support different JSONPath features. If something
          doesn't work, check the implementation used in your language.
        </li>
      </ul>

      <h2>Tips</h2>
      <ul>
        <li>
          If results are empty, double-check whether a node is an object or an
          array.
        </li>
        <li>
          Not all JSONPath implementations support the exact same syntax. Use
          the language landing pages for library-specific snippets:{" "}
          <Link href="/integrations">Integrations</Link>.
        </li>
      </ul>
    </>
  );
}
