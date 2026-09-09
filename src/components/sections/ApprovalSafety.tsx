import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { approval } from "@/content/home-sections";
import { stagger } from "@/lib/motion";

/**
 * The trust moment. For a skeptical owner this is the most important section
 * on the page, so it gets card weight rather than being a footnote.
 *
 * Gold appears here and means what it always means: a human is needed.
 */
export function ApprovalSafety() {
  return (
    <section className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={approval.eyebrow}
          heading={approval.heading}
          intro={approval.intro}
        />

        <Reveal
          stagger={stagger.card}
          delay={0.18}
          className="mt-14 grid gap-4 md:grid-cols-2"
        >
          <RevealItem index={0}>
            <Card className="h-full items-start p-8">
              <Tag tone="teal">Automatic</Tag>
              <h3 className="mt-5 text-h3 font-semibold text-ink">
                {approval.autonomous.title}
              </h3>
              <p className="mt-3 text-small text-ink-soft">
                {approval.autonomous.body}
              </p>
            </Card>
          </RevealItem>

          <RevealItem index={1}>
            <Card className="h-full items-start border-gold/40 p-8">
              <Tag tone="gold">Needs you</Tag>
              <h3 className="mt-5 text-h3 font-semibold text-ink">
                {approval.held.title}
              </h3>
              <p className="mt-3 text-small text-ink-soft">{approval.held.body}</p>
            </Card>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
