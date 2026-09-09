"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wrapper for the capability micro-diagrams — motion.md §3.
 *
 * Plays once when the card scrolls into view, then rests at the final frame.
 * Looping while hovered or focused is handled in CSS (`.dg-host:hover`), so
 * this only has to answer one question: has it been seen yet?
 */
export function Diagram({
  children,
  title,
}: {
  children: ReactNode;
  /** Text alternative — what this animation depicts. */
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || play) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [play]);

  return (
    <div ref={ref} data-diagram data-play={play ? "1" : "0"}>
      <svg
        viewBox="0 0 240 160"
        role="img"
        aria-label={title}
        className="block w-full"
      >
        {children}
      </svg>
    </div>
  );
}

/** Shorthand for the CSS custom properties the keyframes read. */
export function anim({
  delay = 0,
  duration = 600,
  x,
  y,
  len,
}: {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  len?: number;
}): React.CSSProperties {
  return {
    "--dg-delay": `${delay}ms`,
    "--dg-dur": `${duration}ms`,
    ...(x !== undefined ? { "--dg-x": `${x}px` } : {}),
    ...(y !== undefined ? { "--dg-y": `${y}px` } : {}),
    ...(len !== undefined
      ? { "--dg-len": `${len}`, strokeDasharray: len }
      : {}),
  } as React.CSSProperties;
}
