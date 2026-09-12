import { FlowCanvas } from "@/components/hero/FlowCanvas";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { ButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import { foundingBar, hero } from "@/content/home";

/**
 * The homepage hero — a Server Component. Nothing here waits on hydration:
 * the entrance is CSS, so the headline, sub and CTAs paint on the first frame
 * the browser can manage. Only the Flow Canvas is a client island.
 *
 * The blueprint grid appears here and behind the final CTA only (motion.md
 * §7), never across the whole page.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(120%_80%_at_50%_0%,#000,transparent_75%)]"
      />

      <div className="container-royto relative grid gap-16 pb-24 pt-[136px] md:pb-32 md:pt-[168px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
        <div>
          <p className="mono-label hero-in text-slate">{hero.eyebrow}</p>

          <HeroHeadline
            text={hero.headline}
            lines={hero.headlineLines}
            delay={120}
            className="mt-6 max-w-[22ch] text-hero-long font-extrabold text-ink"
          />

          {/* The sub lands 300ms after the last headline line. */}
          <p
            className="hero-in mt-6 measure-lede text-lede text-ink-soft"
            style={{ "--hero-delay": "1160ms" } as React.CSSProperties}
          >
            {hero.sub}{" "}
            <Link
              href={hero.escape.href}
              className="whitespace-nowrap font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink"
            >
              {hero.escape.label} <span aria-hidden="true">→</span>
            </Link>
          </p>

          <div
            className="hero-in mt-9 flex flex-wrap gap-3"
            style={{ "--hero-delay": "1310ms" } as React.CSSProperties}
          >
            <ButtonLink href={hero.primaryCta.href} arrow>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          {/* The founding-client offer is the trust line — stated here, once. */}
          <p
            className="hero-in mt-8 max-w-[54ch] border-l border-teal pl-4 text-small text-ink-soft"
            style={{ "--hero-delay": "1460ms" } as React.CSSProperties}
          >
            <strong className="font-semibold text-ink">{foundingBar.lead}</strong>{" "}
            {foundingBar.body}{" "}
            <Link
              href={foundingBar.link.href}
              className="whitespace-nowrap font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink"
            >
              {foundingBar.link.label} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>

        <div
          className="hero-in"
          style={{ "--hero-delay": "500ms" } as React.CSSProperties}
        >
          <FlowCanvas label={hero.canvasLabel} />
        </div>
      </div>
    </section>
  );
}
