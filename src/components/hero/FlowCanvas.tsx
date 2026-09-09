"use client";

import { useLayoutEffect, useRef } from "react";
import {
  DIAMOND_POINTS,
  EDGES,
  FLOW_ARIA_LABEL,
  FLOW_STEPS,
  NODE_H,
  NODE_W,
  NODES,
  VIEW_H,
  VIEW_W,
  type EdgeId,
  type NodeId,
} from "./flow-graph";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { clamp } from "@/lib/utils";

/* ---------------------------------------------------------------- timing -- */

/** Entrance ends at 1.85s; the loop begins 400ms after the draw finishes. */
const LOOP_START = 2.25;
const LOOP = 9;
const RESET_START = 8.4;

/** Length of the bright segment that trails each packet. */
const TRAIL = 46;
/** Pointer drift ceiling, in viewBox units. Never more — see motion.md §1. */
const DRIFT_MAX = 6;
const DRIFT_RADIUS = 140;

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Normalised progress through [start, end], clamped to 0..1. */
const at = (t: number, start: number, end: number) =>
  clamp((t - start) / (end - start), 0, 1);

type NodeState = "idle" | "active" | "done" | "waiting";

/**
 * The beat map for one 9s cycle. `routine` alternates each loop — the graph
 * has to look like it is making a judgment, not replaying one script.
 */
function stateAt(lt: number, routine: boolean): Record<NodeId, NodeState> {
  const s: Record<NodeId, NodeState> = {
    arrive: "idle",
    understand: "idle",
    crm: "idle",
    decide: "idle",
    reply: "idle",
    draft: "idle",
    waiting: "idle",
  };
  if (lt >= RESET_START) return s;

  if (lt >= 0) s.arrive = "active";
  if (lt >= 1.1) {
    s.arrive = "done";
    s.understand = "active";
  }
  if (lt >= 2.2) {
    s.understand = "done";
    s.crm = "done";
    s.decide = "active";
  }
  if (lt >= 3.6) {
    if (routine) s.reply = "done";
    else s.draft = "done";
  }
  // The sensitive branch stops here and stays stopped. No auto-resolve.
  if (!routine && lt >= 4.8) s.waiting = "waiting";
  return s;
}

/** Which edge is carrying a packet, and how far along, at loop time `lt`. */
function packetsAt(lt: number, routine: boolean): Partial<Record<EdgeId, number>> {
  const p: Partial<Record<EdgeId, number>> = {};
  if (lt < RESET_START) {
    if (lt >= 0.3 && lt <= 1.1) p.e1 = at(lt, 0.3, 1.1);
    // The graph forks: one packet to the CRM, one down to the decision.
    if (lt >= 1.4 && lt <= 2.2) {
      p.e2 = at(lt, 1.4, 2.2);
      p.e3 = at(lt, 1.4, 2.2);
    }
    if (lt >= 2.6 && lt <= 3.6) {
      if (routine) p.yes = at(lt, 2.6, 3.6);
      else p.no = at(lt, 2.6, 3.6);
    }
    if (!routine && lt >= 4.0 && lt <= 4.8) p.e6 = at(lt, 4.0, 4.8);
  }
  return p;
}

/* -------------------------------------------------------------- component -- */

/**
 * The hero Flow Canvas — motion.md §1.
 *
 * Inline SVG rather than <canvas>: crisper at this size, themeable through
 * the same CSS variables as the rest of the site, and reachable by assistive
 * technology.
 *
 * The markup renders the *finished* graph, with the sensitive branch resolved
 * to its gold "Waiting on you" state. That is what a reduced-motion visitor
 * and a visitor without JavaScript both see, and it communicates the same
 * idea the animation does. When motion is allowed, a layout effect rewinds it
 * to blank before first paint and the loop takes over.
 */
