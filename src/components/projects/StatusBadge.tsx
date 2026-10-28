/** Small outlined label; the full, honest status text lives on the case study. */
export function StatusBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
      {children}
    </span>
  );
}
