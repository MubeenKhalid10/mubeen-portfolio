import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One-time fade/rise on load, done in CSS (see `.reveal` in globals.css) so
 * it needs no client JS, works before hydration, and is switched off by
 * `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const style: CSSProperties | undefined = delay
    ? { animationDelay: `${delay}s` }
    : undefined;
  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
