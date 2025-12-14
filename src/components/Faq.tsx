import { JsonLd } from "@/components/JsonLd";
import type { FaqItem } from "@/lib/seo-content";

export function Faq({ items, title }: { items: FaqItem[]; title?: string }) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="mt-10">
      <JsonLd data={faqLd} />
      <h2 className="text-xl font-semibold">
        {title ?? "FAQ"}
      </h2>
      <div className="mt-4 divide-y divide-black/10 rounded-xl border border-black/10 bg-white/40 dark:divide-white/10 dark:border-white/10 dark:bg-black/20">
        {items.map((item) => (
          <details key={item.q} className="group px-4 py-3">
            <summary className="cursor-pointer list-none font-medium text-black/90 dark:text-white/90">
              <span className="mr-2 inline-block select-none text-black/40 group-open:rotate-90 dark:text-white/40">
                ▶
              </span>
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

