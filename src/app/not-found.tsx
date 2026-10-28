import { Container } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">404</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for doesn&rsquo;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <LinkButton href="/">Back to home</LinkButton>
        <LinkButton href="/projects" variant="secondary">
          View projects
        </LinkButton>
      </div>
    </Container>
  );
}
