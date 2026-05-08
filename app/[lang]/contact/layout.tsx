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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/contact`,
      languages: {
        fr: `${SITE_URL}/fr/contact`,
        en: `${SITE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: dict.meta.contact.ogTitle,
      description: dict.meta.contact.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      siteName: "Yumni",
      url: `${SITE_URL}/${lang}/contact`,
      images: [{ url: `${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`, width: 1200, height: 630, alt: "Contacter Yumni" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.contact.ogTitle,
      description: dict.meta.contact.ogDescription,
      images: [`${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`],
    },
  };
}

export default async function ContactLayout({
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
    dict.contact.faq.items,
    locale,
    "/contact"
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: "Contact", path: "/contact" },
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
