import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** Small mono label used above headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="border-b border-border pb-10 pt-14 sm:pb-14 sm:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium tracking-tight sm:text-6xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
      )}
    </header>
  );
}

/** Two-column row: sticky-ish label on the left, content on the right. */
export function Row({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className="grid gap-4 border-b border-border py-10 md:grid-cols-[14rem_1fr] md:gap-12 md:py-12"
    >
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1.5">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}
