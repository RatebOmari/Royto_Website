import { cx } from "@/lib/utils";

/**
 * The one card treatment. On hover: lift 2px, border to teal, shadow deepens.
 * No 3D tilt — it dates the whole site instantly (motion.md §6).
 */
export function Card({
  children,
  className,
  as: Tag = "div",
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  interactive?: boolean;
}) {
  return (
    <Tag
      className={cx(
        "group/card relative flex flex-col rounded-card border border-line bg-paper-raised shadow-card",
        interactive &&
          "transition-[transform,border-color] duration-200 ease-[var(--ease-out-quad)] hover:-translate-y-0.5 hover:border-teal motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
