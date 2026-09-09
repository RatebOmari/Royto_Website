/**
 * The workflow the hero canvas depicts — motion.md §1.
 *
 *      [ Message arrives ]
 *              │
 *              ▼
 *      [ Understand it ]────────► [ Log to CRM ]
 *              │
 *              ▼
 *         ‹ routine? ›
 *          │        │
 *       yes│        │no
 *          ▼        ▼
 *  [ Reply sent ]  [ Draft written ]
 *                         │
 *                         ▼
 *                 [ Waiting on you ]   ← gold, pulsing, never resolves
 *
 * Geometry is authored in a fixed 640×480 viewBox and scaled by CSS, so the
 * layout is stable at every breakpoint.
 */

export const VIEW_W = 640;
export const VIEW_H = 480;
export const NODE_W = 150;
export const NODE_H = 40;

export type NodeId =
  | "arrive"
  | "understand"
  | "crm"
  | "decide"
  | "reply"
  | "draft"
  | "waiting";

export type FlowNode = {
  id: NodeId;
  /** Centre point in viewBox units. */
  cx: number;
  cy: number;
  label: string;
  /** The diamond is drawn as a polygon rather than a rounded rect. */
  shape: "box" | "diamond";
};

export const NODES: FlowNode[] = [
  { id: "arrive", cx: 250, cy: 40, label: "Message arrives", shape: "box" },
  { id: "understand", cx: 250, cy: 140, label: "Understand it", shape: "box" },
  { id: "crm", cx: 470, cy: 140, label: "Log to CRM", shape: "box" },
  { id: "decide", cx: 250, cy: 240, label: "routine?", shape: "diamond" },
  { id: "reply", cx: 120, cy: 350, label: "Reply sent", shape: "box" },
  { id: "draft", cx: 400, cy: 350, label: "Draft written", shape: "box" },
  { id: "waiting", cx: 400, cy: 440, label: "Waiting on you", shape: "box" },
];

export type EdgeId = "e1" | "e2" | "e3" | "yes" | "no" | "e6";

export type FlowEdge = {
  id: EdgeId;
  d: string;
  to: NodeId;
  /** Order the entrance draws them in — flow order, not source order. */
  drawIndex: number;
};

export const EDGES: FlowEdge[] = [
  { id: "e1", d: "M250,60 V120", to: "understand", drawIndex: 0 },
  { id: "e2", d: "M325,140 H395", to: "crm", drawIndex: 2 },
  { id: "e3", d: "M250,160 V212", to: "decide", drawIndex: 1 },
  {
    id: "yes",
    d: "M192,240 H140 A20,20 0 0,0 120,260 V330",
    to: "reply",
    drawIndex: 3,
  },
  {
    id: "no",
    d: "M308,240 H380 A20,20 0 0,1 400,260 V330",
    to: "draft",
    drawIndex: 4,
  },
  { id: "e6", d: "M400,370 V420", to: "waiting", drawIndex: 5 },
];

/** The diamond, as a polygon. */
export const DIAMOND_POINTS = "250,212 308,240 250,268 192,240";

/**
 * The seven steps in order, for the visually-hidden figcaption. This is the
 * text alternative for the whole animation — it has to carry the same meaning
 * the motion does, including the part where the system stops and waits.
 */
export const FLOW_STEPS = [
  "A customer message arrives.",
  "The automation reads it and works out what it is asking.",
  "A copy of the message is logged to the CRM.",
  "The automation decides whether the message is routine or sensitive.",
  "If it is routine, a reply is sent automatically.",
  "If it is sensitive, a reply is drafted instead of sent.",
  "The draft waits for you to approve it. Nothing sensitive goes out on its own.",
];

export const FLOW_ARIA_LABEL =
  "An example automation workflow: a customer message arrives, is understood and logged, then either answered automatically when it is routine, or drafted and held for your approval when it is sensitive.";
