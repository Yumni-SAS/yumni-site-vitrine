import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import type { Metadata } from "next";
import { generateBreadcrumbJsonLd } from "../../components/JsonLd";

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
    title: dict.meta.product.title,
    description: dict.meta.product.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/produit`,
      languages: {
        fr: `${SITE_URL}/fr/produit`,
        en: `${SITE_URL}/en/produit`,
        "x-default": `${SITE_URL}/fr/produit`,
      },
    },
    openGraph: {
      title: dict.meta.product.ogTitle,
      description: dict.meta.product.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      siteName: "Yumni",
      url: `${SITE_URL}/${lang}/produit`,
      images: [{ url: `${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`, width: 1200, height: 630, alt: "Yumni Produit — Logiciel RSE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.product.ogTitle,
      description: dict.meta.product.ogDescription,
      images: [`${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`],
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return children;
  const locale = lang as Locale;

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: locale === "fr" ? "Produit" : "Product", path: "/produit" },
    ],
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
