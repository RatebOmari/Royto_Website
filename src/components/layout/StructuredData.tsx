import {
  CONTACT_EMAIL,
  founder,
  location,
  site,
  SITE_URL,
  socialLinks,
} from "@/content/site";
import { tiers } from "@/content/pricing";

/**
 * JSON-LD for Organization, LocalBusiness and Service.
 *
 * Every value here is one that already appears on the page. Nothing is
 * asserted to search engines that a visitor can't also read — no ratings, no
 * review counts, no customer numbers, because none of those exist yet.
 */
export function StructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: site.description,
    logo: `${SITE_URL}/icon.png`,
    founder: { "@type": "Person", name: founder.name, jobTitle: "Founder" },
    sameAs: socialLinks.map((link) => link.href),
  };

  // Street address and telephone are deliberately absent until they exist.
  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: site.name,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    image: `${SITE_URL}/icon.png`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: location.locality,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    areaServed: {
      "@type": "State",
      name: location.areaServed,
    },
  };

  const service = {
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "AI automation for North Carolina businesses",
    serviceType: "AI automation agency",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "State", name: location.areaServed },
    url: SITE_URL,
    description: site.description,
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: `${tier.number} · ${tier.name}`,
      description: tier.body,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: tier.amount ?? 0,
        priceCurrency: "USD",
        // The published figures are starting points, stated as such on the site.
        valueAddedTaxIncluded: false,
      },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, localBusiness, service],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised server-side from typed content; no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
