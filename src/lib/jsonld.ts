import { SITE } from "@/lib/site";

export function softwareApplicationJsonLd({
  pageUrl,
  description,
}: {
  pageUrl: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: pageUrl,
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

