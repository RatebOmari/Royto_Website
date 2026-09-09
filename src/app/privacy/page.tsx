import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy for royto.tech.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/**
 * TODO(placeholder): legal stub. This needs real, reviewed Privacy copy
 * before launch — it is linked from the footer on every page.
 */
export default function Page() {
  return (
    <div className="container-royto pb-24 pt-[144px] md:pt-[184px]">
      <h1 className="text-hero font-extrabold text-ink">Privacy</h1>
      <p className="mono-label mt-6 text-slate">Placeholder — not yet written</p>
      <p className="mt-6 measure text-body text-ink-soft">
        This page is a stub. Royto’s Privacy has not been written yet, and
        nothing here should be treated as a statement of policy. Questions in
        the meantime go to{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-teal-ink underline underline-offset-4 decoration-line-strong transition-colors hover:decoration-teal"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
