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
  },
};

export default function RessourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
