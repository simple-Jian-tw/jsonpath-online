export type XPathCodegenTarget =
  | "python-selenium"
  | "javascript-playwright"
  | "python-lxml"
  | "java-selenium"
  | "csharp-selenium"
  | "javascript-vanilla";

const escape = (value: string) => value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

export function generateXPathCode(
  target: XPathCodegenTarget,
  expression: string,
  { includeErrorHandling = false }: { includeErrorHandling?: boolean } = {},
) {
  const xpath = escape(expression || "//*");
  switch (target) {
    case "python-selenium":
      return `# pip install selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

xpath = "${xpath}"
elements = driver.find_elements(By.XPATH, xpath)

${includeErrorHandling ? "if not elements:\n    raise ValueError(f\"No matches for {xpath}\")\n" : ""}for el in elements:
    print(el.text, el.get_attribute("outerHTML"))

driver.quit()`;
    case "javascript-playwright":
      return `// npm i playwright
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("https://example.com");

const locator = page.locator("xpath=${xpath}");
${includeErrorHandling ? "if ((await locator.count()) === 0) {\n  throw new Error(\"No XPath matches found\");\n}\n" : ""}const texts = await locator.allInnerTexts();
console.log(texts);

await browser.close();`;
    case "python-lxml":
      return `# pip install lxml
from lxml import etree

html = """<html>...</html>"""
doc = etree.HTML(html)
xpath = "${xpath}"
results = doc.xpath(xpath)
${includeErrorHandling ? "if not results:\n    raise ValueError(\"No matches found\")\n" : ""}for node in results:
    print(etree.tostring(node, pretty_print=True, encoding="unicode"))`;
    case "java-selenium":
      return `// Maven: org.seleniumhq.selenium:selenium-java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class XPathExample {
  public static void main(String[] args) {
    WebDriver driver = new ChromeDriver();
    driver.get("https://example.com");
    String xpath = "${xpath}";
    List<WebElement> elements = driver.findElements(By.xpath(xpath));
${includeErrorHandling ? '    if (elements.isEmpty()) {\n      throw new RuntimeException("No elements found for " + xpath);\n    }\n' : ""}    for (WebElement el : elements) {
      System.out.println(el.getText());
    }
    driver.quit();
  }
}`;
    case "csharp-selenium":
      return `// dotnet add package Selenium.WebDriver
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.ObjectModel;

var driver = new ChromeDriver();
driver.Navigate().GoToUrl("https://example.com");
string xpath = "${xpath}";
ReadOnlyCollection<IWebElement> elements = driver.FindElements(By.XPath(xpath));
${includeErrorHandling ? 'if (elements.Count == 0) {\n  throw new InvalidOperationException($"No matches for {xpath}");\n}\n' : ""}foreach (var el in elements)
{
    Console.WriteLine(el.Text);
}
driver.Quit();`;
    case "javascript-vanilla":
      return `// Runs in the browser console
const xpath = "${xpath}";
const snapshot = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);
if (snapshot.snapshotLength === 0) {
  ${includeErrorHandling ? 'throw new Error("No nodes matched");' : 'console.warn("No nodes matched");'}
}
for (let i = 0; i < snapshot.snapshotLength; i++) {
  const node = snapshot.snapshotItem(i);
  console.log(node?.textContent?.trim(), node);
}`;
    default:
      return "";
  }
}
