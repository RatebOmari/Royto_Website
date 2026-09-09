"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * The server snapshot is `false`, so anything gated on this mounts only after
 * the client confirms the query matches. That is deliberate: it keeps
 * desktop-only machinery (the pinned scroll sequence, magnetic pointers) from
 * ever being constructed on a phone, where it costs hydration time and is
 * never seen.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True only for a precise pointer — a mouse or trackpad, never touch. */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}
