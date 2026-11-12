/** Small outlined label; the full, honest status text lives on the case study. */
export function StatusBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-sm border border-border px-2 py-0.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
      {children}
    </span>
  );
}
