import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PackageSummaryCard } from "@/components/sections/PackagesRow";
import { packages } from "@/content/packages";

/**
 * The strip at the foot of every package page: the other two packages, the
 * hub, and custom builds. A package page should never be a dead end for a
 * visitor who is comparing.
 */
export function MorePackages({ current }: { current: string }) {
  const others = packages.filter((item) => item.href !== current);
  return (
    <section className="border-t border-line bg-paper-raised">
      <div className="container-royto py-16 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="text-h3 font-semibold text-ink">More packages</h2>
            <p className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-mono-sm uppercase tracking-[0.09em]">
              <Link href="/packages" className="text-teal-ink">
                All packages <span aria-hidden="true">→</span>
              </Link>
              <Link href="/pricing" className="text-teal-ink">
                Custom builds <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </Reveal>
        <Reveal as="ul" delay={0.08} className="mt-8 grid gap-4 md:grid-cols-2">
          {others.map((item) => (
            <li key={item.href}>
              <PackageSummaryCard item={item} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
