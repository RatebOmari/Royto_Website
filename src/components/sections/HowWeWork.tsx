"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howWeWork } from "@/content/home-sections";
import { stagger } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { clamp, cx } from "@/lib/utils";

/**
 * Motion compiles scroll-linked transforms into native scroll-driven WAAPI
 * animations where the browser supports them, and WAAPI keyframe offsets must
 * sit inside [0, 1] and never decrease. Input ranges are authored with a
 * little overshoot at each end for a softer cross-fade, so clamp them here
 * rather than hand-tuning every window.
 */
function offsets(values: number[]): number[] {
  let previous = 0;
  return values.map((value) => {
    previous = Math.max(previous, clamp(value, 0, 1));
    return previous;
  });
}

const TASKS = [
  { label: "Answer DMs", hours: "4h" },
  { label: "Write posts", hours: "3h" },
  { label: "Chase invoices", hours: "2h" },
  { label: "Copy leads over", hours: "2h" },
  { label: "Book appointments", hours: "1h" },
];
/** The three the audit rings as candidates. */
const PICKED = [0, 2, 3];

/**
 * One row of the audit list. Rows the audit picks detach and travel into the
 * assembled flow; the rest fade out. Its own component so each row's
 * `useTransform` calls sit at the top level of a component, not in a loop.
 */
