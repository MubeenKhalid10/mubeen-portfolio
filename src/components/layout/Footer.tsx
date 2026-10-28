import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Section";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const linkClass =
  "group inline-flex min-h-11 items-center gap-2 font-medium underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent";

const headingClass =
  "font-mono text-xs uppercase tracking-[0.14em] text-muted";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="grid gap-10 py-12 text-sm sm:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-serif text-lg font-semibold">{profile.name}</p>
          <p className="mt-1 max-w-xs text-muted">{profile.headline}</p>
        </div>

        <div>
          <h2 className={headingClass}>Elsewhere</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GithubIcon className="size-4" />
                GitHub
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </li>
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </li>
            )}
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} className={linkClass}>
                  <Mail aria-hidden="true" className="size-4" />
                  Email
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <Container className="border-t border-border py-5 text-xs text-muted">
        © {year} {profile.name}
      </Container>
    </footer>
  );
}
