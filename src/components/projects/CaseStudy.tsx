import type { ReactNode } from "react";
import Link from "next/link";
import type { Project } from "@/types/project";
import { Container, Eyebrow } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { CoverImage, Diagram, ProjectGallery } from "./ProjectVisual";
import { StatusBadge } from "./StatusBadge";

const toc = [
  ["overview", "Overview"],
  ["problem", "Problem and solution"],
  ["contribution", "My contribution"],
  ["architecture", "Architecture"],
  ["decisions", "Decisions"],
  ["challenges", "Challenges"],
  ["results", "Results and limits"],
  ["lessons", "Lessons"],
  ["visuals", "Screenshots"],
  ["links", "Links"],
] as const;

const linkClass =
  "underline decoration-accent decoration-2 underline-offset-4 hover:text-accent";

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="border-t border-border py-9 first:border-t-0 first:pt-0"
    >
      <h2 id={`${id}-h`} className="font-serif text-2xl font-medium tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p) => (
        <p key={p} className="max-w-2xl">
          {p}
        </p>
      ))}
    </>
  );
}

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`max-w-2xl space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"} marker:text-accent`}
    >
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </Tag>
  );
}

function Pairs({ items }: { items: { title: string; body: string }[] }) {
  return (
    <dl className="max-w-2xl space-y-5">
      {items.map((d) => (
        <div key={d.title}>
          <dt className="font-medium">{d.title}</dt>
          <dd className="mt-1 text-muted">{d.body}</dd>
        </div>
      ))}
    </dl>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 font-medium">{children}</h3>;
}

export function CaseStudy({
  project: p,
  next,
}: {
  project: Project;
  next: { slug: string; title: string };
}) {
  return (
    <article className="pb-20">
      <Container>
        <header className="pb-10 pt-10 sm:pt-14">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Eyebrow>Case study · {p.context}</Eyebrow>
            <StatusBadge>{p.statusLabel}</StatusBadge>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight sm:text-6xl">
            {p.title}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-muted">{p.tagline}</p>
          <p className="mt-4 max-w-2xl leading-relaxed">{p.summary}</p>
          {(p.links.demo || p.links.repo) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {p.links.demo && (
                <LinkButton href={p.links.demo} external>
                  Visit live demo
                </LinkButton>
              )}
              {p.links.repo && (
                <LinkButton href={p.links.repo} variant="secondary" external>
                  Source repository
                </LinkButton>
              )}
            </div>
          )}
          <dl className="mt-8 grid max-w-3xl gap-x-10 gap-y-3 border-t border-border pt-6 text-sm sm:grid-cols-[6rem_1fr]">
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:pt-0.5">
              Status
            </dt>
            <dd>{p.status}</dd>
            <dt className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted sm:mt-0 sm:pt-0.5">
              Stack
            </dt>
            <dd>{p.tags.join(" · ")}</dd>
          </dl>
        </header>

        <CoverImage project={p} />

        <details className="mt-10 border-y border-border lg:hidden">
          <summary className="flex min-h-11 cursor-pointer items-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
            On this page
          </summary>
          <ul className="pb-3 text-sm">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="block min-h-11 py-2.5 hover:text-accent">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <div className="grid gap-12 pt-12 lg:grid-cols-[12rem_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              On this page
            </p>
            <ul className="sticky top-24 space-y-2 border-l border-border text-sm">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="-ml-px block border-l border-transparent py-0.5 pl-4 text-muted hover:border-accent hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <Block id="overview" title="Project overview">
              <Paragraphs items={p.overview} />
            </Block>
            <Block id="problem" title="Problem and solution">
              <SubHeading>The problem</SubHeading>
              <Paragraphs items={p.problem} />
              <SubHeading>The solution</SubHeading>
              <Paragraphs items={p.solution.paragraphs} />
              <List items={p.solution.workflow} ordered />
            </Block>
            <Block id="contribution" title="My technical contribution">
              <List items={p.contribution} />
            </Block>
            <Block id="architecture" title="Architecture and technology stack">
              <Paragraphs items={p.architecture.paragraphs} />
              <Diagram project={p} />
              <dl className="max-w-2xl divide-y divide-border border-y border-border text-sm">
                {p.architecture.stack.map((g) => (
                  <div key={g.group} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]">
                    <dt className="font-medium">{g.group}</dt>
                    <dd className="text-muted">{g.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </Block>
            <Block id="decisions" title="Engineering decisions and trade-offs">
              <Pairs items={p.decisions} />
            </Block>
            <Block id="challenges" title="Challenges and how they were addressed">
              <Pairs
                items={p.challenges.map((c) => ({ title: c.challenge, body: c.response }))}
              />
            </Block>
            <Block id="results" title="Results and limitations">
              <Paragraphs items={p.results.paragraphs} />
              {p.results.metrics && (
                <dl className="grid max-w-2xl gap-px border border-border bg-border sm:grid-cols-3">
                  {p.results.metrics.map((m) => (
                    <div key={m.label} className="bg-background p-4">
                      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                        {m.label}
                      </dt>
                      <dd className="mt-1 font-serif text-2xl">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <SubHeading>Limitations and caveats</SubHeading>
              <List items={p.results.caveats} />
            </Block>
            <Block id="lessons" title="Lessons and future improvements">
              <List items={p.lessons} />
            </Block>
            {p.screenshots.length > 1 && (
              <Block id="visuals" title="More screenshots">
                <ProjectGallery project={p} />
              </Block>
            )}
            <Block id="links" title="Links and next case study">
              {p.links.repo || p.links.demo ? (
                <ul className="space-y-2">
                  {p.links.demo && (
                    <li>
                      <a className={linkClass} href={p.links.demo} target="_blank" rel="noopener noreferrer">
                        Live demo
                      </a>
                    </li>
                  )}
                  {p.links.repo && (
                    <li>
                      <a className={linkClass} href={p.links.repo} target="_blank" rel="noopener noreferrer">
                        Source repository
                      </a>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-muted">
                  No public repository or live demo is linked for this project.
                </p>
              )}
              {!p.links.repo && p.links.demo && (
                <p className="text-sm text-muted">No public repository is linked.</p>
              )}
              <p className="pt-2 text-sm">
                <span className="text-muted">Next case study: </span>
                <Link href={`/projects/${next.slug}`} className={`font-medium ${linkClass}`}>
                  {next.title}
                </Link>
              </p>
            </Block>
          </div>
        </div>
      </Container>
    </article>
  );
}
