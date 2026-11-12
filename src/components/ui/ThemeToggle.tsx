"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const EVENT = "themechange";
const QUERY = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The theme actually showing: a saved choice, else the OS preference. */
function getTheme(): Theme {
  const saved = document.documentElement.dataset.theme;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia(QUERY).matches ? "dark" : "light";
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage blocked: the choice still applies for this page view */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // null during SSR/hydration, so server and client markup match.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Toggle colour theme"}
      title={theme ? `Switch to ${next} theme` : undefined}
      className={`relative inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-subtle hover:text-foreground ${className}`}
    >
      <Sun
        aria-hidden="true"
        className={`absolute size-[18px] transition-all duration-300 ease-out-expo ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute size-[18px] transition-all duration-300 ease-out-expo ${
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
