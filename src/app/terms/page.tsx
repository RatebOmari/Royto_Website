import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.lede,
  alternates: { canonical: "/terms" },
  // TODO(review): lift noindex (and the robots.ts disallow) once reviewed.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage {...terms} />;
}
