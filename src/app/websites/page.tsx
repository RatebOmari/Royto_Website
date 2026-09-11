import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { FixedScopeNote, PackageCard } from "@/components/sections/Websites";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { pages } from "@/content/pages";
import { websitePackages, websitesPage } from "@/content/websites";

const page = pages.websites;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/websites" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/websites",
  },
};

function List({
  items,
  kind,
}: {
  items: readonly string[];
  kind: "yes" | "no";
}) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-small">
          <span
            aria-hidden="true"
            className={kind === "yes" ? "text-teal" : "text-slate"}
          >
            {kind === "yes" ? "✓" : "✕"}
          </span>
          <span className={kind === "yes" ? "text-ink-soft" : "text-slate"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader {...page} />

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="measure text-body text-ink-soft">{websitesPage.body}</p>
          </Reveal>
          {/* The only proof there is, stated as one line and nothing more. */}
          <Reveal delay={0.08}>
            <p className="mt-8 border-l border-teal pl-4 font-mono text-mono text-slate">
              {websitesPage.proof}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              {websitesPage.howItWorks.heading}
            </h2>
          </Reveal>
          <Reveal as="ol" delay={0.08} className="mt-10 grid gap-4 md:grid-cols-5">
            {websitesPage.howItWorks.steps.map((step, index) => (
              <li
                key={step}
                className="rounded-card border border-line bg-paper-raised p-5"
              >
                <p className="mono-label text-teal-ink">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-small text-ink-soft">{step}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="included" className="scroll-mt-24 border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              {websitesPage.included.heading}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal delay={0.08}>
              <h3 className="mono-label text-slate">Included</h3>
              <List items={websitesPage.included.yes} kind="yes" />
            </Reveal>
            <Reveal delay={0.14}>
              <h3 className="mono-label text-slate">Not included</h3>
              <List items={websitesPage.included.no} kind="no" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              {websitesPage.packagesHeading}
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {websitePackages.map((pkg, index) => (
              <Reveal as="li" key={pkg.name} delay={0.08 + index * 0.06}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.26} className="mt-8">
            <FixedScopeNote />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <div className="rounded-panel bg-ink px-6 py-16 text-center md:px-16 md:py-20">
              <h2 className="mx-auto max-w-[22ch] text-h2 font-extrabold text-[color:var(--paper)]">
                {websitesPage.cta.lead}
              </h2>
              <div className="mt-9 flex justify-center">
                <ButtonLink href={websitesPage.cta.button.href} arrow>
                  {websitesPage.cta.button.label}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
