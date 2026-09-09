"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Lenis smooth scroll — motion.md §2.
 *
 * Off entirely under reduced motion, and off on touch devices where native
 * momentum scrolling is better than anything we would hand-roll.
 *
 * Drives Lenis from Motion's own rAF loop so scroll-linked animation and
 * Lenis agree on a single frame clock, rather than running two loops.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lenis: import("lenis").default | undefined;
    let frame = 0;
    let onClick: ((event: MouseEvent) => void) | undefined;
    let cancelled = false;

    // Loaded after the page is interactive, and off the critical path: smooth
    // scroll is an enhancement, and paying ~13KB of hydration for it delays
    // the hero paint on a mid-range phone.
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({ lerp: 0.1, duration: 1.2 });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      // Let in-page anchors (#how-we-work) route through Lenis so they land
      // smoothly instead of fighting the native jump.
      onClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }
        const anchor = (event.target as HTMLElement | null)?.closest("a");
        const href = anchor?.getAttribute("href");
        if (!href?.startsWith("#") || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { offset: -88 });
      };

      document.addEventListener("click", onClick);
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 400);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      if (onClick) document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [reduced]);

  return null;
}
