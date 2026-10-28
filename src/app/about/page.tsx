import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { Container, PageHeader, Row } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { getResumeHref } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Mubeen Khalid is a software engineer and AI Associate Engineer at Hashmaker Solutions with a BS in Software Engineering from COMSATS University.",
  path: "/about",
});

export default function AboutPage() {
  const resume = getResumeHref();
  const { education, experience, certifications } = profile;
  return (
    <Container className="pb-20">
      <PageHeader
        eyebrow="About"
        title="An engineer who learns by shipping"
        intro="Full-stack and AI integration work, from Next.js interfaces to Python services and voice AI."
      />

      <Row label="Profile">
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {resume && (
          <div className="mt-7">
            <LinkButton href={resume} variant="secondary" target="_blank">
              View Résumé
            </LinkButton>
          </div>
        )}
      </Row>

      <Row label="Experience">
        <ul className="space-y-8">
          {experience.map((e) => (
            <li key={`${e.organization}-${e.title}`} className="max-w-2xl">
              <p className="font-serif text-2xl font-medium">{e.title}</p>
              <p className="mt-1 text-sm text-muted">
                {e.organization} · {e.period}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed marker:text-accent">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Row>

      <Row label="Education">
        <p className="font-serif text-2xl font-medium">{education.degree}</p>
        <p className="mt-1 text-muted">{education.institution}</p>
        {education.period && (
          <p className="mt-1 text-sm text-muted">{education.period}</p>
        )}
      </Row>

      <Row label="Skills">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h3 className="font-medium">{g.title}</h3>
              <ul className="mt-3 divide-y divide-border border-y border-border">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 py-2.5 text-[15px]"
                  >
                    <span>{s.name}</span>
                    {s.evidence && (
                      <span className="font-mono text-xs text-muted">{s.evidence}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          The note beside a skill names the project where it was used.
        </p>
      </Row>

      <Row label="Certifications">
        <ul className="divide-y divide-border border-y border-border">
          {certifications.map((c) => (
            <li
              key={c.name}
              className="flex flex-wrap items-baseline justify-between gap-x-6 py-2.5 text-[15px]"
            >
              <span>{c.name}</span>
              <span className="font-mono text-xs text-muted">{c.issuer}</span>
            </li>
          ))}
        </ul>
      </Row>
    </Container>
  );
}
