import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Selenium XPath Guide: Reliable Locators and Examples",
  description:
    "Selenium XPath best practices with copy-ready examples for Python, Java, JavaScript, and C#. Learn stable locators, dynamic IDs, tables, and Playwright equivalents.",
  canonicalPath: "/xpath/selenium",
});

const patterns = [
  {
    title: "Buttons and links",
    examples: [
      { label: "Exact text", code: "//button[normalize-space(text())='Submit']" },
      { label: "Partial text", code: "//a[contains(text(),'Learn More')]" },
      { label: "CTA by data-test-id", code: "//button[@data-test-id='cta-primary']" },
    ],
  },
  {
    title: "Forms and inputs",
    examples: [
      { label: "By name", code: "//input[@name='email']" },
      { label: "Placeholder", code: "//input[@placeholder='Enter email']" },
      { label: "Label + input", code: "//label[text()='Email']/following-sibling::input" },
      { label: "Checkbox checked", code: "//input[@type='checkbox' and @checked]" },
    ],
  },
  {
    title: "Dynamic content",
    examples: [
      { label: "Dynamic ID", code: "//div[starts-with(@id, 'react-select')]" },
      { label: "Toast message", code: "//div[contains(@class,'toast') and contains(text(),'Saved')]" },
      { label: "Loading finished", code: "//*[contains(@class,'loading')][not(@hidden)]/following::*[1]" },
    ],
  },
  {
    title: "Tables",
    examples: [
      { label: "Cell in row", code: "//table[@id='orders']//tr[3]//td[2]" },
      { label: "Row by text", code: "//table//tr[td[contains(text(),'Paid')]]" },
      { label: "Column header", code: "//table//th[normalize-space()='Status']" },
    ],
  },
];

const bestPractices = [
  "Prefer semantic attributes over positional selectors. Reach for @data-test-id, @aria-label, and stable IDs.",
  "Normalize whitespace when matching text: normalize-space() handles trailing spaces and line breaks.",
  "Avoid absolute paths that start at /html/body; prefer short, scoped selectors under a stable container.",
  "Use contains() and starts-with() for dynamic attributes instead of brittle equality checks.",
  "In tables, filter rows first, then drill into cells: //tr[td[contains(.,'Active')]]//td[3].",
  "Combine axes to avoid flakiness: label[text()='Email']/following-sibling::input is sturdier than //input[1].",
  "Keep locators readable—future maintainers should understand intent without comments.",
];

