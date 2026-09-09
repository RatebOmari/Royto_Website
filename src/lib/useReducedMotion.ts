"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * Tracks `prefers-reduced-motion: reduce`.
 *
 * Read synchronously on the client rather than resolved in an effect: an
 * effect-based flip would mount the static branch first, then swap to the
 * animated one, making above-the-fold content appear, vanish, and fade back in.
 *
 * The server snapshot assumes motion is allowed, so the markup Motion emits
 * during SSR matches what a motion-enabled client hydrates into. A
 * reduced-motion visitor resolves to the static end state on the first client
 * render — content only ever appears, never disappears.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
