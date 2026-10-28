"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 45;
const START_MS = 350;

/**
 * Types the full headline once, then stops with the complete text showing.
 * Assistive tech reads the headline once (sr-only); the animated text is
 * hidden from it. An invisible copy reserves the final height so the layout
 * never shifts. With reduced motion the headline is shown static.
 */
export function Typewriter({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (reduce || done) return;
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? START_MS : TYPE_MS);
    return () => clearTimeout(timer);
  }, [reduce, done, count]);

  if (reduce) return <span>{text}</span>;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative block">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">
          {text.slice(0, count)}
          <span
            className={`ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-accent ${
              done ? "opacity-0" : "animate-pulse"
            }`}
          />
        </span>
      </span>
    </>
  );
}
