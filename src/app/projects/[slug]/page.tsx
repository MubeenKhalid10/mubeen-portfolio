import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { getProject } from "@/lib/projects";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { Container } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} case study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Container className="pt-8">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
        >
          ← All projects
        </Link>
      </Container>
      <CaseStudy project={project} next={next} />
    </>
  );
}
