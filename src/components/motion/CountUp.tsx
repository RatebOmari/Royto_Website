"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Counts a number up on view — motion.md §2.
 *
 * **Only ever used on honest values**: a price, a duration, a count of things
 * that genuinely exist. Never on invented traction numbers. Royto has no
 * customers yet, so there is nothing else on this site for it to count.
 *
 * `tabular-nums` keeps the width fixed so the surrounding layout can't jitter.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const formatted = value.toLocaleString("en-US");

  useEffect(() => {
    if (reduced || !inView) return;
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration: 0.9,
      ease: ease.outExpo,
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span className="tabular">
      {prefix}
      {/* Renders the final value server-side, so it is correct with no JS. */}
      <span ref={ref}>{formatted}</span>
      {suffix}
    </span>
  );
}
