"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { included } from "@/content/home-sections";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The ✓ and ✕ marks draw in as SVG paths rather than fading — motion.md §6.
 * 250ms, staggered 60ms down each column.
 */
function Mark({ kind }: { kind: "yes" | "no" }) {
  const reduced = useReducedMotion();
  const d = kind === "yes" ? "M2,7 l4,4 l8,-9" : "M3,3 l10,10 M13,3 l-10,10";
  const length = kind === "yes" ? 20 : 30;

  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-0.5 size-4 shrink-0"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={kind === "yes" ? "var(--teal)" : "var(--slate)"}
    >
      {reduced ? (
        <path d={d} />
      ) : (
        <motion.path
          d={d}
          strokeDasharray={length}
          initial={{ strokeDashoffset: length }}
          variants={{
            hidden: { strokeDashoffset: length },
            visible: {
              strokeDashoffset: 0,
              transition: { duration: 0.25, ease: ease.outQuad },
            },
          }}
        />
      )}
    </svg>
  );
}

function Column({
  heading,
  items,
  kind,
}: {
  heading: string;
  items: readonly string[];
  kind: "yes" | "no";
}) {
  const reduced = useReducedMotion();
  return (
    <div>
      <h3 className="mono-label text-slate">{heading}</h3>
      <motion.ul
        className="mt-6 space-y-4"
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger.line } },
        }}
      >
        {items.map((item) => (
          <motion.li
            key={item}
            className="flex gap-3 text-small text-ink-soft"
            variants={
              reduced
                ? undefined
                : {
                    hidden: { opacity: 0, y: 8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: duration.base, ease: ease.outExpo },
                    },
                  }
            }
          >
            <Mark kind={kind} />
            <span className={kind === "no" ? "text-slate" : undefined}>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export function Included() {
  return (
    <section className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={included.eyebrow}
          heading={included.heading}
          intro={included.intro}
        />
        <Reveal delay={0.18} className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <Column heading="Included" items={included.yes} kind="yes" />
          <Column heading="Not included" items={included.no} kind="no" />
        </Reveal>
      </div>
    </section>
  );
}
