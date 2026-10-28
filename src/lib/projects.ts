import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { projects } from "@/content/projects";
import type { Project, Screenshot } from "@/types/project";

const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

/**
 * Any image dropped into public/images/<slug>/ becomes a screenshot,
 * sorted by filename. "01-dashboard-overview.png" gets the caption
 * "Dashboard overview". Missing folders simply yield no screenshots.
 */
async function loadScreenshots(project: Project): Promise<Screenshot[]> {
  const dir = path.join(process.cwd(), "public", "images", project.slug);
  let files: string[];
  try {
    files = (await readdir(dir)).filter((f) => IMAGE_EXT.test(f)).sort();
  } catch {
    return [];
  }
  const shots = await Promise.all(
    files.map(async (file): Promise<Screenshot | null> => {
      try {
        const { width, height } = await sharp(path.join(dir, file)).metadata();
        if (!width || !height) return null;
        const label = file
          .replace(IMAGE_EXT, "")
          .replace(/^\d+[-_ ]*/, "")
          .replace(/[-_]+/g, " ")
          .trim();
        const caption = label
          ? label.charAt(0).toUpperCase() + label.slice(1)
          : project.title;
        return {
          src: `/images/${project.slug}/${encodeURIComponent(file)}`,
          alt: `${project.title} screenshot: ${caption.toLowerCase()}`,
          width,
          height,
          caption,
        };
      } catch {
        return null;
      }
    }),
  );
  return shots.filter((s): s is Screenshot => s !== null);
}

async function withScreenshots(project: Project): Promise<Project> {
  return { ...project, screenshots: await loadScreenshots(project) };
}

export async function getProjects(): Promise<Project[]> {
  return Promise.all(projects.map(withScreenshots));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const project = projects.find((p) => p.slug === slug);
  return project && withScreenshots(project);
}
