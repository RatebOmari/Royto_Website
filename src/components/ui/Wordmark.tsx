import { cx } from "@/lib/utils";

/**
 * The wordmark — lowercase `royto` in Archivo 800 with the period in teal.
 * The period is the mark: never a different colour, never removed, never
 * separated from the word. See brand.md, "The mark".
 */
export function Wordmark({
  className,
  periodClassName,
}: {
  className?: string;
  periodClassName?: string;
}) {
  return (
    <span
      className={cx(
        "font-display font-extrabold tracking-[-0.03em] text-ink",
        className,
      )}
    >
      royto
      <span className={cx("text-teal", periodClassName)}>.</span>
    </span>
  );
}

/**
 * Product lockup — set as `royto. social` in the same wordmark.
 * Products do not get logos of their own.
 */
export function ProductWordmark({
  product,
  className,
}: {
  product: string;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "font-display font-extrabold tracking-[-0.03em] text-ink",
        className,
      )}
    >
      royto<span className="text-teal">.</span>{" "}
      <span className="font-semibold">{product}</span>
    </span>
  );
}
