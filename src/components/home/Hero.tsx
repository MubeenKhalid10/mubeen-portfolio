import { profile } from "@/content/profile";
import { getResumeHref } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Typewriter } from "./Typewriter";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const socialClass =
  "inline-flex min-h-11 items-center gap-2 text-sm text-muted underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent";

export function Hero() {
  const resume = getResumeHref();
  return (
    <section aria-labelledby="hero-title" className="pb-16 pt-14 sm:pb-24 sm:pt-24">
      <Container>
        <Reveal>
          <Eyebrow>Portfolio · Lahore, Pakistan</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1
            id="hero-title"
            className="mt-5 font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
          >
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl font-serif text-2xl leading-snug text-foreground/85 sm:text-3xl">
            <Typewriter text={profile.headline} />
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro} I&rsquo;m an AI Associate Engineer at Hashmaker
            Solutions.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="/projects">Explore My Work</LinkButton>
            {resume && (
              <LinkButton href={resume} variant="secondary" target="_blank">
                View Résumé
              </LinkButton>
            )}
          </div>
          <ul aria-label="Social links" className="mt-4 flex flex-wrap gap-x-6">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={socialClass}>
                <GithubIcon className="size-4" />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={socialClass}>
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} className={socialClass}>
                  <Mail aria-hidden="true" className="size-4" />
                  Email
                </a>
              </li>
            )}
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 border-t border-border pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Works with
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2 font-mono text-sm">
              {profile.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
