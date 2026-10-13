interface JsonLdProps {
  name: string;
  description: string;
  url: string;
  faqs?: { q: string; a: string }[];
  steps?: { title: string; desc: string }[];
  breadcrumbs?: { name: string; item: string }[];
}

export default function JsonLd({
  name,
  description,
  url,
  faqs = [],
  steps = [],
  breadcrumbs = [],
}: JsonLdProps) {
  // 1. Schéma WebApplication propre et conforme Google
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    operatingSystem: "All",
    applicationCategory: "MultimediaApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    url,
  };

  // 2. Schéma Fil d'Ariane (BreadcrumbList) pour la SERP Google
  const breadcrumbSchema =
    breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: b.name,
            item: b.item,
          })),
        }
      : null;

  // 3. Schéma FAQPage (pour les accordéons Google SERP)
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  // 4. Schéma HowTo (instructions étape par étape)
  const howToSchema =
    steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to use ${name}`,
          step: steps.map((s, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: s.title,
            itemListElement: [
              {
                "@type": "HowToDirection",
                text: s.desc,
              },
            ],
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
    </>
  );
}
