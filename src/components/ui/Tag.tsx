import { cx } from "@/lib/utils";

/**
 * Mono state tag. `tone` carries meaning, not decoration:
 *
 * - `teal`   — delivering now, handled, done
 * - `gold`   — a human is needed. Nothing else, ever. Its scarcity is what
 *              makes it legible (brand.md).
 * - `slate`  — roadmap, neutral, not yet buyable
 */
export function Tag({
  children,
  tone = "slate",
  className,
}: {
  children: React.ReactNode;
  tone?: "teal" | "gold" | "slate";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "mono-label inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-control px-2 py-1",
        tone === "teal" && "bg-teal-soft text-teal-ink",
        tone === "gold" && "bg-gold-soft text-gold",
        tone === "slate" && "border border-line text-slate",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          "size-1.5 rounded-full",
          tone === "teal" && "bg-teal",
          tone === "gold" && "bg-gold",
          tone === "slate" && "bg-slate",
        )}
      />
      {children}
    </span>
  );
}