function ArtifactTask({
  task,
  index,
  progress,
}: {
  task: (typeof TASKS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const picked = PICKED.indexOf(index);
  const y = 14 + index * 34;

  const hoursOpacity = useTransform(progress, [0.04, 0.16], [0, 1]);
  const ringOpacity = useTransform(progress, [0.18, 0.3], [0, 1]);
  const dropOpacity = useTransform(progress, [0.34, 0.44], [1, 0]);
  const travelY = useTransform(
    progress,
    [0.36, 0.58],
    [0, picked === -1 ? 0 : 96 + picked * 40 - y],
  );
  const travelX = useTransform(progress, [0.36, 0.58], [0, picked === -1 ? 0 : 26]);

  return (
    <motion.g style={picked === -1 ? { opacity: dropOpacity } : undefined}>
      <motion.g style={picked === -1 ? undefined : { y: travelY, x: travelX }}>
        <rect
          x={0}
          y={y}
          width={200}
          height={26}
          rx={5}
          fill={picked === -1 ? "var(--paper)" : "var(--teal-soft)"}
          stroke="var(--line)"
          strokeWidth={1}
        />
        <text
          x={12}
          y={y + 17}
          fill="var(--ink-soft)"
          className={cx("text-[11px]")}
          style={{ fontFamily: "var(--face-sans)" }}
        >
          {task.label}
        </text>
        <motion.text
          x={188}
          y={y + 17}
          textAnchor="end"
          fill="var(--slate)"
          className="text-[10px]"
          style={{ opacity: hoursOpacity, fontFamily: "var(--face-mono)" }}
        >
          {task.hours}
        </motion.text>
        {picked !== -1 ? (
          <motion.rect
            x={-4}
            y={y - 4}
            width={208}
            height={34}
            rx={8}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.25}
            style={{ opacity: ringOpacity }}
          />
        ) : null}
      </motion.g>
    </motion.g>
  );
}

/**
 * The evolving artifact — motion.md §5. One SVG carried through all three
 * stages rather than swapped, driven continuously by scroll progress so the
 * scrub is sub-pixel rather than stepped.
 */
function Artifact({ progress }: { progress: MotionValue<number> }) {
  const linkDraw = useTransform(progress, [0.5, 0.66], [64, 0]);
  const packetY = useTransform(progress, [0.72, 0.9], [104, 216]);
  const packetOpacity = useTransform(progress, [0.7, 0.74], [0, 1]);
  const summaryY = useTransform(progress, [0.78, 0.94], [18, 0]);
  const summaryOpacity = useTransform(progress, [0.78, 0.94], [0, 1]);

  return (
    <svg viewBox="0 0 320 300" aria-hidden="true" className="w-full">
      {TASKS.map((task, index) => (
        <ArtifactTask
          key={task.label}
          task={task}
          index={index}
          progress={progress}
        />
      ))}

      {[0, 1].map((i) => (
        <motion.path
          key={i}
          d={`M126,${122 + i * 40} V${136 + i * 40}`}
          stroke="var(--teal)"
          strokeWidth={1.5}
          fill="none"
          strokeDasharray={64}
          style={{ strokeDashoffset: linkDraw }}
        />
      ))}

      <motion.circle
        r={4}
        cx={126}
        fill="var(--teal)"
        style={{ opacity: packetOpacity, cy: packetY }}
      />

      <motion.g style={{ opacity: summaryOpacity, y: summaryY }}>
        <rect
          x={0}
          y={244}
          width={300}
          height={48}
          rx={8}
          fill="var(--paper-raised)"
          stroke="var(--line)"
        />
        <text
          x={14}
          y={262}
          fill="var(--slate)"
          className="text-[9px] tracking-[0.09em]"
          style={{ fontFamily: "var(--face-mono)" }}
        >
          MONTHLY SUMMARY — EXAMPLE
        </text>
        <text
          x={14}
          y={280}
          fill="var(--ink)"
          className="text-[12px]"
          style={{ fontFamily: "var(--face-sans)" }}
        >
          3 automations running · 1 waiting on you
        </text>
      </motion.g>
    </svg>
  );
}

function RailStop({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const active = useTransform(
    progress,
    offsets([index / 3 - 0.02, index / 3 + 0.02]),
    [0, 1],
  );
  return (
    <div className="absolute -left-[5px]" style={{ top: `${(index / 2) * 100}%` }}>
      <div className="size-[11px] rounded-full border border-line bg-paper" />
      <motion.div
        className="absolute inset-0 m-[2px] rounded-full bg-teal"
        style={{ opacity: active }}
      />
    </div>
  );
}

/** Stages cross-fade: outgoing leaves at -12px, incoming arrives from +12px. */
function StageText({
  stage,
  index,
  progress,
}: {
  stage: (typeof howWeWork.stages)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / 3;
  const end = (index + 1) / 3;
  const keyframes = offsets([start - 0.06, start + 0.04, end - 0.04, end + 0.06]);
  const opacity = useTransform(progress, keyframes, [0, 1, 1, 0]);
  const y = useTransform(progress, keyframes, [12, 0, 0, -12]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity, y }}>
      <p className="mono-label text-teal-ink">{stage.number}</p>
      <h3 className="mt-4 text-h2 font-extrabold text-ink">{stage.title}</h3>
      <p className="mt-5 measure text-body text-ink-soft">{stage.body}</p>
    </motion.div>
  );
}

/** Desktop: the section pins for 300vh of scroll. */
function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const railFill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-royto grid w-full grid-cols-[auto_1fr_minmax(0,380px)] items-center gap-12">
          <div className="relative h-64 w-px bg-line">
            <motion.div
              className="absolute inset-0 origin-top bg-teal"
              style={{ scaleY: railFill }}
            />
            {howWeWork.stages.map((stage, index) => (
              <RailStop
                key={stage.number}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <div className="relative min-h-[240px]">
            {howWeWork.stages.map((stage, index) => (
              <StageText
                key={stage.number}
                stage={stage}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <div className="rounded-panel border border-line bg-paper-raised p-6 shadow-card">
            <Artifact progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile and tablet: three stacked cards. Pinning on a phone fights the user
 * for control of the scroll; don't.
 */
function Stacked() {
  return (
    <Reveal as="ol" stagger={stagger.card} className="mt-12 grid gap-4 md:grid-cols-3">
      {howWeWork.stages.map((stage, index) => (
        <RevealItem as="li" key={stage.number} index={index}>
          <Card className="h-full p-6">
            <p className="mono-label text-teal-ink">{stage.number}</p>
            <h3 className="mt-4 text-h3 font-semibold text-ink">{stage.title}</h3>
            <p className="mt-3 text-small text-ink-soft">{stage.body}</p>
          </Card>
        </RevealItem>
      ))}
    </Reveal>
  );
}

export function HowWeWork() {
  const reduced = useReducedMotion();
  // Gate on an actual media query rather than `hidden lg:block`. With CSS
  // alone both branches mount, so a phone paid for the pinned sequence's
  // scroll subscription and its twenty scroll transforms without ever
  // seeing it.
  const wide = useMediaQuery("(min-width: 1024px)");
  const pinned = wide && !reduced;

  return (
    <section id="how-we-work" className="border-b border-line">
      <div className="container-royto pt-24 md:pt-32">
        <SectionHeading
          eyebrow={howWeWork.eyebrow}
          heading={howWeWork.heading}
          intro={howWeWork.intro}
        />
      </div>

      {/* Reduced motion unpins everywhere: three static cards. */}
      {pinned ? (
        <Pinned />
      ) : (
        <div className="container-royto pb-24 md:pb-32">
          <Stacked />
        </div>
      )}
    </section>
  );
}
