import type { Metadata } from "next";
import { EthosGrid } from "@/components/sections/HomeSections";
import { CtaBand, PageHero, Section } from "@/components/sections/Section";
import { site } from "../../../content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name} and the PROACT approach to Ontario legal advocacy.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={site.name}
        body={site.summary}
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="section-label mb-3">Our purpose</p>
            <h2 className="display-serif text-3xl text-warm-white">
              {site.tagline}
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-text-muted">
            <p>{site.nameMeaning}</p>
            <p>
              We help individuals, landlords, tenants, small businesses, and
              newcomers to Canada navigate complex legal processes with
              confidence — with clear communication and organized advocacy
              before Ontario tribunals and Small Claims Court.
            </p>
          </div>
        </div>
      </Section>
      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-label mb-3">Our commitment</p>
            <h2 className="display-serif text-[clamp(1.6rem,3vw,2.35rem)] text-warm-white">
              Clear, results-focused advocacy across Ontario
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base text-text-muted md:text-lg">
              {site.aboutCommitment}
            </p>
          </div>
        </div>
      </Section>
      <EthosGrid />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-label mb-3">Why ProAct</p>
            <h2 className="display-serif text-[clamp(1.6rem,3vw,2.35rem)] text-warm-white">
              Not just representation — strategic solutions
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base text-text-muted md:text-lg">
              {site.aboutStandout}
            </p>
          </div>
        </div>
      </Section>
      <CtaBand
        headline={site.cta.headline}
        body={site.cta.body}
        href={site.cta.href}
        label={site.cta.label}
      />
    </>
  );
}
