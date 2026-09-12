import type { Metadata } from "next";
import { MonthlyReportExample } from "@/components/sections/MonthlyReportExample";
import { PackagePage } from "@/components/sections/PackagePage";
import { leadPackage } from "@/content/lead-package";

export const metadata: Metadata = {
  title: leadPackage.metaTitle,
  description: leadPackage.metaDescription,
  alternates: { canonical: "/never-miss-a-lead" },
  openGraph: {
    title: leadPackage.metaTitle,
    description: leadPackage.metaDescription,
    url: "/never-miss-a-lead",
  },
};

/** The flagship. The monthly numbers example sits under its pricing — its own bullet promises the report. */
export default function Page() {
  return <PackagePage content={leadPackage} aside={<MonthlyReportExample />} />;
}
