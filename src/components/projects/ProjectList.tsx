import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectThumb } from "./ProjectVisual";
import { StatusBadge } from "./StatusBadge";

const caseStudyClass =
  "inline-flex min-h-11 items-center font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent";
const extLinkClass =
  "inline-flex min-h-11 items-center gap-1 text-muted hover:text-accent";

function ProjectCard({
  project: p,
  wide,
  priority,
}: {
  project: Project;
  wide?: boolean;
  priority?: boolean;
}) {
  const href = `/projects/${p.slug}`;
  const hasImage = p.screenshots.length > 0;
  return (
    <article
      className={`flex flex-col gap-5 ${
        wide && hasImage ? "md:grid md:grid-cols-2 md:items-center md:gap-10" : ""
      }`}
    >
      {hasImage && (
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <ProjectThumb project={p} priority={priority} />
        </Link>
      )}
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {p.context}
          </p>
          <StatusBadge>{p.statusLabel}</StatusBadge>
        </div>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
          <Link href={href} className="hover:text-accent">
            {p.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-xl leading-relaxed text-foreground/80">{p.tagline}</p>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">{p.summary}</p>
        <ul
          aria-label="Technologies"
          className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted"
        >
          {p.tags.slice(0, 5).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 text-sm">
          <Link href={href} className={caseStudyClass}>
            Read case study
            <span className="sr-only"> for {p.title}</span>
          </Link>
          {p.links.demo && (
            <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className={extLinkClass}>
              Live demo
              <span className="sr-only"> of {p.title} (opens in a new tab)</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
          {p.links.repo && (
            <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className={extLinkClass}>
              Repository
              <span className="sr-only"> for {p.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  const href = `/projects/${p.slug}`;
  const hasImage = p.screenshots.length > 0;
  return (
    <li className="border-b border-border">
      <article
        className={`grid gap-5 py-9 md:gap-10 md:py-12 ${
          hasImage ? "md:grid-cols-[3rem_1fr_20rem]" : "md:grid-cols-[3rem_1fr]"
        }`}
      >
        <span className="font-mono text-sm text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {p.context}
            </p>
            <StatusBadge>{p.statusLabel}</StatusBadge>
          </div>
          <h3 className="mt-2 font-serif text-3xl font-medium tracking-tight">
            <Link href={href} className="hover:text-accent">
              {p.title}
            </Link>
          </h3>
          <p className="mt-3 leading-relaxed text-foreground/80">{p.summary}</p>
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
            {p.tags.join(" · ")}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 text-sm">
            <Link href={href} className={caseStudyClass}>
              Read case study
              <span className="sr-only"> for {p.title}</span>
            </Link>
            {p.links.demo && (
              <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className={extLinkClass}>
                Live demo
                <span className="sr-only"> of {p.title} (opens in a new tab)</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            )}
            {p.links.repo && (
              <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className={extLinkClass}>
                Repository
                <span className="sr-only"> for {p.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        {hasImage && (
          <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
            <ProjectThumb project={p} priority={index === 0} />
          </Link>
        )}
      </article>
    </li>
  );
}

/**
 * `rows`: stacked numbered rows divided by hairlines, thumbnail on the right.
 * `grid`: two-column cards; `featureFirst` makes the first card full-width.
 */
export function ProjectList({
  projects,
  layout = "grid",
  featureFirst = false,
}: {
  projects: Project[];
  layout?: "rows" | "grid";
  featureFirst?: boolean;
}) {
  if (layout === "rows") {
    return (
      <ol className="border-t border-border">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </ol>
    );
  }
  return (
    <ul className="grid gap-x-12 gap-y-14 md:grid-cols-2">
      {projects.map((p, i) => (
        <li key={p.slug} className={featureFirst && i === 0 ? "md:col-span-2" : undefined}>
          <ProjectCard project={p} wide={featureFirst && i === 0} priority={i === 0} />
        </li>
      ))}
    </ul>
  );
}
