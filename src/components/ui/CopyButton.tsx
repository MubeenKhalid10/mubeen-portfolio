"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useState } from "react";

type State = "idle" | "copied" | "failed";

/** Copies `value` to the clipboard; a sibling live region announces the result. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  const Icon = state === "copied" ? Check : state === "failed" ? X : Copy;
  const text = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-foreground/25 px-3 font-sans text-sm font-medium transition-colors hover:border-foreground hover:bg-subtle active:bg-border"
      >
        <Icon aria-hidden="true" className={`size-4 ${state === "idle" ? "" : "text-accent"}`} />
        {text}
      </button>
      <span role="status" className="sr-only">
        {state === "copied"
          ? "Email address copied"
          : state === "failed"
            ? "Couldn't copy. Select the address and copy it manually."
            : ""}
      </span>
    </>
  );
}
