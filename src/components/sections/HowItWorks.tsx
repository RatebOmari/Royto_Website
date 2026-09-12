import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { AuditMapExample } from "@/components/sections/AuditMapExample";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howWeWork } from "@/content/home-sections";
import { tiers } from "@/content/pricing";
import { stagger } from "@/lib/motion";

/**
 * Audit → Build → Run, each stage with its price. One section where there
 * used to be two: the pinned "How we work" sequence and the homepage Pricing
 * grid described the same three things five sections apart.
 *
 * Static on purpose. The pinned version spent 2,600px of scroll on 137 words
 * and cross-faded step text over itself mid-scroll.
 */
export function HowItWorks() {
  return (
    <section id="how-we-work" className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={howWeWork.eyebrow}
          heading={howWeWork.heading}
          intro={howWeWork.intro}
        />

        <Reveal
          as="ol"
          stagger={stagger.card}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {howWeWork.stages.map((stage, index) => {
            // The stages and the agency tiers are the same three things, in
            // the same order; the price comes from the one place it is defined.
            const tier = tiers[index];
            return (
              <RevealItem as="li" key={stage.number} index={index}>
                <Card className={`h-full p-7 ${tier.featured ? "border-teal" : ""}`}>
                  <p className="mono-label text-teal-ink">
                    {stage.number} · {stage.title}
                  </p>
                  <p className="mt-4 font-display text-[26px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                    {tier.price}
                  </p>
                  <p className="mt-5 text-small text-ink-soft">{stage.body}</p>
                </Card>
              </RevealItem>
            );
          })}
        </Reveal>

        {/* What the audit hands you, beside the stage that explains it. */}
        <div className="mt-10 max-w-[640px]">
          <AuditMapExample />
        </div>

        <Reveal delay={0.16}>
          <div className="mt-10">
            <ButtonLink href={howWeWork.link.href} variant="ghost" arrow>
              {howWeWork.link.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
