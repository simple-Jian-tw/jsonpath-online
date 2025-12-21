import type { MetadataRoute } from "next";
import { LANGUAGES } from "@/lib/languages";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified, changefreq: "weekly", priority: 1.0 },
    { url: `${SITE.url}/docs/`, lastModified, changefreq: "weekly", priority: 0.7 },
    { url: `${SITE.url}/integrations/`, lastModified, changefreq: "weekly", priority: 0.7 },
    { url: `${SITE.url}/jmespath/`, lastModified, changefreq: "weekly", priority: 1.0 },
    { url: `${SITE.url}/jmespath/create-csv/`, lastModified, changefreq: "weekly", priority: 0.9 },
    { url: `${SITE.url}/jmespath/aws-cli/`, lastModified, changefreq: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/python/`, lastModified, changefreq: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/examples/`, lastModified, changefreq: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/functions/`, lastModified, changefreq: "weekly", priority: 0.8 },
    { url: `${SITE.url}/jmespath/vs-jsonpath/`, lastModified, changefreq: "weekly", priority: 0.7 },
    { url: `${SITE.url}/jmespath/vs-jq/`, lastModified, changefreq: "weekly", priority: 0.7 },
  ];

  const langRoutes: MetadataRoute.Sitemap = LANGUAGES.map((l) => ({
    url: `${SITE.url}/lang/${l.slug}/`,
    lastModified,
  }));

  return [...staticRoutes, ...langRoutes];
}
