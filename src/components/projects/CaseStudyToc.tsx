"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

/** Distance from the viewport top at which a section counts as "current". */
const ACTIVATION_OFFSET = 140;

/**
 * Tracks which section the reader is in: the last one whose top has passed
 * the activation line, or the final section once the page is scrolled to
 * the bottom (short last sections can never reach the line otherwise).
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - ACTIVATION_OFFSET <= 0) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && current) current = ids[ids.length - 1] ?? current;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}

/** Sticky sidebar for large screens; the accent rail marks the current section. */
export function CaseStudyToc({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-border text-sm">
        {items.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 transition-[color,border-color] duration-300",
                  isActive
                    ? "border-accent font-medium text-foreground"
                    : "border-transparent text-muted hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Collapsible version for small screens; the summary shows where you are. */
export function CaseStudyTocMobile({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids);
  const activeLabel = items.find((i) => i.id === active)?.label;

  return (
    <details className="group mt-10 rounded-lg border border-border bg-surface lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 truncate">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            On this page
          </span>
          {activeLabel && (
            <span className="ml-2 text-sm text-foreground">· {activeLabel}</span>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <nav aria-label="On this page">
        <ul className="border-t border-border px-2 py-2 text-sm">
          {items.map(({ id, label }) => {
            const isActive = id === active;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
                  className={cn(
                    "flex min-h-11 items-center rounded-md px-2 transition-colors",
                    isActive ? "bg-subtle font-medium text-accent" : "hover:bg-subtle",
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </details>
  );
}
