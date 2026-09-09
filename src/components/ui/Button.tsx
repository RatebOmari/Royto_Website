"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { cx } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-control px-5 py-3 text-small font-medium " +
  "transition-colors duration-150 ease-[var(--ease-out-quad)] active:scale-[0.98] motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  // The teal fill sweeps in from the left on hover; the label crosses to paper.
  primary:
    "border border-teal bg-teal text-paper hover:text-paper",
  ghost:
    "border border-line-strong text-ink hover:border-teal hover:text-teal-ink",
};

function Inner({
  children,
  variant,
  arrow,
}: {
  children: ReactNode;
  variant: Variant;
  arrow: boolean;
}) {
  return (
    <>
      {variant === "primary" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-teal-ink transition-transform duration-300 ease-[var(--ease-out-quad)] group-hover:scale-x-100 motion-reduce:transition-none"
        />
      ) : null}
      <span className="relative">{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="relative transition-transform duration-300 ease-[var(--ease-out-quad)] group-hover:translate-x-[3px] motion-reduce:transition-none"
        >
          →
        </span>
      ) : null}
    </>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
  ...rest
}: ButtonLinkProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const content = (
    <Inner variant={variant} arrow={arrow}>
      {children}
    </Inner>
  );
  const classes = cx(base, variants[variant], className);

  return (
    <Magnetic>
      {external ? (
        <a href={href} className={classes}>
          {content}
        </a>
      ) : (
        <Link href={href} className={classes} {...rest}>
          {content}
        </Link>
      )}
    </Magnetic>
  );
}

export function Button({
  children,
  variant = "primary",
  arrow = false,
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
} & ComponentProps<"button">) {
  return (
    <Magnetic>
      <button className={cx(base, variants[variant], className)} {...rest}>
        <Inner variant={variant} arrow={arrow}>
          {children}
        </Inner>
      </button>
    </Magnetic>
  );
}
