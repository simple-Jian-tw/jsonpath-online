export const XPATH_DEFAULT_HTML = `<html>
  <body>
    <header>
      <nav class="navbar">
        <a id="logo" href="/">jsonpath.online</a>
        <ul class="menu">
          <li class="menu-item active"><a href="/login">Login</a></li>
          <li class="menu-item"><a href="/signup">Sign Up</a></li>
          <li class="menu-item"><a href="/docs">Docs</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section id="hero" class="container">
        <h1>XPath playground</h1>
        <p class="tagline">Test XPath expressions for Selenium and scraping.</p>
        <button type="button" class="btn primary" data-test-id="cta">Try XPath</button>
      </section>
      <section id="form">
        <form>
          <label for="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" />
          <button type="submit" class="btn submit-btn">Login</button>
          <p class="error hidden">Invalid credentials</p>
        </form>
      </section>
      <section id="features">
        <ul class="cards">
          <li class="card" data-id="card-1"><span>Live validation</span></li>
          <li class="card" data-id="card-2"><span>Code generation</span></li>
          <li class="card" data-id="card-3"><span>Cheat sheet</span></li>
        </ul>
      </section>
      <section id="table">
        <table class="stats">
          <tr><th>Name</th><th>Role</th><th>Active</th></tr>
          <tr><td>Alice</td><td>QA</td><td>true</td></tr>
          <tr><td>Bob</td><td>QA</td><td>false</td></tr>
          <tr><td>Carol</td><td>Dev</td><td>true</td></tr>
        </table>
      </section>
    </main>
    <footer>
      <p>© 2025 XPath Online</p>
      <a class="link" href="/privacy">Privacy</a>
    </footer>
  </body>
</html>`;

export const XPATH_DEFAULT_XML = `<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <price currency="USD">44.95</price>
  </book>
  <book id="bk102">
    <author>Ralls, Kim</author>
    <title>Midnight Rain</title>
    <price currency="USD">5.95</price>
  </book>
</catalog>`;

export const XPATH_DEFAULT_EXPR = "//button[@type='submit']";

export type XPathQuickExample = {
  title: string;
  expression: string;
  description: string;
  html: string;
  preview: string;
};

const simpleSnippet = `<div class="container">
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>`;

