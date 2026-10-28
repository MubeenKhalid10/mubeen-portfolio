import { getProjects } from "@/lib/projects";
import { Container, PageHeader } from "@/components/ui/Section";
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
  return (
    <Container className="pb-20">
      <PageHeader
        eyebrow="Work"
        title="Selected projects"
        intro="Four projects, each with a case study covering the problem, architecture, decisions, and what the evidence does and does not show."
      />
      <ProjectList projects={projects} />
    </Container>
  );
}
