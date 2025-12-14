import type { MetadataRoute } from "next";
import { LANGUAGES } from "@/lib/languages";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified },
    { url: `${SITE.url}/docs/`, lastModified },
    { url: `${SITE.url}/integrations/`, lastModified },
  ];

  const langRoutes: MetadataRoute.Sitemap = LANGUAGES.map((l) => ({
    url: `${SITE.url}/lang/${l.slug}/`,
    lastModified,
  }));

  return [...staticRoutes, ...langRoutes];
}