export const XPATH_QUICK_EXAMPLE_GROUPS: { title: string; items: XPathQuickExample[] }[] = [
  {
    title: "Basic Selection",
    items: [
      {
        title: "All div elements",
        expression: "//div",
        description: "Selects every div element.",
        html: simpleSnippet,
        preview: "<div class=\"container\">…</div>",
      },
      {
        title: "Direct child paragraphs",
        expression: "//div/p",
        description: "Only paragraphs that are direct children of div.",
        html: simpleSnippet,
        preview: "<p>First paragraph</p>",
      },
      {
        title: "Descendant paragraphs",
        expression: "//div//p",
        description: "Paragraphs under div at any depth.",
        html: simpleSnippet,
        preview: "<p>Second paragraph</p>",
      },
      {
        title: "First div",
        expression: "/html/body/div[1]",
        description: "The first div in the body.",
        html: "<body><div id=\"one\"></div><div id=\"two\"></div></body>",
        preview: "<div id=\"one\"></div>",
      },
      {
        title: "Div with id",
        expression: "//div[@id='main']",
        description: "Matches a div whose id is main.",
        html: "<div id=\"main\"></div><div id=\"secondary\"></div>",
        preview: "<div id=\"main\"></div>",
      },
      {
        title: "Div with class",
        expression: "//div[@class='item']",
        description: "Class equals item (not contains).",
        html: "<div class=\"item\"></div><div class=\"item active\"></div>",
        preview: "<div class=\"item\"></div>",
      },
    ],
  },
  {
    title: "Attributes",
    items: [
      {
        title: "Input type text",
        expression: "//input[@type='text']",
        description: "Attribute equals text.",
        html: "<input type=\"text\" /><input type=\"email\" />",
        preview: "<input type=\"text\" />",
      },
      {
        title: "Class contains",
        expression: "//div[contains(@class, 'btn')]",
        description: "Substring check for class values.",
        html: "<div class=\"btn primary\"></div><div class=\"card\"></div>",
        preview: "<div class=\"btn primary\"></div>",
      },
      {
        title: "Href starts with",
        expression: "//a[starts-with(@href, 'https')]",
        description: "Secure links only.",
        html: "<a href=\"https://site.com\">Secure</a><a href=\"/home\">Home</a>",
        preview: "<a href=\"https://site.com\">Secure</a>",
      },
      {
        title: "Alt and src",
        expression: "//img[@alt and @src]",
        description: "Images with both alt and src.",
        html: "<img alt=\"logo\" src=\"logo.png\" /><img src=\"missing.png\" />",
        preview: "<img alt=\"logo\" src=\"logo.png\" />",
      },
      {
        title: "Data attribute",
        expression: "//div[@data-id='123']",
        description: "Custom data attributes.",
        html: "<div data-id=\"123\"></div><div data-id=\"456\"></div>",
        preview: "<div data-id=\"123\"></div>",
      },
      {
        title: "Any with attributes",
        expression: "//*[@*]",
        description: "Nodes that have at least one attribute.",
        html: "<div class=\"box\"></div><span>No attr</span>",
        preview: "<div class=\"box\"></div>",
      },
      {
        title: "Div without class",
        expression: "//div[not(@class)]",
        description: "Div elements lacking class.",
        html: "<div></div><div class=\"has\"></div>",
        preview: "<div></div>",
      },
      {
        title: "Disabled input",
        expression: "//input[@disabled]",
        description: "Boolean attribute presence.",
        html: "<input disabled /><input />",
        preview: "<input disabled />",
      },
    ],
  },
  {
    title: "Text Selection",
    items: [
      {
        title: "Exact text",
        expression: "//p[text()='Login']",
        description: "Match exact text in a <p> tag.",
        html: "<p>Login</p><p>Logout</p>",
        preview: "<p>Login</p>",
      },
      {
        title: "Contains text",
        expression: "//p[contains(text(), 'Welcome')]",
        description: "Substring search on text nodes.",
        html: "<p>Welcome back</p><p>Hello</p>",
        preview: "<p>Welcome back</p>",
      },
      {
        title: "Normalized text",
        expression: "//div[normalize-space()='Submit']",
        description: "Ignore surrounding whitespace.",
        html: "<div> Submit </div><div>Cancel</div>",
        preview: "<div> Submit </div>",
      },
      {
        title: "Any with text",
        expression: "//*[text()]",
        description: "Elements that contain text nodes.",
        html: "<span>Label</span><div><b>Bold</b></div>",
        preview: "<span>Label</span>",
      },
      {
        title: "Div with no text",
        expression: "//div[not(text())]",
        description: "Silent container divs.",
        html: "<div></div><div>Text</div>",
        preview: "<div></div>",
      },
      {
        title: "Text length",
        expression: "//p[string-length(text()) > 10]",
        description: "Text nodes longer than 10 chars.",
        html: "<p>Short</p><p>More than ten</p>",
        preview: "<p>More than ten</p>",
      },
    ],
  },
  {
    title: "Axes",
    items: [
      {
        title: "Parent",
        expression: "//div/parent::*",
        description: "The parent of every div.",
        html: "<section><div>Item</div></section>",
        preview: "<section><div>Item</div></section>",
      },
      {
        title: "Child axis",
        expression: "//div/child::p",
        description: "Child paragraphs of divs.",
        html: "<div><p>One</p><span>Two</span></div>",
        preview: "<p>One</p>",
      },
      {
        title: "Following sibling",
        expression: "//div/following-sibling::p",
        description: "Next paragraphs after divs.",
        html: "<div></div><p>Next</p>",
        preview: "<p>Next</p>",
      },
      {
        title: "Preceding sibling",
        expression: "//div/preceding-sibling::p",
        description: "Paragraphs before a div.",
        html: "<p>Before</p><div></div>",
        preview: "<p>Before</p>",
      },
      {
        title: "Ancestor section",
        expression: "//div/ancestor::section",
        description: "Section ancestors of div.",
        html: "<section><div></div></section>",
        preview: "<section><div></div></section>",
      },
      {
        title: "Descendant span",
        expression: "//div/descendant::span",
        description: "Spans under div.",
        html: "<div><p><span>Hi</span></p></div>",
        preview: "<span>Hi</span>",
      },
      {
        title: "Following first",
        expression: "//div/following::*[1]",
        description: "Immediate following node.",
        html: "<div></div><p>After</p><p>Later</p>",
        preview: "<p>After</p>",
      },
      {
        title: "Preceding first",
        expression: "//div/preceding::*[1]",
        description: "Immediate node before div.",
        html: "<p>Before</p><div></div>",
        preview: "<p>Before</p>",
      },
      {
        title: "Ancestor or self",
        expression: "//li/ancestor-or-self::ul",
        description: "Lists that contain li or li itself.",
        html: "<ul><li>Item</li></ul>",
        preview: "<ul><li>Item</li></ul>",
      },
      {
        title: "Parent then sibling",
        expression: "//input/parent::*/following-sibling::label",
        description: "Labels next to input parents.",
        html: "<div><input id=\"i\" /></div><label for=\"i\">Email</label>",
        preview: "<label for=\"i\">Email</label>",
      },
    ],
  },
  {
    title: "Functions",
    items: [
      {
        title: "Count children",
        expression: "//div[count(p) > 2]",
        description: "Div elements with more than 2 p children.",
        html: "<div><p>a</p><p>b</p><p>c</p></div>",
        preview: "<div>…3 p elements…</div>",
      },
      {
        title: "Position equals",
        expression: "//p[position() = 1]",
        description: "First paragraph in each context.",
        html: "<p>First</p><p>Second</p>",
        preview: "<p>First</p>",
      },
      {
        title: "Last element",
        expression: "//p[last()]",
        description: "Last paragraph sibling.",
        html: "<p>First</p><p>Last</p>",
        preview: "<p>Last</p>",
      },
      {
        title: "Name equals div",
        expression: "//div[name() = 'div']",
        description: "Name() function usage.",
        html: "<div></div>",
        preview: "<div></div>",
      },
      {
        title: "Local name",
        expression: "//div[local-name() = 'div']",
        description: "Local-name demonstration.",
        html: "<div></div>",
        preview: "<div></div>",
      },
      {
        title: "String length",
        expression: "//p[string-length(text()) > 10]",
        description: "Text longer than 10 characters.",
        html: "<p>short</p><p>more than ten</p>",
        preview: "<p>more than ten</p>",
      },
      {
        title: "Concat class",
        expression: "//div[concat(@class, '-suffix')]",
        description: "Concat returns non-empty string so condition truthy.",
        html: "<div class=\"box\"></div>",
        preview: "<div class=\"box\"></div>",
      },
      {
        title: "Substring",
        expression: "//p[substring(text(), 1, 5) = 'Hello']",
        description: "Substring match at start.",
        html: "<p>Hello world</p><p>Welcome</p>",
        preview: "<p>Hello world</p>",
      },
      {
        title: "Translate case",
        expression: "//div[translate(@class, 'ABC', 'abc')]",
        description: "Normalize class casing.",
        html: "<div class=\"ABC\"></div>",
        preview: "<div class=\"ABC\"></div>",
      },
      {
        title: "Number comparison",
        expression: "//input[number(@value) > 100]",
        description: "Numeric comparison on attribute.",
        html: "<input value=\"120\" /><input value=\"50\" />",
        preview: "<input value=\"120\" />",
      },
      {
        title: "Boolean attribute",
        expression: "//div[boolean(@data-active)]",
        description: "Truthy data-active attribute.",
        html: "<div data-active=\"true\"></div><div></div>",
        preview: "<div data-active=\"true\"></div>",
      },
      {
        title: "Normalize space",
        expression: "//p[normalize-space(text())]",
        description: "Paragraphs with non-empty text after trimming.",
        html: "<p>  hi </p><p>   </p>",
        preview: "<p>  hi </p>",
      },
    ],
  },
  {
    title: "Selenium Common Patterns",
    items: [
      {
        title: "Button by text",
        expression: "//button[text()='Submit']",
        description: "Exact text button.",
        html: "<button>Submit</button><button>Cancel</button>",
        preview: "<button>Submit</button>",
      },
      {
        title: "Link by href",
        expression: "//a[@href='/login']",
        description: "Target login link.",
        html: "<a href=\"/login\">Login</a>",
        preview: "<a href=\"/login\">Login</a>",
      },
      {
        title: "Input by name",
        expression: "//input[@name='username']",
        description: "Form field by name.",
        html: "<input name=\"username\" /><input name=\"password\" />",
        preview: "<input name=\"username\" />",
      },
      {
        title: "Table cell",
        expression: "//table//tr[2]//td[3]",
        description: "Second row, third cell.",
        html: "<table><tr><td>A1</td></tr><tr><td>B1</td><td>B2</td><td>B3</td></tr></table>",
        preview: "<td>B3</td>",
      },
      {
        title: "List last item",
        expression: "//ul[@class='menu']/li[last()]",
        description: "Last list item.",
        html: "<ul class=\"menu\"><li>One</li><li>Two</li><li>Three</li></ul>",
        preview: "<li>Three</li>",
      },
      {
        title: "Multiple class contains",
        expression: "//div[contains(@class, 'error') and contains(@class, 'visible')]",
        description: "Error and visible flags.",
        html: "<div class=\"error visible\"></div>",
        preview: "<div class=\"error visible\"></div>",
      },
      {
        title: "OR condition",
        expression: "//button[@type='submit' or @class='submit-btn']",
        description: "Match either submit type or class.",
        html: "<button class=\"submit-btn\">Go</button>",
        preview: "<button class=\"submit-btn\">Go</button>",
      },
      {
        title: "No class paragraphs",
        expression: "//*[@id='main']//p[not(@class)]",
        description: "Paragraphs inside main without class.",
        html: "<div id=\"main\"><p>Clean</p><p class=\"muted\">Muted</p></div>",
        preview: "<p>Clean</p>",
      },
      {
        title: "Data-test id",
        expression: "//div[@data-test-id='login-form']//input",
        description: "Inputs inside login form container.",
        html: "<div data-test-id=\"login-form\"><input /><input /></div>",
        preview: "<input />",
      },
      {
        title: "Iframe contents",
        expression: "//iframe[@name='content']//*",
        description: "Any node inside iframe.",
        html: "<iframe name=\"content\"><html><body><p>Hi</p></body></html></iframe>",
        preview: "<p>Hi</p>",
      },
      {
        title: "Selected option",
        expression: "//select[@name='country']/option[@selected]",
        description: "Currently selected option.",
        html: "<select name=\"country\"><option>US</option><option selected>CA</option></select>",
        preview: "<option selected>CA</option>",
      },
      {
        title: "Checked checkbox",
        expression: "//input[@type='checkbox' and @checked]",
        description: "Checked boxes.",
        html: "<input type=\"checkbox\" checked /><input type=\"checkbox\" />",
        preview: "<input type=\"checkbox\" checked />",
      },
      {
        title: "Dynamic ID",
        expression: "//div[starts-with(@id, 'dynamic-')]",
        description: "IDs generated dynamically.",
        html: "<div id=\"dynamic-123\"></div><div id=\"static\"></div>",
        preview: "<div id=\"dynamic-123\"></div>",
      },
      {
        title: "Text plus class",
        expression: "//span[contains(text(), 'Error') and @class='msg']",
        description: "Error messages with class msg.",
        html: "<span class=\"msg\">Error occurred</span>",
        preview: "<span class=\"msg\">Error occurred</span>",
      },
      {
        title: "Parent by text",
        expression: "//*[text()='Next']/parent::button",
        description: "Locate a parent button from text.",
        html: "<button><span>Next</span></button>",
        preview: "<button><span>Next</span></button>",
      },
    ],
  },
];

