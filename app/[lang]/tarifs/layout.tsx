import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import type { Metadata } from "next";
import { generateFAQJsonLd, generateBreadcrumbJsonLd } from "../../components/JsonLd";

const SITE_URL = "https://yumni.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.meta.pricing.title,
    description: dict.meta.pricing.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/tarifs`,
      languages: {
        fr: `${SITE_URL}/fr/tarifs`,
        en: `${SITE_URL}/en/tarifs`,
      },
    },
    openGraph: {
      title: dict.meta.pricing.ogTitle,
      description: dict.meta.pricing.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      siteName: "Yumni",
      url: `${SITE_URL}/${lang}/tarifs`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.pricing.ogTitle,
      description: dict.meta.pricing.ogDescription,
    },
  };
}

export default async function PricingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return children;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const faqJsonLd = generateFAQJsonLd(
    dict.pricing.faq.items,
    locale,
    "/tarifs"
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: locale === "fr" ? "Tarifs" : "Pricing", path: "/tarifs" },
    ],
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
