import { getProjects } from "@/lib/projects";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Backdrop } from "@/components/ui/Backdrop";
import { ProjectList } from "@/components/projects/ProjectList";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies of LeadFlow, ContentPulse, the Outbound AI Call Agent, and SwiftCare: full-stack, data, and AI projects by Mubeen Khalid.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  const technologies = new Set(projects.flatMap((p) => p.tags)).size;
  const live = projects.filter((p) => p.links.demo).length;

  const stats = [
    { value: projects.length, label: "Case studies" },
    { value: technologies, label: "Technologies" },
    { value: live, label: live === 1 ? "Live demo" : "Live demos" },
  ];

  return (
    <>
      <section aria-labelledby="work-title" className="relative isolate">
        <Backdrop />
        <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20">
          <Reveal>
            <Eyebrow>Work</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              id="work-title"
              className="mt-4 max-w-3xl font-serif text-4xl font-medium tracking-tight sm:text-6xl"
            >
              Selected projects
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Four projects, each with a case study covering the problem,
              architecture, decisions, and what the evidence does and does not
              show.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 sm:gap-x-14">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {s.label}
                  </dt>
                  <dd className="font-serif text-4xl font-medium tabular-nums tracking-tight">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <Container className="pb-24 pt-10 sm:pt-14">
        <ProjectList projects={projects} headingLevel="h2" featureFirst />
      </Container>
    </>
  );
}
