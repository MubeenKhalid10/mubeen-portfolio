"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies `value` to the clipboard; the live region announces the result. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-foreground/25 px-3 font-sans text-sm font-medium transition-colors hover:border-foreground hover:bg-subtle"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-accent" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      {copied ? "Copied" : "Copy"}
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
