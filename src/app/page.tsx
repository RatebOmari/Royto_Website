import { Hero } from "@/components/hero/Hero";
import { ApprovalSafety } from "@/components/sections/ApprovalSafety";
import { CapabilityIndex } from "@/components/sections/CapabilityIndex";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PackagesRow } from "@/components/sections/PackagesRow";
import { TrustAndFounder } from "@/components/sections/TrustAndFounder";

/**
 * For every business. Seven sections: the promise, the index of the six
 * areas, the three packages, how it works and what it costs, the approval
 * rule, the terms and the person, then questions and the ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityIndex />
      <PackagesRow />
      <HowItWorks />
      <ApprovalSafety />
      <TrustAndFounder />
      <Faq />
      <FinalCta />
    </>
  );
}
