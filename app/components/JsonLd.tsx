import type { Locale } from "../[lang]/dictionaries";

const SITE_URL = "https://yumni.fr";

interface JsonLdProps {
  locale: Locale;
}

function organizationSchema(locale: Locale) {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Yumni",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    description:
      locale === "fr"
        ? "Yumni est la plateforme SaaS de pilotage de projet RSE tout-en-un. Dashboard, KPIs, WSJF, gestion des risques, reporting COMEX et conformité ESRS/CSRD."
        : "Yumni is the all-in-one CSR project management SaaS platform. Dashboard, KPIs, WSJF, risk management, board reporting and ESRS/CSRD compliance.",
    foundingDate: "2024",
    areaServed: {
      "@type": "GeoShape",
      name: locale === "fr" ? "Europe" : "Europe",
    },
    knowsAbout: [
      "RSE",
      "CSR",
      "CSRD",
      "ESRS",
      "ESG",
      "Pilotage RSE",
      "CSR Management",
      "Sustainability Reporting",
      "Double Materiality",
      "WSJF Prioritization",
      "Gestion des risques RSE",
      "Risk Management",
      "Reporting COMEX",
      "Board Reporting",
    ],
    sameAs: ["https://www.linkedin.com/company/yumni"],
  };
}

function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Yumni",
    description:
      locale === "fr"
        ? "Plateforme de pilotage de projet RSE — CSRD Ready"
        : "CSR Project Management Platform — CSRD Ready",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: [
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    potentialAction: [
      {
        "@type": "ViewAction",
        target: `${SITE_URL}/${locale}/demo`,
        name: locale === "fr" ? "Demander une démo" : "Request a demo",
      },
      {
        "@type": "ViewAction",
        target: `${SITE_URL}/${locale}/tarifs`,
        name: locale === "fr" ? "Voir les tarifs" : "View pricing",
      },
    ],
  };
}

function softwareApplicationSchema(locale: Locale) {
  return {
    "@type": "SoftwareApplication",
    name: "Yumni",
    applicationCategory: "BusinessApplication",
    applicationSubCategory:
      locale === "fr"
        ? "Plateforme de pilotage de projet RSE"
        : "CSR Project Management Platform",
    operatingSystem: "Web",
    description:
      locale === "fr"
        ? "Plateforme SaaS de pilotage de projet RSE tout-en-un. Centralisez KPIs, risques, plans d'action WSJF, reporting COMEX et conformité ESRS/CSRD dans un seul outil. Hébergé en France, RGPD by design."
        : "All-in-one CSR project management SaaS platform. Centralize KPIs, risks, WSJF action plans, board reporting and ESRS/CSRD compliance in a single tool. Hosted in France, GDPR by design.",
    url: `${SITE_URL}/${locale}/produit`,
    offers: [
      {
        "@type": "Offer",
        name: "Freemium",
        price: "0",
        priceCurrency: "EUR",
        description:
          locale === "fr"
            ? "Plan gratuit : 1 organisation, 5 utilisateurs, 20 projets. Toutes les features core incluses."
            : "Free plan: 1 organization, 5 users, 20 projects. All core features included.",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "0",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          price: "0",
          description: locale === "fr" ? "Sur devis" : "Custom pricing",
        },
        description:
          locale === "fr"
            ? "Plan Pro : organisations, utilisateurs et projets illimités. API REST, multi-org, support prioritaire."
            : "Pro plan: unlimited organizations, users and projects. REST API, multi-org, priority support.",
      },
    ],
    featureList:
      locale === "fr"
        ? [
            "Dashboard RSE temps réel",
            "KPIs & Alertes automatiques",
            "Priorisation WSJF",
            "Matrice des risques probabilité × impact",
            "Reporting COMEX en 12 secondes",
            "Conformité ESRS / CSRD",
            "Multi-organisation / Multi-tenant",
            "Kanban & Calendrier RSE",
            "RBAC 4 niveaux",
            "Hébergé en France (Scaleway)",
            "RGPD by design",
            "Chiffrement TLS 1.3 / AES-256",
          ]
        : [
            "Real-time CSR Dashboard",
            "KPIs & Automatic Alerts",
            "WSJF Prioritization",
            "Risk Matrix probability × impact",
            "Board Reporting in 12 seconds",
            "ESRS / CSRD Compliance",
            "Multi-organization / Multi-tenant",
            "Kanban & CSR Calendar",
            "4-level RBAC",
            "Hosted in France (Scaleway)",
            "GDPR by design",
            "TLS 1.3 / AES-256 Encryption",
          ],
    screenshot: `${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`,
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "52",
      bestRating: "5",
    },
  };
}

export function generateJsonLd(locale: Locale, page: string = "home") {
  const schemas: Record<string, unknown>[] = [
    organizationSchema(locale),
    websiteSchema(locale),
  ];

  if (page === "home" || page === "produit") {
    schemas.push(softwareApplicationSchema(locale));
  }

  if (page === "home") {
    schemas.push({
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/#webpage`,
      url: `${SITE_URL}/${locale}`,
      name:
        locale === "fr"
          ? "Yumni — Plateforme de pilotage de projet RSE | CSRD Ready"
          : "Yumni — CSR Project Management Platform | CSRD Ready",
      description:
        locale === "fr"
          ? "Yumni est la plateforme de pilotage de projet RSE tout-en-un. Dashboard temps réel, KPIs, WSJF, gestion des risques, reporting COMEX et conformité ESRS/CSRD."
          : "Yumni is the all-in-one CSR project management platform. Real-time dashboard, KPIs, WSJF, risk management, board reporting and ESRS/CSRD compliance.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: locale === "fr" ? "fr-FR" : "en-US",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "fr" ? "Accueil" : "Home",
            item: `${SITE_URL}/${locale}`,
          },
        ],
      },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

export function generateFAQJsonLd(
  faqItems: Array<{ q: string; a: string }>,
  locale: Locale,
  pageUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: `${SITE_URL}/${locale}${pageUrl}`,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}
