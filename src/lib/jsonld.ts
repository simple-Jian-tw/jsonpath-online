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

export function articleJsonLd({
  pageUrl,
  headline,
  datePublished,
  keywords,
}: {
  pageUrl: string;
  headline: string;
  datePublished: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    datePublished,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: pageUrl,
    keywords: keywords ?? [],
  };
}

export function faqJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
