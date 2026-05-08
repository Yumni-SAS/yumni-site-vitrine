import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ressources RSE | Yumni — Guides, Articles & Téléchargements",
  description:
    "Accédez à notre bibliothèque de ressources RSE : guides pratiques CSRD, templates, webinars et articles d'experts pour piloter votre conformité.",
  openGraph: {
    title: "Ressources RSE | Yumni",
    description:
      "Guides, articles et outils pour piloter votre conformité RSE & CSRD.",
    type: "website",
    images: [{ url: "https://yumni.fr/Screen/01-hero-cockpit-ensemble.png", width: 1200, height: 630, alt: "Ressources RSE Yumni" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ressources RSE | Yumni",
    description: "Guides, articles et outils pour piloter votre conformité RSE & CSRD.",
    images: ["https://yumni.fr/Screen/01-hero-cockpit-ensemble.png"],
  },
};

export default function RessourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
