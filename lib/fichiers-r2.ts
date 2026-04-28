/**
 * Fichiers téléchargeables — auto-découverte depuis Cloudflare R2
 *
 * Structure R2 :
 *   fichiers/<categorie>/<nom-du-fichier.ext>
 *
 * Catégories reconnues (= sous-dossier dans R2) :
 *   plaquettes, guides, templates, webinars, rapports
 *
 * Titre auto-dérivé du nom de fichier :
 *   csrd-guide-pme-2025.pdf  →  "CSRD Guide PME 2025"
 *
 * Zéro config manuelle — déposer le fichier dans le bon dossier R2, c'est tout.
 */

import { listObjects, publicUrl } from "./r2";

export type FichierFormat = "PDF" | "XLSX" | "PPTX" | "MP4" | "ZIP";
export type FichierCategorie = "plaquettes" | "guides" | "templates" | "webinars" | "rapports";

export interface Fichier {
  id: string;
  titre: string;
  categorie: FichierCategorie;
  format: FichierFormat;
  url: string;
}

/** Mots à garder en majuscules lors de la dérivation du titre */
const ACRONYMS = new Set([
  "RSE", "ESG", "CSRD", "ESRS", "PME", "ETI", "TPE", "SA", "SAS", "KPMG",
  "PDF", "KPI", "ODD", "GRI", "CDP", "TCFD", "SFDR", "RGPD", "IA",
]);

const CATEGORY_LABELS: Record<FichierCategorie, { fr: string; en: string }> = {
  plaquettes: { fr: "Plaquette", en: "Brochure" },
  guides:     { fr: "Guide",    en: "Guide" },
  templates:  { fr: "Template", en: "Template" },
  webinars:   { fr: "Webinar",  en: "Webinar" },
  rapports:   { fr: "Rapport",  en: "Report" },
};

export { CATEGORY_LABELS };

function deriveTitle(filename: string): string {
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  return withoutExt
    .split(/[-_]/)
    .map((word) => {
      const upper = word.toUpperCase();
      return ACRONYMS.has(upper)
        ? upper
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function deriveFormat(filename: string): FichierFormat {
  const ext = filename.split(".").pop()?.toUpperCase() ?? "";
  const FORMATS: FichierFormat[] = ["PDF", "XLSX", "PPTX", "MP4", "ZIP"];
  return (FORMATS.includes(ext as FichierFormat) ? ext : "PDF") as FichierFormat;
}

function isValidCategorie(s: string): s is FichierCategorie {
  return ["plaquettes", "guides", "templates", "webinars", "rapports"].includes(s);
}

/** Charge tous les fichiers depuis R2, trié par nom. */
export async function getAllFichiers(): Promise<Fichier[]> {
  const prefix = "fichiers/";
  const keys = await listObjects(prefix);

  const fichiers: Fichier[] = [];

  for (const key of keys) {
    // key = fichiers/<categorie>/<nom.ext>
    const parts = key.split("/");
    if (parts.length < 3) continue;

    const categorie = parts[1];
    const filename  = parts[2];

    if (!isValidCategorie(categorie) || !filename) continue;

    fichiers.push({
      id:       key.replace(/\//g, "-").replace(/\.[^.]+$/, ""),
      titre:    deriveTitle(filename),
      categorie,
      format:   deriveFormat(filename),
      url:      publicUrl(key),
    });
  }

  return fichiers.sort((a, b) => a.titre.localeCompare(b.titre));
}
