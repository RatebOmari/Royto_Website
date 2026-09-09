"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Custom cursor — motion.md §2.
 *
 * A 10px teal dot that lerps behind the real pointer, expanding to a 48px
 * ring with a label over interactive elements. The native cursor is left
 * visible: this trails it rather than replacing it, so nothing is lost if the
 * effect fails and pointer accuracy is unaffected.
 *
 * Deliberately not `mix-blend-mode: difference` — that is the stock effect
 * everyone ships. Brand teal at low opacity instead.
 *
 * Desktop pointers only, off under reduced motion, and driven by one rAF
 * writing to refs. Never re-renders React.
 */
function CursorInner() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const current = { x: pointer.x, y: pointer.y };
    let raf = 0;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='slider'], [data-cursor]",
      );
      const label =
        target?.dataset.cursor ??
        (target?.tagName === "A" ? "open" : target ? "view" : "");
      dot.dataset.active = target ? "1" : "0";
      if (labelRef.current && labelRef.current.textContent !== label) {
        labelRef.current.textContent = label;
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const frame = () => {
      // Lerp behind the real pointer.
      current.x += (pointer.x - current.x) * 0.18;
      current.y += (pointer.y - current.y) * 0.18;
      dot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={dotRef} aria-hidden="true" className="royto-cursor" data-active="0">
      <span ref={labelRef} className="royto-cursor-label" />
    </div>
  );
}

export function Cursor() {
  const reduced = useReducedMotion();
  const fine = usePointerFine();
  if (reduced || !fine) return null;
  return <CursorInner />;
}
