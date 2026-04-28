/**
 * Client R2 (S3-compatible) pour Cloudflare R2.
 *
 * Variables d'environnement requises (.env.local) :
 *   R2_ACCOUNT_ID        — ID de compte Cloudflare
 *   R2_ACCESS_KEY_ID     — Clé d'accès R2
 *   R2_SECRET_ACCESS_KEY — Clé secrète R2
 *   R2_BUCKET            — Nom du bucket
 *   R2_PUBLIC_URL        — URL publique du bucket (ex: https://assets.yumni.fr)
 *
 * Structure du bucket :
 *   articles/fr/<slug>.md       ← articles en français
 *   articles/en/<slug>.md       ← articles en anglais
 *   fichiers/<categorie>/<nom>  ← fichiers téléchargeables (PDF, XLSX, MP4…)
 */

import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET ?? "";
export const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

function isConfigured() {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET);
}

function getClient(): S3Client | null {
  if (!isConfigured()) return null;
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID!,
      secretAccessKey: R2_SECRET_ACCESS_KEY!,
    },
  });
}

/** Liste tous les objets avec un préfixe donné */
export async function listObjects(prefix: string): Promise<string[]> {
  const client = getClient();
  if (!client) return [];

  const keys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: R2_BUCKET,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    );
    for (const obj of res.Contents ?? []) {
      if (obj.Key) keys.push(obj.Key);
    }
    continuationToken = res.NextContinuationToken;
  } while (continuationToken);

  return keys;
}

/** Récupère le contenu texte d'un objet R2 */
export async function getObjectText(key: string): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const res = await client.send(
      new GetObjectCommand({ Bucket: R2_BUCKET, Key: key })
    );
    if (!res.Body) return null;
    return await res.Body.transformToString("utf-8");
  } catch {
    return null;
  }
}

/** URL publique d'un objet dans le bucket */
export function publicUrl(key: string): string {
  return `${R2_PUBLIC_URL}/${key}`;
}
