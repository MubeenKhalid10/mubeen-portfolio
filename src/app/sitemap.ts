import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  // Sitemaps need absolute URLs; emit none until a real site URL is configured.
  if (!siteUrl) return [];
  return [
    "",
    "/projects",
    "/about",
    "/contact",
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
