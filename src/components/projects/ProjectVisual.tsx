import Image from "next/image";
import type { Project } from "@/types/project";

type Shot = Project["screenshots"][number];

/** The screenshot chosen by `project.cover`, falling back to the first file. */
export function getCover(project: Project): Shot | undefined {
  const { screenshots, cover } = project;
  if (cover) {
    const needle = cover.toLowerCase();
    const match = screenshots.find((s) =>
      decodeURIComponent(s.src).toLowerCase().includes(needle),
    );
    if (match) return match;
  }
  return screenshots[0];
}

function Screenshot({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <figure>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className="h-auto w-full rounded-sm border border-border"
      />
      {shot.caption && (
        <figcaption className="mt-2 font-mono text-xs text-muted">
          Screenshot · {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Flow diagram, always labelled and captioned so it is never mistaken for a screenshot. */
export function Diagram({ project }: { project: Project }) {
  const { steps, caption } = project.diagram;
  return (
    <figure>
      <ol
        aria-label={caption}
        className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr"
      >
        {steps.map((step, i) => (
          <li key={step.label} className="min-w-0 bg-subtle p-4">
            <span className="font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-1 text-sm font-medium leading-snug [overflow-wrap:anywhere]">
              {step.label}
            </p>
            {step.detail && (
              <p className="mt-0.5 text-xs text-muted [overflow-wrap:anywhere]">
                {step.detail}
              </p>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 font-mono text-xs text-muted">
        Diagram · {caption}
      </figcaption>
    </figure>
  );
}

/** Screenshots other than the cover, which the case-study header already shows. */
export function ProjectGallery({ project }: { project: Project }) {
  const cover = getCover(project);
  const rest = project.screenshots.filter((s) => s.src !== cover?.src);
  if (rest.length === 0) return null;
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {rest.map((s) => (
        <Screenshot
          key={s.src}
          shot={s}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
        />
      ))}
    </div>
  );
}

/** Fixed 16:10 frame so every card image has the same shape; the top of the UI stays visible. */
export function ProjectThumb({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const shot = getCover(project);
  if (!shot) return null;
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes="(min-width: 768px) 520px, 100vw"
      priority={priority}
      className="aspect-[16/10] w-full rounded-sm border border-border object-cover object-top"
    />
  );
}

export function CoverImage({ project }: { project: Project }) {
  const shot = getCover(project);
  if (!shot) return null;
  return (
    <figure>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(min-width: 1152px) 1088px, 100vw"
        priority
        className="h-auto w-full rounded-sm border border-border"
      />
      <figcaption className="mt-2 font-mono text-xs text-muted">
        Screenshot · {shot.caption}
      </figcaption>
    </figure>
  );
}
