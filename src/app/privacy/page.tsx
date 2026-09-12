import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.lede,
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <LegalPage {...privacy} />;
}
