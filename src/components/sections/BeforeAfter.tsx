"use client";

import { animate, motion, useMotionValue, type AnimationPlaybackControlsWithThen } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  beforeAfter,
  scrubTasks,
  TAG_LABEL,
  type ScrubRow,
} from "@/content/home-sections";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { clamp, cx } from "@/lib/utils";

const HINT_KEY = "royto-scrub-hint";

function TaskTag({ tag }: { tag: ScrubRow["tag"] }) {
  return (
    <span
      className={cx(
        "mono-label shrink-0 rounded-control px-2 py-0.5",
        tag === "handled" && "bg-teal-soft text-teal-ink",
        // Gold on both sides is deliberate: Royto removes the work around
        // your judgment, not the judgment.
        tag === "waiting" && "bg-gold-soft text-gold",
        tag === "open" && "bg-gold-soft text-gold",
        tag === "missed" && "border border-line-strong text-slate line-through",
      )}
    >
      {TAG_LABEL[tag]}
    </span>
  );
}

function Panel({
  title,
  rows,
  loose,
}: {
  title: string;
  rows: ScrubRow[];
  /** The "by hand" side sits slightly out of alignment. It should feel like a bad evening. */
  loose?: boolean;
}) {
  return (
    <div className="flex h-full flex-col bg-paper-raised p-6 md:p-8">
      <p className="mono-label text-slate">{title}</p>
      <ul className="mt-6 space-y-2.5">
        {rows.map((row, index) => (
          <li
            key={`${row.time}-${row.task}`}
            className="flex items-center gap-3 rounded-control border border-line px-3 py-2.5"
            style={
              loose
                ? { marginLeft: [0, 5, 2, 7, 1, 4][index % 6] }
                : undefined
            }
          >
            <span className="tabular shrink-0 font-mono text-mono-sm text-slate">
              {row.time}
            </span>
            <span className="min-w-0 flex-1 truncate text-small text-ink-soft">
              {row.task}
            </span>
            <TaskTag tag={row.tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BeforeAfter() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);
  const x = useMotionValue(50);
  const hint = useRef<AnimationPlaybackControlsWithThen | null>(null);

  /**
   * The hint keeps driving the divider for 1.4s. If the visitor grabs it or
   * presses a key in that window, stop the hint immediately — an animation
   * that fights the user is worse than no hint at all.
   */
  const stopHint = useCallback(() => {
    hint.current?.stop();
    hint.current = null;
  }, []);

  // Keep React state and the motion value in step; the clip-path reads state.
  useEffect(() => {
    const unsubscribe = x.on("change", (value) => setPosition(value));
    return () => unsubscribe();
  }, [x]);

  /**
   * On first view the divider swings 50 → 72 → 50 once, to signal it can be
   * dragged. Once per session only, and never under reduced motion.
   */
  useEffect(() => {
    if (reduced) return;
    const node = containerRef.current;
    if (!node) return;
    try {
      if (sessionStorage.getItem(HINT_KEY)) return;
    } catch {
      // Blocked storage: play the hint, just don't remember that we did.
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          sessionStorage.setItem(HINT_KEY, "1");
        } catch {
          /* not fatal */
        }
        hint.current = animate(x, [50, 72, 50], {
          duration: 1.4,
          ease: ease.inOutQuart,
          times: [0, 0.5, 1],
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, x]);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      x.set(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
    },
    [x],
  );

  // Pointer events, not mouse events — one code path for mouse, pen and touch.
  const onPointerDown = (event: React.PointerEvent) => {
    stopHint();
    dragging.current = true;
    (event.target as Element).setPointerCapture?.(event.pointerId);
    setFromClientX(event.clientX);
  };
  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(event.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    stopHint();
    const step = 5;
    const map: Record<string, number> = {
      ArrowLeft: -step,
      ArrowRight: step,
      ArrowDown: -step,
      ArrowUp: step,
    };
    if (event.key in map) {
      event.preventDefault();
      x.set(clamp(x.get() + map[event.key], 0, 100));
    } else if (event.key === "Home") {
      event.preventDefault();
      x.set(0);
    } else if (event.key === "End") {
      event.preventDefault();
      x.set(100);
    }
  };

  return (
    <section className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={beforeAfter.eyebrow}
          heading={beforeAfter.heading}
        />

        <Reveal delay={0.1} className="mt-10">
          <p className="mono-label text-slate">Example workflow</p>
        </Reveal>

        <Reveal delay={0.12} className="mt-4">
          <div
            ref={containerRef}
            className="relative select-none overflow-hidden rounded-panel border border-line shadow-card"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Bottom layer: with Royto. */}
            <Panel
              title={beforeAfter.withRoyto.title}
              rows={scrubTasks.withRoyto}
            />

            {/* Top layer: by hand, clipped from the left by the divider. */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Panel title={beforeAfter.byHand.title} rows={scrubTasks.byHand} loose />
            </div>

            {/* The divider. */}
            <div
              className="absolute inset-y-0 w-px bg-line-strong"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            />
            <motion.div
              role="slider"
              tabIndex={0}
              aria-label="Compare doing this work by hand with Royto running it"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              aria-valuetext={`${Math.round(position)}% by hand`}
              data-cursor="drag"
              onPointerDown={onPointerDown}
              onKeyDown={onKeyDown}
              className="absolute top-1/2 z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-line-strong bg-paper-raised shadow-card"
              style={{ left: `${position}%` }}
            >
              <span aria-hidden="true" className="font-mono text-mono-sm text-slate">
                ⇄
              </span>
            </motion.div>
          </div>
        </Reveal>

        {/* Non-drag fallback: the control is fully operable without pointing. */}
        <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center gap-3">
          <p className="mono-label text-slate">Drag, or use arrow keys</p>
          <div className="flex gap-2">
            {[
              { label: "By hand", value: 100 },
              { label: "Split", value: 50 },
              { label: "With Royto", value: 0 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  stopHint();
                  x.set(preset.value);
                }}
                className="rounded-control border border-line px-3 py-1.5 font-mono text-mono-sm text-slate transition-colors duration-150 hover:border-teal hover:text-teal-ink"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
