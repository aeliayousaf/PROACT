"use client";

import Link from "next/link";
import { ScrollBlurReveal } from "@/components/motion/ScrollBlurReveal";
import { Section } from "./Section";

export function CtaBand({
  headline,
  body,
  href,
  label,
}: {
  headline: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <Section className="bg-navy-deep/80 backdrop-blur-sm">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <ScrollBlurReveal as="p" className="section-label mb-3">
            Next step
          </ScrollBlurReveal>
          <ScrollBlurReveal
            as="h2"
            className="display-serif text-[clamp(1.6rem,3.5vw,2.5rem)] text-warm-white"
          >
            {headline}
          </ScrollBlurReveal>
          <p className="mt-4 max-w-xl text-text-muted">{body}</p>
        </div>
        <div className="md:col-span-4 md:justify-self-end">
          <Link href={href} className="btn btn-primary">
            {label}
          </Link>
        </div>
      </div>
    </Section>
  );
}
