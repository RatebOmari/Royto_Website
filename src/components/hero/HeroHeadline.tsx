import { stagger } from "@/lib/motion";

/**
 * The headline reveal — motion.md §2. Split by **line**, never by character:
 * per-character scrambles are the tell of a generated site, lines read as
 * typography. Each line sits in an overflow-hidden wrapper and rises from
 * 110% of its own height, 800ms easeOutExpo, 60ms apart.
 *
 * The lines are *authored* rather than measured at runtime. The headline is a
 * single fixed string and the column that holds it is width-constrained, so
 * the break is deterministic — and authoring it means the reveal is pure CSS
 * and plays on first paint instead of waiting for hydration. That is the
 * difference between the hero appearing at 1s and at 3.4s on a mid-range
 * phone. Change the copy and you change the lines, together, in one place.
 */
export function HeroHeadline({
  lines,
  text,
  className,
  delay = 0,
}: {
  lines: readonly string[];
  /** The full headline, for assistive technology and for copy-paste. */
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <h1 className={className}>
      <span className="sr-only">{text}</span>
      {lines.map((line, index) => (
        <span key={line} aria-hidden="true" className="block overflow-hidden">
          <span
            className="hero-line"
            style={
              {
                "--hero-delay": `${delay + index * stagger.line * 1000}ms`,
              } as React.CSSProperties
            }
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
