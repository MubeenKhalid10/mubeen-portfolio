import { CopyButton } from "@/components/ui/CopyButton";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/content/profile";
import { Container, PageHeader, Row } from "@/components/ui/Section";
import { getResumeHref } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Mubeen Khalid about full-stack and AI engineering opportunities.",
  path: "/contact",
});

const linkClass =
  "inline-flex min-h-11 items-center gap-2 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent";

export default function ContactPage() {
  const resume = getResumeHref();
  return (
    <Container className="pb-20">
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about engineering opportunities"
        intro="I'm interested in full-stack engineering and AI / ML engineering roles. If my work looks relevant to your team, I'd be glad to hear from you."
      />
      <Row label="Reach me">
        <p className="mb-6 max-w-xl text-lg leading-relaxed text-muted">
          The quickest way to reach me is by email. I&rsquo;m happy to talk about
          a role, a project, or how I could contribute to your team.
        </p>
        <ul className="space-y-2 font-serif text-xl sm:text-3xl">
          {profile.email && (
            <li className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
                <Mail aria-hidden="true" className="size-5 shrink-0" />
                {profile.email}
              </a>
              <CopyButton value={profile.email} label="Copy email address" />
            </li>
          )}
          {profile.linkedin && (
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <LinkedinIcon className="size-5" />
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <GithubIcon className="size-5" />
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          {resume && (
            <li>
              <a href={resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Résumé (PDF)
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
        </ul>
      </Row>
    </Container>
  );
}
