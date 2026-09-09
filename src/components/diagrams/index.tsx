"use client";

import { anim, Diagram } from "./Diagram";
import type { CapabilityId } from "@/content/capabilities";

/* ------------------------------------------------------------------------ *
 * The six capability micro-diagrams. Each shows that specific automation in
 * motion — motion.md §3. Geometry is authored at the final frame; the
 * keyframes animate in from an offset, so the resting state is always right.
 * ------------------------------------------------------------------------ */

const DAYS = [16, 46, 76, 106, 136, 166, 196];

/** Three post cards slide into a week strip and lock into slots. */
function ContentSocial() {
  const slots = [0, 2, 4];
  return (
    <Diagram title="Three posts sliding into a weekly schedule and locking into slots on different days.">
      {DAYS.map((x, i) => (
        <rect
          key={x}
          x={x}
          y={96}
          width={28}
          height={44}
          rx={4}
          className="dg-panel dg-anim dg-fade"
          style={anim({ delay: 60 * i, duration: 400 })}
        />
      ))}
      <line x1="16" y1="88" x2="224" y2="88" className="dg-line" />
      <text x="16" y="78" className="dg-text">
        MON — SUN
      </text>
      {slots.map((slot, i) => (
        <rect
          key={slot}
          x={DAYS[slot] + 4}
          y={104}
          width={20}
          height={28}
          rx={3}
          className="dg-chip dg-anim dg-slide"
          style={anim({ delay: 500 + 260 * i, duration: 700, x: -120, y: -60 })}
        />
      ))}
      {slots.map((slot, i) => (
        <rect
          key={`stack-${slot}`}
          x={24 + i * 6}
          y={20 + i * 10}
          width={44}
          height={8}
          rx={2}
          className="dg-panel dg-anim dg-fade"
          style={anim({ delay: 120 * i, duration: 400 })}
        />
      ))}
    </Diagram>
  );
}

/** Three channels converge into one lane; one peels off to a gold "you" lane. */
function MessagingInbox() {
  const channels = [30, 62, 94];
  return (
    <Diagram title="Messages arriving from three channels, converging into one lane, most passing straight through and one peeling off to a lane marked for you.">
      {channels.map((y, i) => (
        <g key={y}>
          <rect x={12} y={y - 8} width={34} height={16} rx={3} className="dg-panel" />
          <path
            d={`M46,${y} H92 Q108,${y} 108,62 V62`}
            className="dg-line-teal dg-anim dg-draw"
            style={anim({ delay: 120 * i, duration: 700, len: 120 })}
          />
        </g>
      ))}
      <path d="M108,62 H176" className="dg-line-teal dg-anim dg-draw" style={anim({ delay: 620, duration: 500, len: 70 })} />
      <path d="M140,62 Q158,62 158,104 H176" className="dg-line-gold dg-anim dg-draw" style={anim({ delay: 900, duration: 500, len: 80 })} />
      <rect x={176} y={52} width={50} height={20} rx={4} className="dg-chip dg-anim dg-pop" style={anim({ delay: 1000, duration: 400 })} />
      <text x={186} y={65} className="dg-text">SENT</text>
      <rect x={176} y={94} width={50} height={20} rx={4} className="dg-chip-gold dg-anim dg-pop" style={anim({ delay: 1250, duration: 400 })} />
      <text x={188} y={107} className="dg-text">YOU</text>
    </Diagram>
  );
}

/** A missed call becomes a callback, which becomes a filled calendar slot. */
function CallsBookings() {
  return (
    <Diagram title="A missed call becoming a returned call, which becomes a confirmed slot filling in on a calendar.">
      <g className="dg-anim dg-fade" style={anim({ duration: 400 })}>
        <rect x={12} y={54} width={54} height={30} rx={5} className="dg-panel" />
        <path d="M26,64 l14,12 M40,64 l-14,12" className="dg-line-gold" />
        <text x={12} y={98} className="dg-text">MISSED</text>
      </g>
      <path d="M70,69 H104" className="dg-line-teal dg-anim dg-draw" style={anim({ delay: 380, duration: 400, len: 36 })} />
      <g className="dg-anim dg-pop" style={anim({ delay: 620, duration: 400 })}>
        <rect x={106} y={54} width={54} height={30} rx={5} className="dg-chip" />
        <path d="M120,76 q6,-14 20,-16" className="dg-line-teal" />
        <text x={106} y={98} className="dg-text">RETURNED</text>
      </g>
      <path d="M164,69 H182" className="dg-line-teal dg-anim dg-draw" style={anim({ delay: 900, duration: 300, len: 20 })} />
      <g className="dg-anim dg-fade" style={anim({ delay: 900, duration: 400 })}>
        <rect x={184} y={30} width={44} height={78} rx={5} className="dg-panel" />
        {[38, 56, 74, 92].map((y) => (
          <line key={y} x1={190} y1={y} x2={222} y2={y} className="dg-line" />
        ))}
      </g>
      <rect
        x={190}
        y={62}
        width={32}
        height={14}
        rx={3}
        className="dg-chip dg-anim dg-slide"
        style={anim({ delay: 1150, duration: 500, x: -30, y: 0 })}
      />
    </Diagram>
  );
}

