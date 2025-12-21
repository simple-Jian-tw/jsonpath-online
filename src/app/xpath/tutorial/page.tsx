import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "XPath Tutorial: Hands-on Guide with Live Playground",
  description:
    "Step-by-step XPath tutorial with interactive checkpoints. Learn axes, predicates, and functions, then test them in the live playground for Selenium and web scraping.",
  canonicalPath: "/xpath/tutorial",
});

const steps = [
  {
    title: "Step 1: Select elements",
    body: "Start with //tag to gather candidates. Example: //button to view all buttons on the page.",
  },
  {
    title: "Step 2: Add predicates",
    body: "Narrow results with [@attr='value'] or contains(). Example: //button[contains(@class,'primary')].",
  },
  {
    title: "Step 3: Use text safely",
    body: "Wrap text in normalize-space() to ignore whitespace. Example: //button[normalize-space()='Login'].",
  },
  {
    title: "Step 4: Navigate parents/siblings",
    body: "Reach related elements with axes: //label[text()='Email']/following-sibling::input.",
  },
  {
    title: "Step 5: Assert counts",
    body: "Use count() or position() to make selectors stable: //ul/li[position()<=3].",
  },
  {
    title: "Step 6: Generate code",
    body: "Copy Selenium/Playwright snippets from the playground and paste into your test suite.",
  },
];

const quizzes = [
  { question: "Find the first card title inside .cards list", answer: "//ul[@class='cards']/li[1]" },
  { question: "Grab the href of all footer links", answer: "//footer//a/@href" },
  { question: "Select the visible error message", answer: "//p[contains(@class,'error') and not(contains(@class,'hidden'))]" },
  { question: "Pick rows with status Active in a table", answer: "//table//tr[td[contains(., 'Active')]]" },
];

export default function TutorialPage() {
  const pageUrl = `${SITE.url}/xpath/tutorial`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "XPath Tutorial",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["xpath tutorial", "learn xpath", "xpath examples"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          Hands-on tutorial
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">XPath Tutorial with Live Practice</h1>
        <p className="max-w-4xl text-lg text-black/70 dark:text-white/70">
          Learn XPath by doing. Follow the steps, copy the examples, and validate everything inside the XPath playground. Perfect for Selenium newcomers and web scrapers who need a quick, practical introduction.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/xpath"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Open playground
          </Link>
          <Link
            href="/xpath/examples"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Examples library
          </Link>
          <Link
            href="/xpath/cheatsheet"
            className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
          >
            Cheat sheet
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm text-black/80 dark:border-white/10 dark:bg-black/20 dark:text-white/80"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
              Lesson {idx + 1}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-black dark:text-white">{step.title}</h2>
            <p className="mt-1">{step.body}</p>
            <p className="mt-2 text-xs text-black/60 dark:text-white/60">
              Practice in playground: <code>/xpath?xpath={encodeURIComponent("//div")}</code>
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Try-it checkpoints</h3>
        <p className="text-sm text-black/70 dark:text-white/70">
          Open the playground in a new tab, paste the HTML sample, and run each answer to verify matches.
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {quizzes.map((quiz) => {
            const tryHref = `/xpath?xpath=${encodeURIComponent(quiz.answer)}`;
            return (
              <div
                key={quiz.answer}
                className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm text-black/80 dark:border-white/10 dark:bg-black/30 dark:text-white/80"
              >
                <p className="font-semibold">{quiz.question}</p>
                <p className="mt-1 font-mono text-[12px]">{quiz.answer}</p>
                <Link
                  href={tryHref}
                  className="mt-2 inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                >
                  Try it
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h3 className="text-lg font-semibold text-black dark:text-white">Next steps</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Review the <Link href="/xpath/functions">functions reference</Link> for substring, translate, and count.</li>
          <li>Learn axes deeply in the <Link href="/xpath/axes">axes guide</Link>.</li>
          <li>Practice selectors for login flows and tables using the <Link href="/xpath/selenium">Selenium guide</Link>.</li>
          <li>Compare with CSS selectors to pick the right tool: <Link href="/xpath/vs-css-selector">XPath vs CSS</Link>.</li>
        </ul>
      </section>
    </Container>
  );
}
