import { Hero } from "@/components/hero/Hero";
import { ApprovalSafety } from "@/components/sections/ApprovalSafety";
import { CapabilityIndex } from "@/components/sections/CapabilityIndex";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ThreePains } from "@/components/sections/ThreePains";
import { TrustAndFounder } from "@/components/sections/TrustAndFounder";

/**
 * The front door speaks to the trade in the Triangle; everyone else is one
 * link away. Seven sections: the promise, the three pains, the index of the
 * six areas, how it works and what it costs, the approval rule, the terms and
 * the person, then questions and the ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ThreePains />
      <CapabilityIndex />
      <HowItWorks />
      <ApprovalSafety />
      <TrustAndFounder />
      <Faq />
      <FinalCta />
    </>
  );
}
