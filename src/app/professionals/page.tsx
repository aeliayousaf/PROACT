import type { Metadata } from "next";
import Image from "next/image";
import { DigitalBusinessCard } from "@/components/brand/DigitalBusinessCard";
import { CtaBand, PageHero, Section } from "@/components/sections/Section";
import { site } from "../../../content/site";

function IconLinkedIn({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.29l-4.93-6.44L5.7 22H2.44l8.02-9.16L1.5 2h6.45l4.45 5.9L18.244 2Zm-1.1 18.1h1.75L7.01 3.8H5.14l11.999 16.3Z" />
    </svg>
  );
}

function IconFacebook({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.33h-1.19c-1.18 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 7.5 12 13l8-5.5M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6.5 4.5h3l1.2 3.6-1.8 1.2a11 11 0 0 0 5.5 5.5l1.2-1.8 3.6 1.2v3c0 .6-.4 1-1 1A13.5 13.5 0 0 1 5.5 5.5c0-.6.4-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !px-3"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-5 w-5" />
              </a>
              <a
                href={founder.x}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !px-3"
                aria-label="X"
              >
                <IconX className="h-5 w-5" />
              </a>
              <a
                href={founder.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !px-3"
                aria-label="Facebook"
              >
                <IconFacebook className="h-5 w-5" />
              </a>
              <a href={site.emailHref} className="btn btn-ghost">
                <IconMail />
                Email
              </a>
              <a href={site.phoneHref} className="btn btn-ghost">
                <IconPhone />
                {site.phone}
              </a>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="section-label mb-3">{founder.digitalCard.title}</p>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="digital-card-qr-frame shrink-0">
                  <DigitalBusinessCard />
                </div>
                <div className="max-w-md">
                  <h3 className="display-serif text-xl text-warm-white">
                    Chip QR code
                  </h3>
                  <p className="mt-3 text-sm text-text-muted md:text-base">
                    {founder.digitalCard.body}
                  </p>
                </div>
              </div>
            </div>
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
