## JSONPath Online

https://jsonpath.online/ : JSONPath Online Evaluator & Validator offers. A fast way to try JSONPath expressions directly in the browser.

### JSONPath Overview

JSONPath is a query language for JSON documents inspired by XPath. Typical building blocks include:

- `$.store.book[0].title`: dot notation and array indices traverse object trees.
- `$..price`: double-dot syntax performs recursive descent to find keys anywhere in the structure.
- `$[?(@.category == "fiction")]`: filters extract nodes that meet custom predicates.
- `$.store.book[*].author`: the `*` wildcard matches every property or index at a level.

Combining these operators lets you rapidly locate data in large JSON payloads, making JSONPath a handy tool for API debugging, data transformations, and teaching.

### Project Highlights

This repository powers the JSONPath Online web app. It is a Next.js project that statically exports to Cloudflare Pages and ships:

- Live playground: type JSON and JSONPath side-by-side to see matches instantly.
- Built-in examples: curated snippets demonstrate common patterns and edge cases.
- Clean UI copy: English-first interface that is easy to share in docs or demos.

## Development & Usage

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview changes in real time; the main page lives at `src/app/page.tsx` and hot reloads on save.

### Build & Preview

```bash
npm run build
npm run preview   # serves the static out/ folder
```

### Cloudflare Pages Deployment

- Build command：`npm run build`
- Output directory：`out`

Each build emits a fully static bundle that can be hosted on any CDN or static hosting platform.

## Contributing

Issues and pull requests are welcome for bug fixes, feature ideas, and quality-of-life improvements. Please consider running `npm run lint`/`npm run test` (when available) before opening a PR to keep the project healthy.
