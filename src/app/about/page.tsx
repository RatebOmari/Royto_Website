import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FounderPortrait } from "@/components/ui/FounderPortrait";
import { PageHeader } from "@/components/ui/PageHeader";
import { aboutPage } from "@/content/home-sections";
import { pages } from "@/content/pages";
import { founder } from "@/content/site";

const page = pages.about;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/about",
  },
};

export default function Page() {
  return (
    <>
      <PageHeader {...page} />

      <div className="container-royto grid gap-14 py-20 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-16 md:py-28">
        <Reveal>
          <div className="md:sticky md:top-28">
            <FounderPortrait name={founder.name} />
            <p className="mt-6 border-l border-teal pl-4 font-mono text-mono text-slate">
              {founder.signature}
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {aboutPage.bodies.map((body, index) => (
            <Reveal key={body.slice(0, 24)} delay={index * 0.06}>
              <p className="measure text-body text-ink-soft">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="border-t border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              {aboutPage.doesNot.heading}
            </h2>
          </Reveal>
          <Reveal as="ul" delay={0.08} className="mt-10 grid gap-4 md:grid-cols-2">
            {aboutPage.doesNot.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-card border border-line bg-paper-raised p-5 text-small text-ink-soft"
              >
                <span aria-hidden="true" className="text-slate">
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-12">
              <ButtonLink href="/contact" arrow>
                Get a free automation audit
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
