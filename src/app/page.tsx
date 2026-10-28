import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ProjectList } from "@/components/projects/ProjectList";
import { getProjects } from "@/lib/projects";
import { profile } from "@/content/profile";
import { pageMetadata, siteDescription, siteTitle } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: siteTitle,
  description: siteDescription,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const projects = await getProjects();
  const role = profile.experience[0];
  return (
    <>
      <Hero />

      <section aria-labelledby="work-title" className="border-t border-border py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 id="work-title" className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                Projects
              </h2>
            </div>
            <Link href="/projects" className="inline-flex min-h-11 items-center text-sm underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              All projects
            </Link>
          </div>
          <ProjectList projects={projects.slice(0, 3)} layout="rows" />
        </Container>
      </section>

      {role && (
        <section aria-labelledby="now-title" className="border-t border-border py-16 sm:py-20">
          <Container className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12">
            <h2 id="now-title" className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1.5">
              Currently
            </h2>
            <div className="max-w-2xl">
              <p className="font-serif text-2xl font-medium">
                {role.title}, {role.organization}
              </p>
              <p className="mt-1 text-sm text-muted">{role.period}</p>
              <p className="mt-4 leading-relaxed">{role.bullets[0]}</p>
              <Link href="/about" className="mt-3 inline-flex min-h-11 items-center text-sm underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                More about me
              </Link>
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="cta-title" className="border-t border-border py-16 sm:py-20">
        <Container>
          <h2 id="cta-title" className="max-w-2xl font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Hiring for a full-stack or AI engineering role?
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            I&rsquo;d be glad to talk about how I can contribute.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-11 items-center rounded-sm bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Get in touch
          </Link>
        </Container>
      </section>
    </>
  );
}
