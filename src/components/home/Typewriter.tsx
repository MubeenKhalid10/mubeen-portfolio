"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const START_MS = 350; // delay before the very first character
const TYPE_MS = 45; // per character while typing
const HOLD_MS = 3200; // full headline stays on screen
const DELETE_MS = 20; // per character while erasing (faster than typing)
const WAIT_MS = 600; // empty pause before typing again

type Phase = "typing" | "holding" | "deleting" | "waiting";

/**
 * Types the headline, holds it, erases it, and types it again, in a loop.
 * Assistive tech reads the headline once (sr-only); the animated text is
 * hidden from it. An invisible copy reserves the final height so the layout
 * never shifts. The loop pauses while the headline is off-screen, the tab is
 * hidden, or the pointer rests on it; with reduced motion it is static.
 */
export function Typewriter({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [offscreen, setOffscreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [started, setStarted] = useState(false);

  // Pause when scrolled out of view or when the tab is in the background.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e?.isIntersecting));
    io.observe(el);
    const onVisibility = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  const paused = offscreen || hidden || (hovered && phase === "holding");

  useEffect(() => {
    if (reduce || paused) return;

    let delay: number;
    let step: () => void;

    switch (phase) {
      case "typing":
        if (count >= text.length) {
          delay = 0;
          step = () => setPhase("holding");
        } else {
          delay = started ? TYPE_MS : START_MS;
          step = () => {
            setStarted(true);
            setCount((c) => c + 1);
          };
        }
        break;
      case "holding":
        delay = HOLD_MS;
        step = () => setPhase("deleting");
        break;
      case "deleting":
        if (count <= 0) {
          delay = 0;
          step = () => setPhase("waiting");
        } else {
          delay = DELETE_MS;
          step = () => setCount((c) => c - 1);
        }
        break;
      case "waiting":
        delay = WAIT_MS;
        step = () => setPhase("typing");
        break;
    }

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [reduce, paused, phase, count, started, text.length]);

  if (reduce) return <span>{text}</span>;

  // The caret blinks while idle (holding/waiting) and stays solid while it moves.
  const idle = phase === "holding" || phase === "waiting";

  return (
    <>
      <span className="sr-only">{text}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className="relative block"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">
          {text.slice(0, count)}
          <span
            className={`ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-accent ${
              idle ? "animate-pulse" : ""
            }`}
          />
        </span>
      </span>
    </>
  );
}
