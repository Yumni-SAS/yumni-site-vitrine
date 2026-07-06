/**
 * Articles - données depuis le dossier content/articles du projet
 *
 * Structure :
 *   content/articles/fr/<slug>.md
 *   content/articles/en/<slug>.md
 *
 * Le fichier MD contient un frontmatter YAML avec toutes les métadonnées,
 * dont `image` (chemin public vers l'image de couverture, ex: /articles/<slug>/cover.jpg).
 * Aucune config manuelle - déposer le .md (+ l'image dans public/articles/<slug>/), il apparaît automatiquement.
 *
 * Pour qu'un article existe dans les deux langues, utiliser le même <slug>
 * dans fr/ et en/ (le switch de langue conserve le slug dans l'URL).
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type ArticleLang = "fr" | "en";

export interface ArticleMeta {
  slug: string;
  lang: ArticleLang;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
  author: string;
  authorRole: string;
  tags: string[];
  featured: boolean;
  image: string;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function buildMeta(slug: string, lang: ArticleLang, data: Record<string, unknown>): ArticleMeta {
  return {
    slug,
    lang,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    category: (data.category as string) ?? "",
    readingTime: (data.readingTime as number) ?? 5,
    author: (data.author as string) ?? "Équipe Yumni",
    authorRole: (data.authorRole as string) ?? "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    featured: (data.featured as boolean) ?? false,
    image: (data.image as string) ?? "",
  };
}

/** Liste tous les articles d'une langue, triés par date décroissante */
export async function getAllArticles(lang: ArticleLang): Promise<ArticleMeta[]> {
  const dir = path.join(ARTICLES_DIR, lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const metas = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return buildMeta(slug, lang, data);
  });

  return metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Récupère un article complet (méta + HTML rendu) */
export async function getArticle(slug: string, lang: ArticleLang): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html, { sanitize: false }).process(content);

  return {
    ...buildMeta(slug, lang, data),
    contentHtml: processed.toString(),
  };
}

/** Slugs de tous les articles d'une langue (pour generateStaticParams) */
export async function getAllSlugs(lang: ArticleLang): Promise<string[]> {
  const dir = path.join(ARTICLES_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
