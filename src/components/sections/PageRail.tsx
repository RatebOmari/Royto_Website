"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

export type RailEntry = { id: string; label: string };

/**
 * A sticky "On this page" bar for long pages, pinned under the site nav.
 * Horizontal rather than a side rail: the 1160px container leaves no gutter
 * at common widths, and the sections behind it are full-bleed. The same
 * rule as the capability rail: current is the last section whose top has
 * passed under the nav, so there is never a gap where nothing is current.
 */
export function PageRail({ entries }: { entries: readonly RailEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const sections = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section;
      }
      setActive(current.id);
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
  }, [entries]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[72px] z-40 border-b border-line bg-paper/85 backdrop-blur-md"
    >
      <div className="container-royto flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        <span className="mono-label mr-3 shrink-0 text-slate">On this page</span>
        {entries.map((entry) => {
          const current = active === entry.id;
          return (
            <a
              key={entry.id}
              href={`#${entry.id}`}
              aria-current={current ? "true" : undefined}
              className={cx(
                "shrink-0 rounded-control px-3 py-1.5 text-small transition-colors duration-150",
                current ? "bg-teal-soft text-teal-ink" : "text-ink-soft hover:text-ink",
              )}
            >
              {entry.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
