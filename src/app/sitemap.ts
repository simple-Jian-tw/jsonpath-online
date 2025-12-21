import type { MetadataRoute } from "next";
import { LANGUAGES } from "@/lib/languages";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/docs/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/integrations/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/jmespath/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/jmespath/create-csv/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/jmespath/aws-cli/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/python/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/examples/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/functions/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/vs-jsonpath/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/jmespath/vs-jq/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/xpath/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/xpath/selenium/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/xpath/cheatsheet/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/xpath/examples/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/xpath/vs-css-selector/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/xpath/chrome-devtools/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/xpath/tutorial/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/xpath/functions/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/xpath/axes/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/xpath/web-scraping/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
  ];

  const langRoutes: MetadataRoute.Sitemap = LANGUAGES.map((l) => ({
    url: `${SITE.url}/lang/${l.slug}/`,
    lastModified,
  }));

  return [...staticRoutes, ...langRoutes];
}
