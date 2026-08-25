import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero, Section } from "@/components/sections/Section";
import { site } from "../../../content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} at ${site.phone} or ${site.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation"
        body="Tell us briefly about your matter. We will follow up using your preferred contact method. Do not include confidential or time-sensitive details in this form."
      />
      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="section-label mb-3">Reach us</p>
            <ul className="space-y-4 text-text-muted">
              <li>
                <span className="block text-xs tracking-[0.16em] text-gold uppercase">
                  Phone
                </span>
                <a href={site.phoneHref} className="text-warm-white no-underline">
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="block text-xs tracking-[0.16em] text-gold uppercase">
                  Email
                </span>
                <a href={site.emailHref} className="text-warm-white no-underline">
                  {site.email}
                </a>
              </li>
              <li>
                <span className="block text-xs tracking-[0.16em] text-gold uppercase">
                  Jurisdiction
                </span>
                <span className="text-warm-white">{site.jurisdiction}</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
