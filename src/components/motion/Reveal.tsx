"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * The workhorse reveal — motion.md §2.
 *
 * Opacity 0→1 and 16px of travel, 500ms easeOutExpo, once at 15% visibility
 * with a -40px bottom root margin. Implemented as a CSS transition rather than
 * a JS animation: this component appears about thirty times on the homepage,
 * and routing every instance through Motion put the animation library on the
 * hydration critical path.
 *
 * Reduced motion is handled in CSS, so the end state is correct on the very
 * first paint with no JavaScript involved at all.
 */

/**
 * One observer for the entire page rather than one per element — motion.md §8
 * asks for a single loop, and the same logic applies to observers.
 */
let sharedObserver: IntersectionObserver | null = null;

function observer(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        // 15% of a very tall element may be more than a short viewport can
        // ever show, so anything taller than half the viewport reveals on any
        // intersection instead of waiting for a ratio it can't reach.
        const tall = entry.boundingClientRect.height > window.innerHeight * 0.5;
        if (!tall && entry.intersectionRatio < 0.15) continue;
        (entry.target as HTMLElement).dataset.revealed = "1";
        sharedObserver?.unobserve(entry.target);
      }
    },
    { threshold: [0, 0.15], rootMargin: "0px 0px -40px 0px" },
  );
  return sharedObserver;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Already past? Show it immediately rather than waiting for a scroll.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      node.dataset.revealed = "1";
      return;
    }
    const io = observer();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);
  return ref;
}

type RevealProps = {
  children: ReactNode;
  /** Seconds before this element's own reveal begins. */
  delay?: number;
  /** Seconds between direct children. Set it to stagger a list. */
  stagger?: number;
  as?: ElementType;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  stagger,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useReveal<HTMLElement>();

  // Staggering parent: it isn't revealed itself, it just releases its children.
  if (stagger !== undefined) {
    return (
      <Tag
        ref={ref}
        className={className}
        style={
          {
            "--reveal-stagger": `${stagger * 1000}ms`,
            "--reveal-delay": `${delay * 1000}ms`,
          } as React.CSSProperties
        }
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delay * 1000}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * A single item inside a staggered `<Reveal stagger={...}>`. Its delay is
 * derived from its index so the whole list is driven by one observer on the
 * parent instead of one per row.
 */
export function RevealItem({
  children,
  as: Tag = "div",
  className,
  index = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  index?: number;
}) {
  return (
    <Tag
      className={["reveal", className].filter(Boolean).join(" ")}
      style={
        {
          "--reveal-delay": `calc(var(--reveal-delay, 0ms) + ${index} * var(--reveal-stagger, 80ms))`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
