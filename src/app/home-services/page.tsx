import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { homeServices } from "@/content/home-services";

const page = homeServices;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/home-services" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/home-services",
  },
};

/** The vertical front door: one trade's problems, in its words, routed to the map and the package. */
export default function Page() {
  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} lede={page.lede} metaTitle={page.metaTitle} metaDescription={page.metaDescription} />

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="max-w-[22ch] text-h2 font-extrabold text-ink">{page.pains.heading}</h2>
          </Reveal>
          <Reveal as="ul" delay={0.08} className="mt-12 grid gap-4 md:grid-cols-3">
            {page.pains.items.map((item) => (
              <li key={item.title}>
                <Card className="h-full items-start p-7">
                  <h3 className="text-h3 font-semibold text-ink">{item.title}</h3>
                  <p className="mt-4 text-small text-ink-soft">{item.body}</p>
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink"
                  >
                    {item.link}
                    <span aria-hidden="true">→</span>
                  </Link>
                </Card>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <div className="container-royto grid gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <div>
            <Reveal>
              <h2 className="text-h2 font-extrabold text-ink">{page.fit.heading}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 measure text-body text-ink-soft">{page.fit.body}</p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h2 className="text-h2 font-extrabold text-ink">{page.how.heading}</h2>
            </Reveal>
            <Reveal as="ol" delay={0.08} className="mt-6 space-y-3">
              {page.how.steps.map((step, index) => (
                <li key={step} className="flex gap-4 border-b border-line pb-3 text-body text-ink-soft last:border-0">
                  <span className="mono-label pt-1 text-teal-ink">{String(index + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <div className="rounded-panel bg-ink px-6 py-16 md:px-16 md:py-20">
              <p className="mono-label text-[color:var(--slate)]">Founding offer</p>
              <h2 className="mt-4 max-w-[22ch] text-h2 font-extrabold text-[color:var(--paper)]">{page.founding.lead}</h2>
              <p className="mt-5 max-w-[60ch] text-body text-[color:var(--slate)]">{page.founding.body}</p>
              <div className="mt-9">
                <ButtonLink href={page.founding.cta.href} arrow>
                  {page.founding.cta.label}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
