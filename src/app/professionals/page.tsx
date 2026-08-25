import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, Section } from "@/components/sections/Section";
import { site } from "../../../content/site";

export const metadata: Metadata = {
  title: "Professionals",
  description: `Meet ${site.founder.name}, ${site.founder.role} of ${site.name}.`,
  alternates: { canonical: "/professionals" },
};

export default function ProfessionalsPage() {
  const { founder } = site;
  return (
    <>
      <PageHero
        eyebrow="Professionals"
        title="Leadership"
        body="ProAct Legal Solutions was founded to deliver professional, research-driven, organized, and collaborative advocacy."
      />
      <Section>
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="overflow-hidden border border-line">
              <Image
                src={founder.image}
                alt={founder.imageAlt}
                width={900}
                height={1100}
                className="h-auto w-full object-cover object-top"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <h2 className="display-serif text-[clamp(1.8rem,4vw,2.8rem)] text-warm-white">
              {founder.name}
            </h2>
            <p className="mt-2 text-sm tracking-[0.14em] text-gold uppercase">
              {founder.role}
            </p>
            <p className="mt-6 text-text-muted">{founder.experience}</p>
            <p className="mt-4 text-text-muted">
              Percy built ProAct Legal Solutions on the PROACT foundation:
              Professional, Research, Organize, Action, Collaborative, and
              Transform.
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
