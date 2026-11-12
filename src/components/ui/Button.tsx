import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";

const base =
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary:
    "min-h-11 rounded-sm bg-foreground px-5 py-2.5 text-background hover:bg-accent active:bg-accent/90",
  secondary:
    "min-h-11 rounded-sm border border-foreground/25 px-5 py-2.5 hover:border-foreground hover:bg-subtle active:bg-border",
  text: "underline decoration-foreground/30 underline-offset-4 hover:text-accent hover:decoration-accent",
};

type Props = Omit<ComponentProps<typeof Link>, "className" | "children" | "target" | "rel"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Opens in a new tab with safe rel attributes and tells screen readers so. */
  external?: boolean;
};

/** A real link styled as a button — every instance navigates somewhere. */
export function LinkButton({
  variant = "primary",
  className,
  external,
  children,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(base, variants[variant], className)}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </Link>
  );
}
