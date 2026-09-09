"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useRef, type ReactNode } from "react";
import { MAGNET_DISTANCE, spring } from "@/lib/motion";
import { usePointerFine } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Pulls its child up to 4px toward the pointer on a spring — motion.md §2.
 * Four pixels is the whole effect: the button noticing you, not a toy.
 *
 * The springs live in an inner component that is only mounted for a fine
 * pointer with motion allowed. This wrapper appears on every button on the
 * site, so constructing two spring values per instance on a phone — where the
 * effect can never fire — was pure hydration cost.
 */
function MagneticInner({
  children,
  className,
  strength,
}: {
  children: ReactNode;
  className?: string;
  strength: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      // Normalise by half-size so the pull maxes out at the element's edge.
      x.set(Math.max(-1, Math.min(1, dx / (rect.width / 2))) * strength);
      y.set(Math.max(-1, Math.min(1, dy / (rect.height / 2))) * strength);
    },
    [strength, x, y],
  );

  const release = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      {children}
    </motion.span>
  );
}

export function Magnetic({
  children,
  className,
  strength = MAGNET_DISTANCE,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const fine = usePointerFine();

  if (reduced || !fine) {
    return <span className={className}>{children}</span>;
  }

  return (
    <MagneticInner className={className} strength={strength}>
      {children}
    </MagneticInner>
  );
}