const languageTabs = [
  {
    language: "Python + Selenium",
    snippet: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")

login_btn = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Login']"))
)
login_btn.click()

rows = driver.find_elements(By.XPATH, "//table[@id='orders']//tr[td[contains(., 'Active')]]")
for row in rows:
    email = row.find_element(By.XPATH, ".//td[2]").text
    print(email)

driver.quit()`,
  },
  {
    language: "JavaScript + Playwright",
    snippet: `import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("https://example.com");

const cta = page.getByRole("button", { name: "Start free trial" });
await cta.click();

const statusCells = page.locator("xpath=//table//tr[td[contains(., 'Paid')]]//td[3]");
const statuses = await statusCells.allTextContents();
console.log(statuses);

await browser.close();`,
  },
  {
    language: "Java + Selenium",
    snippet: `WebDriver driver = new ChromeDriver();
driver.get("https://example.com");
WebElement searchBox = driver.findElement(By.xpath("//input[@name='q']"));
searchBox.sendKeys("xpath");
List<WebElement> links = driver.findElements(By.xpath("//a[contains(text(),'XPath')]"));
for (WebElement link : links) {
  System.out.println(link.getAttribute("href"));
}
driver.quit();`,
  },
  {
    language: "C# + Selenium",
    snippet: `using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

var driver = new ChromeDriver();
driver.Navigate().GoToUrl("https://example.com");
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

var submit = wait.Until(drv => drv.FindElement(By.XPath("//button[@type='submit' or @class='submit-btn']")));
submit.Click();

var alerts = driver.FindElements(By.XPath("//div[contains(@class,'alert') and not(contains(@class,'hidden'))]"));
foreach (var alert in alerts)
{
    Console.WriteLine(alert.Text);
}
driver.Quit();`,
  },
];

export default function SeleniumPage() {
  const pageUrl = `${SITE.url}/xpath/selenium`;
  return (
    <Container className="py-10">
      <JsonLd
        data={articleJsonLd({
          pageUrl,
          headline: "Selenium XPath Guide",
          datePublished: new Date().toISOString().slice(0, 10),
          keywords: ["selenium xpath", "xpath selenium", "selenium locator"],
        })}
      />

      <header className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-200">
          Selenium XPath · Playwright friendly
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">Selenium XPath Guide</h1>
        <p className="max-w-3xl text-lg text-black/70 dark:text-white/70">
          Battle-tested XPath patterns for Selenium WebDriver and Playwright. Stop guessing selectors—validate them, highlight matches, and ship stable tests.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { label: "Open playground", href: "/xpath" },
            { label: "Cheat sheet", href: "/xpath/cheatsheet" },
            { label: "Examples", href: "/xpath/examples" },
            { label: "DevTools tips", href: "/xpath/chrome-devtools" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-black/80 hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/20">
          <h2 className="text-lg font-semibold text-black dark:text-white">Locator checklist</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>Use data-test-id or aria-label when available.</li>
            <li>Combine contains() with tag scopes to avoid over-matching.</li>
            <li>Prefer relative selectors scoped to a stable parent.</li>
            <li>Minimize reliance on index-based predicates unless the list is stable.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/20">
          <h2 className="text-lg font-semibold text-black dark:text-white">High-value patterns</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li><code>{'//button[normalize-space()="Save"]'}</code> — resilient CTA matching</li>
            <li><code>{'//input[@name="email" or @id="email"]'}</code> — tolerate differing attributes</li>
            <li><code>{"//table//tr[td[contains(., \"Active\")]]//td[3]"}</code> — scoped cell lookup</li>
            <li>
              <code>{"//div[contains(@class, \"error\") and not(contains(@class, \"hidden\"))]"}</code> — visible errors
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/20">
          <h2 className="text-lg font-semibold text-black dark:text-white">Anti-patterns to avoid</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            <li>Absolute paths like /html/body/div[3]/div[2] — break when layout changes.</li>
            <li>Text-only selectors on unstable copy—pair with attributes when possible.</li>
            <li>Complex chained indexes in dynamic lists—prefer attribute beacons.</li>
            <li>Ignoring wait conditions—wrap clicks in waits to avoid flaky tests.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Copy-ready patterns</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {patterns.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-black/10 bg-white/80 p-3 dark:border-white/10 dark:bg-black/30"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                {group.title}
              </p>
              <div className="mt-2 space-y-2">
                {group.examples.map((ex) => (
                  <div key={ex.code} className="rounded-lg bg-black/5 p-2 font-mono text-[12px] text-black dark:bg-white/5 dark:text-white">
                    <p className="text-[11px] uppercase tracking-[0.08em] text-black/50 dark:text-white/50">
                      {ex.label}
                    </p>
                    <p>{ex.code}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Language snippets</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {languageTabs.map((tab) => (
            <div
              key={tab.language}
              className="rounded-xl border border-black/10 bg-white/80 p-3 dark:border-white/10 dark:bg-black/30"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-black dark:text-white">{tab.language}</p>
                <span className="text-[11px] text-black/50 dark:text-white/50">Copy &amp; adapt</span>
              </div>
              <pre className="mt-2 max-h-[260px] overflow-auto rounded-lg bg-black/5 p-3 font-mono text-[12px] text-black dark:bg-white/5 dark:text-white">
                {tab.snippet}
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-black/10 bg-white/50 p-5 dark:border-white/10 dark:bg-black/20">
        <h2 className="text-xl font-semibold text-black dark:text-white">Best practices for stability</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <ul className="list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            {bestPractices.slice(0, Math.ceil(bestPractices.length / 2)).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <ul className="list-disc space-y-1 pl-5 text-sm text-black/70 dark:text-white/70">
            {bestPractices.slice(Math.ceil(bestPractices.length / 2)).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm text-black/80 dark:border-purple-900 dark:bg-purple-950/40 dark:text-white/80">
          <p className="font-semibold">Fast path:</p>
          <p className="mt-1">
            Use the <Link href="/xpath">XPath playground</Link> to test each locator before merging. Pair it with the{" "}
            <Link href="/xpath/cheatsheet">cheat sheet</Link> for syntax and the{" "}
            <Link href="/xpath/chrome-devtools">DevTools guide</Link> to debug in-browser.
          </p>
        </div>
      </section>
    </Container>
  );
}
