"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

export function Header({
  name,
  monogram,
  items,
  resumeHref,
}: {
  name: string;
  monogram: string;
  items: NavItem[];
  resumeHref: string | null;
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (href: string) =>
    cn(
      "py-1 transition-colors duration-200 hover:text-foreground",
      isActive(href)
        ? "text-foreground underline decoration-accent decoration-2 underline-offset-8"
        : "text-muted",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label={`${name} — home`}
          className="font-serif text-xl font-semibold tracking-tight"
        >
          {monogram}
        </Link>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-8 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass(item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {resumeHref && (
              <li>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-foreground/25 px-3 py-1.5 transition-colors duration-200 hover:border-foreground hover:bg-subtle"
                >
                  Résumé
                </a>
              </li>
            )}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background sm:hidden"
        >
          <ul className="flex flex-col px-5 py-2">
            {items.map((item) => (
              <li key={item.href} className="border-b border-border last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block py-3.5 font-serif text-xl",
                    isActive(item.href) && "text-accent",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {resumeHref && (
              <li>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-serif text-xl"
                >
                  Résumé
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
