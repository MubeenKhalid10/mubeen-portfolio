import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectThumb } from "./ProjectVisual";
import { StatusBadge } from "./StatusBadge";

type HeadingLevel = "h2" | "h3";

const extLinkClass =
  "relative z-10 inline-flex min-h-11 items-center gap-1 text-sm text-muted transition-colors hover:text-accent";

function TagChips({ tags, max = 5 }: { tags: string[]; max?: number }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
      {tags.slice(0, max).map((t) => (
        <li
          key={t}
          className="rounded-full border border-border bg-subtle px-2.5 py-0.5 font-mono text-xs text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ExternalLinks({ project: p }: { project: Project }) {
  return (
    <>
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
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      )}
    </>
  );
}

/** "Read case study →" whose arrow slides on card hover. Visual only: the title is the link. */
function ReadMore() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent"
    >
      Read case study
      <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </span>
  );
}

/** Decorative stage behind a screenshot: dotted texture plus a glow that warms on hover. */
function MediaStage({
  children,
  wide,
  flip,
}: {
  children: ReactNode;
  wide?: boolean;
  flip?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border bg-subtle",
        wide
          ? "p-5 sm:p-8 md:flex md:items-center md:border-b-0 md:p-10"
          : "px-5 pt-5 sm:px-8 sm:pt-8",
        wide && (flip ? "md:order-last md:border-l" : "md:border-r"),
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/15"
      />
      <div
        className={cn(
          "relative w-full transition-transform duration-700 ease-out-expo",
          wide ? "group-hover:-translate-y-1" : "translate-y-2 group-hover:translate-y-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ProjectCard({
  project: p,
  index,
  wide,
  flip,
  priority,
  headingLevel: Heading,
}: {
  project: Project;
  index: number;
  wide?: boolean;
  /** Wide cards only: put the image on the right. */
  flip?: boolean;
  priority?: boolean;
  headingLevel: HeadingLevel;
}) {
  const href = `/projects/${p.slug}`;
  const hasImage = p.screenshots.length > 0;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card",
        "transition-[transform,box-shadow,border-color] duration-500 ease-out-expo",
        "hover:-translate-y-1 hover:border-foreground/20 hover:shadow-card-hover",
        wide && hasImage && (flip ? "md:grid md:grid-cols-[1fr_1.35fr]" : "md:grid md:grid-cols-[1.35fr_1fr]"),
      )}
    >
      {hasImage && (
        <MediaStage wide={wide} flip={flip}>
          <ProjectThumb
            project={p}
            priority={priority}
            sizes={wide ? "(min-width: 768px) 620px, 100vw" : "(min-width: 768px) 480px, 100vw"}
          />
        </MediaStage>
      )}

      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", wide && "md:justify-center md:p-10")}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{p.context}</p>
            <StatusBadge>{p.statusLabel}</StatusBadge>
          </div>
          <span aria-hidden="true" className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <Heading
          className={cn(
            "mt-3 font-serif font-medium tracking-tight",
            wide ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
          )}
        >
          {/* Stretched link: the whole card is clickable, the focus ring wraps the card. */}
          <Link
            href={href}
            className="transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-accent focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {p.title}
          </Link>
        </Heading>
        <p className="mt-3 leading-relaxed text-foreground/85">{p.tagline}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>

        <div className="mt-5">
          <TagChips tags={p.tags} />
        </div>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 border-t border-border pt-2">
            <ReadMore />
            <div className="flex flex-wrap items-center gap-x-5">
              <ExternalLinks project={p} />
            </div>
          </div>
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
      <InView delay={index * 90}>
        <article
          className={cn(
            "group relative grid gap-6 py-10 md:gap-10 md:py-12",
            hasImage ? "md:grid-cols-[3rem_1fr_22rem]" : "md:grid-cols-[3rem_1fr]",
          )}
        >
          <span
            aria-hidden="true"
            className="font-mono text-sm text-muted transition-colors group-hover:text-accent"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {p.context}
              </p>
              <StatusBadge>{p.statusLabel}</StatusBadge>
            </div>
            <h3 className="mt-2 font-serif text-3xl font-medium tracking-tight">
              <Link
                href={href}
                className="transition-colors after:absolute after:inset-0 group-hover:text-accent focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
              >
                {p.title}
              </Link>
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/85">{p.summary}</p>
            <div className="mt-5">
              <TagChips tags={p.tags} max={6} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-6">
              <ReadMore />
              <ExternalLinks project={p} />
            </div>
          </div>
          {hasImage && (
            <div className="md:pt-1">
              <ProjectThumb project={p} sizes="(min-width: 768px) 352px, 100vw" />
            </div>
          )}
        </article>
      </InView>
    </li>
  );
}

/**
 * `rows`: stacked numbered rows divided by hairlines, thumbnail on the right.
 * `grid`: cards in two columns; `featureFirst` makes the first card full-width
 * (and the last one too when it would otherwise sit alone in its row).
 */
export function ProjectList({
  projects,
  layout = "grid",
  featureFirst = false,
  headingLevel = "h3",
}: {
  projects: Project[];
  layout?: "rows" | "grid";
  featureFirst?: boolean;
  /** Use "h2" when the list sits directly under the page's h1. */
  headingLevel?: HeadingLevel;
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
    <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
      {projects.map((p, i) => {
        const last = i === projects.length - 1;
        const lastIsOrphan = featureFirst && (projects.length - 1) % 2 === 1;
        const wide = featureFirst && (i === 0 || (last && lastIsOrphan));
        const card = (
          <ProjectCard
            project={p}
            index={i}
            wide={wide}
            flip={wide && i !== 0}
            priority={i === 0}
            headingLevel={headingLevel}
          />
        );
        return (
          <li key={p.slug} className={cn("flex flex-col", wide && "md:col-span-2")}>
            {i === 0 ? (
              // Above the fold: animate on load, not on scroll, so it never waits for JS.
              <Reveal delay={0.2} className="flex flex-1 flex-col">
                {card}
              </Reveal>
            ) : (
              <InView className="flex flex-1 flex-col" delay={featureFirst ? ((i - 1) % 2) * 120 : (i % 2) * 120}>
                {card}
              </InView>
            )}
          </li>
        );
      })}
    </ul>
  );
}