export type XPathLibraryExample = {
  category: string;
  expression: string;
  html: string;
  description: string;
  takeaway: string;
};

export const XPATH_EXAMPLE_LIBRARY: XPathLibraryExample[] = [
  ...XPATH_QUICK_EXAMPLE_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      category: group.title,
      expression: item.expression,
      html: item.html,
      description: item.description,
      takeaway: item.preview,
    })),
  ),
  {
    category: "Web Scraping",
    expression: "//article//h2/text()",
    html: "<article><h2>Headline</h2><p>Story</p></article>",
    description: "Extract article titles without tags.",
    takeaway: "Text nodes are handy when scraping.",
  },
  {
    category: "Web Scraping",
    expression: "//a[@rel='nofollow']/@href",
    html: "<a href=\"/promo\" rel=\"nofollow\">Promo</a>",
    description: "Grab outbound or promo links.",
    takeaway: "Attributes can be returned directly.",
  },
  {
    category: "Web Scraping",
    expression: "//div[not(contains(@class,'ad'))]//img/@src",
    html: "<div class=\"ad\"><img src=\"ad.png\"></div><div class=\"post\"><img src=\"hero.jpg\"></div>",
    description: "Skip ad slots while collecting images.",
    takeaway: "Combine not() with contains().",
  },
  {
    category: "Web Scraping",
    expression: "//ul[@class='products']/li[position()<=3]",
    html: "<ul class=\"products\"><li>A</li><li>B</li><li>C</li><li>D</li></ul>",
    description: "Top 3 items only.",
    takeaway: "Position filtering keeps results small.",
  },
  {
    category: "Web Scraping",
    expression: "//meta[@property='og:title']/@content",
    html: "<meta property=\"og:title\" content=\"Demo\" />",
    description: "Grab Open Graph title for previews.",
    takeaway: "Meta tags are attributes only.",
  },
];
