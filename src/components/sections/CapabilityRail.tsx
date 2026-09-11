"use client";

import { useEffect, useState } from "react";
import { capabilities, customBuild, STATUS_LABEL } from "@/content/capabilities";
import { cx } from "@/lib/utils";

/** Mirrors the section order on /what-we-automate. */
const entries = [...capabilities, customBuild];

/**
 * Sticky side rail showing which capability you are currently in.
 *
 * Uses one IntersectionObserver over the section headings with a band near
 * the top of the viewport, so "current" means the section you are reading
 * rather than whichever happens to be largest on screen.
 */
export function CapabilityRail() {
  const [active, setActive] = useState(entries[0].id);

  useEffect(() => {
    const sections = entries
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    /**
     * "Which one am I in" is the last section whose top has passed under the
     * nav — not whichever happens to intersect a band. An IntersectionObserver
     * band leaves gaps between sections where nothing intersects at all, and
     * the rail then holds a stale entry.
     */
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section;
      }
      setActive(current.id as typeof active);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav aria-label="Capabilities" className="sticky top-28 hidden lg:block">
      <p className="mono-label text-slate">On this page</p>
      <ul className="mt-5 space-y-1">
        {entries.map((capability) => {
          const current = active === capability.id;
          return (
            <li key={capability.id}>
              <a
                href={`#${capability.id}`}
                aria-current={current ? "true" : undefined}
                className={cx(
                  "flex items-baseline gap-3 border-l py-2 pl-4 text-small transition-colors duration-150",
                  current
                    ? "border-teal text-ink"
                    : "border-line text-slate hover:text-ink-soft",
                )}
              >
                <span className="flex-1">{capability.title}</span>
                <span
                  className={cx(
                    "font-mono text-mono-sm",
                    capability.status === "now" ? "text-teal-ink" : "text-slate",
                  )}
                >
                  {capability.status === "now"
                    ? "now"
                    : capability.status === "roadmap"
                      ? "soon"
                      : "quoted"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="sr-only">
        Currently reading:{" "}
        {entries.find((c) => c.id === active)?.title} —{" "}
        {STATUS_LABEL[entries.find((c) => c.id === active)!.status]}
      </p>
    </nav>
  );
}
