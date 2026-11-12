"use client";

import { useEffect, useRef } from "react";

/** Resting glow position, as a fraction of the section's width/height. */
const REST = { x: 0.2, y: 0.15 };
/** Fraction of the remaining distance covered per frame: lower = lazier follow. */
const EASE = 0.08;

/**
 * Decorative page-header backdrop: a masked dot grid and a soft accent glow
 * that eases toward the mouse (and lights up nearby dots). Place inside a
 * `relative isolate` full-width section; it listens to that section.
 *
 * Touch input and `prefers-reduced-motion` leave the glow at rest.
 */
export function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const section = root?.parentElement;
    if (!root || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let rect = section.getBoundingClientRect();
    const pos = { x: rect.width * REST.x, y: rect.height * REST.y };
    const target = { ...pos };

    const render = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      root.style.setProperty("--mx", `${pos.x.toFixed(1)}px`);
      root.style.setProperty("--my", `${pos.y.toFixed(1)}px`);
      const settled = Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(render);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      rect = section.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      root.dataset.active = "";
      kick();
    };
    const onLeave = () => {
      rect = section.getBoundingClientRect();
      target.x = rect.width * REST.x;
      target.y = rect.height * REST.y;
      delete root.dataset.active;
      kick();
    };
    const onResize = () => {
      if (root.dataset.active === undefined) onLeave();
    };

    onLeave();
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="group/backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden [--mx:20%] [--my:15%]"
    >
      {/* Base dot grid. */}
      <div className="absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent_75%)]" />

      {/* Accent dots revealed only around the cursor. */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 [background-image:radial-gradient(color-mix(in_srgb,var(--accent)_70%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_200px_at_var(--mx)_var(--my),black,transparent)] group-data-[active]/backdrop:opacity-100" />

      {/* Glow: the outer layer follows the cursor, the inner one drifts gently. */}
      <div className="absolute left-0 top-0 h-[34rem] w-[34rem] max-w-full [transform:translate3d(calc(var(--mx)-50%),calc(var(--my)-50%),0)]">
        <div className="ambient-glow size-full rounded-full bg-accent/10 blur-3xl transition-colors duration-500 group-data-[active]/backdrop:bg-accent/15" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
