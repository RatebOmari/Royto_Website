import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.lede,
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <LegalPage {...terms} />;
}
