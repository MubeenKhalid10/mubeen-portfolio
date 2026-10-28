import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/content/profile";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL once the final URL is known
 * (e.g. https://mubeen-portfolio.vercel.app). On Vercel, the production
 * domain is used automatically when the variable is unset. Locally it is
 * undefined, so no canonical URL is emitted.
 */
export function getSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return undefined;
}

/** Returns the résumé URL only if the PDF exists in /public. */
export function getResumeHref(): string | null {
  const file = path.join(process.cwd(), "public", profile.resumeFile);
  return existsSync(file) ? `/${profile.resumeFile}` : null;
}