export function FlowCanvas({ label }: { label: string }) {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef(new Map<NodeId, SVGGElement>());
  const baseRefs = useRef(new Map<EdgeId, SVGPathElement>());
  const litRefs = useRef(new Map<EdgeId, SVGPathElement>());
  const packetRefs = useRef(new Map<EdgeId, SVGGElement>());
  const checkRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGRectElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  useLayoutEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    const frame = frameRef.current;
    if (!svg || !frame) return;

    const lengths = new Map<EdgeId, number>();
    for (const edge of EDGES) {
      const path = baseRefs.current.get(edge.id);
      const lit = litRefs.current.get(edge.id);
      if (!path || !lit) continue;
      lengths.set(edge.id, path.getTotalLength());
    }
    for (const node of NODES) {
      const g = nodeRefs.current.get(node.id);
      if (g) g.style.transformOrigin = `${node.cx}px ${node.cy}px`;
    }

    /**
     * Rewind the graph to blank so the entrance has somewhere to come from.
     *
     * Deliberately *not* done on mount: a page opened in a background tab
     * would then sit on an empty frame, because the loop is paused while the
     * document is hidden. Blanking only at the moment we actually start means
     * that visitor keeps the fully-drawn static graph until the animation can
     * really run.
     */
    let rewound = false;
    const rewind = () => {
      if (rewound) return;
      rewound = true;
      for (const edge of EDGES) {
        const path = baseRefs.current.get(edge.id);
        const lit = litRefs.current.get(edge.id);
        const len = lengths.get(edge.id);
        if (!path || !lit || len === undefined) continue;
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        lit.style.strokeDasharray = `${TRAIL} ${len * 2}`;
        lit.style.opacity = "0";
      }
      for (const node of NODES) {
        const g = nodeRefs.current.get(node.id);
        if (!g) continue;
        g.style.opacity = "0";
        g.dataset.state = "idle";
      }
      if (checkRef.current) checkRef.current.style.opacity = "0";
      if (pulseRef.current) pulseRef.current.style.opacity = "0";
    };

    let raf = 0;
    let start = 0;
    // Time already elapsed when we pause, so resuming continues rather than
    // restarting the cycle.
    let banked = 0;
    let running = false;
    const drift = new Map<NodeId, { x: number; y: number }>();
    for (const node of NODES) drift.set(node.id, { x: 0, y: 0 });

    const frameFn = (now: number) => {
      if (!start) start = now;
      const t = banked + (now - start) / 1000;

      /* ---- entrance: edges draw in flow order, nodes land behind them ---- */
      for (const edge of EDGES) {
        const path = baseRefs.current.get(edge.id);
        const len = lengths.get(edge.id);
        if (!path || len === undefined) continue;
        const p = easeOutExpo(
          at(t, edge.drawIndex * 0.08, edge.drawIndex * 0.08 + 1.2),
        );
        path.style.strokeDashoffset = `${len * (1 - p)}`;
      }
      for (const node of NODES) {
        const g = nodeRefs.current.get(node.id);
        if (!g) continue;
        const incoming = EDGES.find((e) => e.to === node.id);
        const appearAt = incoming ? incoming.drawIndex * 0.08 + 0.95 : 0;
        const p = easeOutExpo(at(t, appearAt, appearAt + 0.5));
        const d = drift.get(node.id)!;
        g.style.opacity = `${p}`;
        g.style.transform = `translate(${d.x}px, ${d.y}px) scale(${0.94 + 0.06 * p})`;
      }

      /* ---- the loop ---- */
      if (t >= LOOP_START) {
        const elapsed = t - LOOP_START;
        const cycle = Math.floor(elapsed / LOOP);
        const lt = elapsed % LOOP;
        const routine = cycle % 2 === 0;
        const fade = 1 - at(lt, RESET_START, LOOP);

        const states = stateAt(lt, routine);
        for (const node of NODES) {
          const g = nodeRefs.current.get(node.id);
          if (g && g.dataset.state !== states[node.id]) {
            g.dataset.state = states[node.id];
          }
        }

        const packets = packetsAt(lt, routine);
        for (const edge of EDGES) {
          const lit = litRefs.current.get(edge.id);
          const packet = packetRefs.current.get(edge.id);
          const path = baseRefs.current.get(edge.id);
          const len = lengths.get(edge.id);
          if (!lit || !packet || !path || len === undefined) continue;

          const p = packets[edge.id];
          if (p === undefined) {
            lit.style.opacity = "0";
            packet.style.opacity = "0";
            continue;
          }
          // A bright segment trails the packet: the edge lights up behind it.
          lit.style.strokeDashoffset = `${TRAIL - p * len}`;
          lit.style.opacity = `${fade}`;
          const point = path.getPointAtLength(p * len);
          packet.style.transform = `translate(${point.x}px, ${point.y}px)`;
          packet.style.opacity = `${fade}`;
        }

        // The checkmark draws over 200ms once a routine reply is sent.
        if (checkRef.current) {
          const drawn = routine ? at(lt, 3.6, 3.8) : 0;
          checkRef.current.style.opacity = `${routine ? fade : 0}`;
          checkRef.current.style.strokeDashoffset = `${26 * (1 - drawn)}`;
        }
        // Gold, 2s pulse, and it does not resolve.
        if (pulseRef.current) {
          const on = !routine && lt >= 4.8;
          const phase = on ? (Math.sin(((lt - 4.8) / 2) * Math.PI * 2) + 1) / 2 : 0;
          pulseRef.current.style.opacity = `${on ? 0.15 + 0.45 * phase : 0}`;
        }
      }

      /* ---- pointer: the graph notices you, up to 6px ---- */
      if (pointer.current.active) {
        for (const node of NODES) {
          const g = nodeRefs.current.get(node.id);
          const d = drift.get(node.id)!;
          if (!g) continue;
          const dx = pointer.current.x - node.cx;
          const dy = pointer.current.y - node.cy;
          const dist = Math.hypot(dx, dy);
          const pull = dist < DRIFT_RADIUS ? 1 - dist / DRIFT_RADIUS : 0;
          const tx = dist > 0 ? (dx / dist) * DRIFT_MAX * pull : 0;
          const ty = dist > 0 ? (dy / dist) * DRIFT_MAX * pull : 0;
          d.x += (tx - d.x) * 0.12;
          d.y += (ty - d.y) * 0.12;
        }
      } else {
        for (const d of drift.values()) {
          d.x += -d.x * 0.12;
          d.y += -d.y * 0.12;
        }
      }

      raf = requestAnimationFrame(frameFn);
    };

    const play = () => {
      if (running) return;
      rewind();
      running = true;
      start = 0;
      for (const packet of packetRefs.current.values()) {
        packet.style.willChange = "transform";
      }
      raf = requestAnimationFrame(frameFn);
    };
    const pause = () => {
      if (!running) return;
      running = false;
      banked += start ? (performance.now() - start) / 1000 : 0;
      cancelAnimationFrame(raf);
      // Never leave will-change standing.
      for (const packet of packetRefs.current.values()) {
        packet.style.willChange = "";
      }
    };

    // Pause off-screen and when the tab is hidden.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) play();
        else pause();
      },
      { threshold: 0 },
    );
    observer.observe(frame);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (frame.getBoundingClientRect().bottom > 0) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Desktop pointers only.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      pointer.current = { x: px * VIEW_W, y: py * VIEW_H, active: true };
      frame.style.setProperty("--mx", `${px * 100}%`);
      frame.style.setProperty("--my", `${py * 100}%`);
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    if (fine) {
      frame.addEventListener("pointermove", onMove);
      frame.addEventListener("pointerleave", onLeave);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (fine) {
        frame.removeEventListener("pointermove", onMove);
        frame.removeEventListener("pointerleave", onLeave);
      }
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  /* The static end state, also the SSR markup. */
  const staticState: Record<NodeId, NodeState> = {
    arrive: "done",
    understand: "done",
    crm: "done",
    decide: "active",
    reply: "idle",
    draft: "done",
    waiting: "waiting",
  };
  const staticLit = new Set<EdgeId>(["e1", "e2", "e3", "no", "e6"]);

  return (
    <figure className="relative m-0">
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-panel border border-line bg-paper-raised shadow-card"
      >
        <div aria-hidden="true" className="blueprint absolute inset-0 opacity-[0.25]" />
        <div aria-hidden="true" className="flow-highlight absolute inset-0" />

        <p className="mono-label absolute right-4 top-4 z-10 text-slate">
          {label}
        </p>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={FLOW_ARIA_LABEL}
          className="relative block w-full"
        >
          {EDGES.map((edge) => (
            <g key={edge.id}>
              <path
                ref={(el) => {
                  if (el) baseRefs.current.set(edge.id, el);
                }}
                d={edge.d}
                className="flow-edge-base"
              />
              <path
                ref={(el) => {
                  if (el) litRefs.current.set(edge.id, el);
                }}
                d={edge.d}
                className="flow-edge-lit"
                style={{ opacity: staticLit.has(edge.id) ? 1 : 0 }}
              />
            </g>
          ))}

          <text x="150" y="232" className="flow-branch-label">
            yes
          </text>
          <text x="322" y="232" className="flow-branch-label">
            no
          </text>

          {NODES.map((node) => (
            <g
              key={node.id}
              ref={(el) => {
                if (el) nodeRefs.current.set(node.id, el);
              }}
              className="flow-node"
              data-state={staticState[node.id]}
            >
              {node.shape === "diamond" ? (
                <polygon points={DIAMOND_POINTS} className="flow-shape" />
              ) : (
                <rect
                  x={node.cx - NODE_W / 2}
                  y={node.cy - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  className="flow-shape"
                />
              )}
              {node.id === "waiting" ? (
                <rect
                  ref={pulseRef}
                  x={node.cx - NODE_W / 2 - 5}
                  y={node.cy - NODE_H / 2 - 5}
                  width={NODE_W + 10}
                  height={NODE_H + 10}
                  rx={12}
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth={1}
                  style={{ opacity: 0.3 }}
                />
              ) : null}
              <text
                x={node.cx}
                y={node.cy + 4}
                textAnchor="middle"
                className="flow-label"
              >
                {node.label}
              </text>
              {node.id === "reply" ? (
                <path
                  ref={checkRef}
                  d="M58,350 l6,7 l13,-15"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={26}
                  style={{ opacity: 0 }}
                />
              ) : null}
            </g>
          ))}

          {EDGES.map((edge) => (
            <g
              key={`packet-${edge.id}`}
              ref={(el) => {
                if (el) packetRefs.current.set(edge.id, el);
              }}
              style={{ opacity: 0 }}
            >
              <circle r={9} fill="var(--teal)" opacity={0.16} />
              <circle r={4.5} fill="var(--teal)" />
            </g>
          ))}
        </svg>
      </div>

      <figcaption className="sr-only">
        <p>{FLOW_ARIA_LABEL}</p>
        <ol>
          {FLOW_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
