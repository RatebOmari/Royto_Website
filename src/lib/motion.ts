import type { Transition, Variants } from "motion/react";

/**
 * The motion system — motion.md §0.
 * Defined once, used everywhere. Consistency is most of what makes
 * motion feel designed rather than applied.
 */

export const ease = {
  /** Entrances, reveals, anything arriving. */
  outExpo: [0.16, 1, 0.3, 1],
  /** State changes, accordions, pinned sequences. */
  inOutQuart: [0.76, 0, 0.24, 1],
  /** Micro-interactions, hovers. */
  outQuad: [0.5, 1, 0.89, 1],
} as const;

/** Cursor, magnetic buttons, node drift. */
export const spring: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 20,
  mass: 0.8,
};

export const duration = {
  /** Hover, focus, tag color. */
  micro: 0.15,
  /** Button fills, small fades. */
  fast: 0.3,
  /** Section reveals, card entrances. */
  base: 0.5,
  /** Headline lines, large panels. */
  slow: 0.8,
  /** Flow Canvas draw-in. */
  hero: 1.2,
} as const;

export const stagger = {
  /** Between sibling text lines. */
  line: 0.06,
  /** Between cards. */
  card: 0.08,
  /** Between the six capability cards. */
  capability: 0.1,
} as const;

/** Reveals travel 16px. Never more — big travel reads cheap. */
export const REVEAL_DISTANCE = 16;

/** Magnetic pull ceiling, in px. */
export const MAGNET_DISTANCE = 4;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.outExpo },
  },
};

/** Headline lines rise 110% of their own height behind a clip mask. */
export const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/** Shared viewport config for scroll-triggered reveals. */
export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -40px 0px",
} as const;
