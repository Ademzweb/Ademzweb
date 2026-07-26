import { siteConfig } from "@/config/site";

/**
 * Generates Schema.org Organization JSON-LD for SEO.
 * Automatically uses data from config/site.ts
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: siteConfig.email,
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/**
 * Generates Schema.org ProfessionalService JSON-LD
 */
export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    priceRange: "$$",
    areaServed: "Worldwide",
    serviceType: "Cybersecurity Services",
  };
}