/** Job done → request out → stars back → reply drafts beneath. */
function ReviewsReputation() {
  const star = "M0,-7 L2,-2 L7.5,-2 L3,1.5 L4.5,7 L0,3.5 L-4.5,7 L-3,1.5 L-7.5,-2 L-2,-2 Z";
  return (
    <Diagram title="A completed job sending a review request, a star rating coming back, and a reply drafting underneath it.">
      <g className="dg-anim dg-fade" style={anim({ duration: 400 })}>
        <rect x={12} y={22} width={58} height={22} rx={4} className="dg-chip" />
        <text x={20} y={36} className="dg-text">JOB DONE</text>
      </g>
      <path d="M74,33 H150" className="dg-line-teal dg-anim dg-draw" style={anim({ delay: 380, duration: 500, len: 80 })} />
      <g className="dg-anim dg-pop" style={anim({ delay: 700, duration: 400 })}>
        <rect x={152} y={22} width={76} height={22} rx={4} className="dg-panel" />
        <text x={160} y={36} className="dg-text">REQUEST SENT</text>
      </g>
      <path d="M190,48 V70" className="dg-line-teal dg-anim dg-draw" style={anim({ delay: 1000, duration: 300, len: 24 })} />
      <g>
        {/* The star is positioned by a wrapping <g>, not by its own transform
            attribute: the pop keyframes animate the CSS `transform` property,
            which overrides an SVG transform attribute outright and would drop
            every star back onto the origin. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${150 + i * 19}, 84)`}>
            <path
              d={star}
              className="dg-dot dg-anim dg-pop"
              style={anim({ delay: 1150 + i * 90, duration: 320 })}
            />
          </g>
        ))}
      </g>
      <g className="dg-anim dg-rise" style={anim({ delay: 1700, duration: 500 })}>
        <rect x={96} y={106} width={132} height={38} rx={5} className="dg-panel" />
        <text x={104} y={120} className="dg-text">REPLY DRAFTED</text>
        <line x1={104} y1={130} x2={196} y2={130} className="dg-line" />
        <line x1={104} y1={137} x2={168} y2={137} className="dg-line" />
      </g>
    </Diagram>
  );
}

/** A record moves between two tool panels; a third panel tallies. */
function BackOffice() {
  return (
    <Diagram title="A record moving from one tool into another, while a third panel tallies the running total.">
      <g className="dg-anim dg-fade" style={anim({ duration: 400 })}>
        <rect x={12} y={26} width={70} height={72} rx={6} className="dg-panel" />
        <text x={20} y={42} className="dg-text">TOOL A</text>
        {[54, 66, 78].map((y) => (
          <line key={y} x1={20} y1={y} x2={74} y2={y} className="dg-line" />
        ))}
      </g>
      <g className="dg-anim dg-fade" style={anim({ delay: 140, duration: 400 })}>
        <rect x={110} y={26} width={70} height={72} rx={6} className="dg-panel" />
        <text x={118} y={42} className="dg-text">TOOL B</text>
        {[54, 66, 78].map((y) => (
          <line key={y} x1={118} y1={y} x2={172} y2={y} className="dg-line" />
        ))}
      </g>
      <path d="M86,62 H106" className="dg-line-teal dg-anim dg-draw" style={anim({ delay: 420, duration: 400, len: 22 })} />
      <rect
        x={118}
        y={50}
        width={54}
        height={10}
        rx={2}
        className="dg-chip dg-anim dg-travel"
        style={anim({ delay: 620, duration: 800, x: -98, y: 0 })}
      />
      <g className="dg-anim dg-rise" style={anim({ delay: 1200, duration: 500 })}>
        <rect x={12} y={112} width={168} height={32} rx={5} className="dg-panel" />
        <text x={20} y={132} className="dg-text">SYNCED THIS WEEK</text>
      </g>
      <text
        x={196}
        y={134}
        className="dg-text dg-anim dg-count"
        style={{ ...anim({ delay: 1450, duration: 400 }), fill: "var(--teal)", fontSize: 14 }}
      >
        128
      </text>
    </Diagram>
  );
}

/** Loose blocks assemble into a chain, then a pulse runs through it. */
function CustomBuilds() {
  const blocks = [
    { x: 16, y: 62, fx: -14, fy: -34 },
    { x: 76, y: 62, fx: 10, fy: 40 },
    { x: 136, y: 62, fx: -8, fy: -44 },
    { x: 196, y: 62, fx: 16, fy: 30 },
  ];
  return (
    <Diagram title="Loose blocks assembling into a connected chain, with a pulse then running through it end to end.">
      {blocks.map((block, i) => (
        <rect
          key={block.x}
          x={block.x}
          y={block.y}
          width={32}
          height={32}
          rx={5}
          className="dg-panel dg-anim dg-slide"
          style={anim({ delay: 120 * i, duration: 700, x: block.fx * 3, y: block.fy * 2 })}
        />
      ))}
      {[48, 108, 168].map((x, i) => (
        <path
          key={x}
          d={`M${x},78 H${x + 28}`}
          className="dg-line-teal dg-anim dg-draw"
          style={anim({ delay: 800 + 140 * i, duration: 350, len: 30 })}
        />
      ))}
      {/* Rests at the far end of the chain: the keyframe runs offset → none,
          so the resting position must be where the pulse finishes. */}
      <circle
        r={4}
        cx={212}
        cy={78}
        className="dg-dot dg-anim dg-slide"
        style={anim({ delay: 1400, duration: 1100, x: -180, y: 0 })}
      />
    </Diagram>
  );
}

export const DIAGRAMS: Record<CapabilityId, () => React.JSX.Element> = {
  content: ContentSocial,
  messaging: MessagingInbox,
  calls: CallsBookings,
  reviews: ReviewsReputation,
  "back-office": BackOffice,
  custom: CustomBuilds,
};

/**
 * Selects a capability's diagram.
 *
 * `DIAGRAMS` is an object *containing* components. A Server Component can't
 * index into it: Next creates client references for a client module's named
 * exports, not for functions nested inside an exported object, so the lookup
 * would come back undefined at prerender time. Doing the lookup inside this
 * client leaf keeps the parent section on the server.
 */
export function CapabilityDiagram({ id }: { id: CapabilityId }) {
  const Component = DIAGRAMS[id];
  return <Component />;
}
