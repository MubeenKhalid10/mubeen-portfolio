import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";

export const siteTitle = `${profile.name} — ${profile.headline}`;
export const siteDescription = `${profile.name} is a software engineer building full-stack applications, data tools, and AI-powered products with Python, FastAPI, and Next.js.`;

/** Canonical and OG URLs are emitted only once a real site URL is configured. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const hasSite = Boolean(getSiteUrl());
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    ...(hasSite && { alternates: { canonical: opts.path } }),
    openGraph: {
      title: opts.title,
      description: opts.description,
      ...(hasSite && { url: opts.path }),
      siteName: profile.name,
      type: "website",
    },
    twitter: { card: "summary", title: opts.title, description: opts.description },
  };
}
