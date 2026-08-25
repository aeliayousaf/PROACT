import type { Metadata } from "next";
import { PageHero, Section } from "@/components/sections/Section";
import { site } from "../../../content/site";

export const metadata: Metadata = {
  title: "Website Terms and Disclaimer",
  description: `Website terms and disclaimer for ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Website Terms & Disclaimer"
        body="Please read these terms before using this website. This page is a website disclaimer draft for firm review."
      />
      <Section>
        <div className="prose-legal max-w-2xl space-y-8 text-text-muted">
          <div>
            <h2 className="mb-3 text-xl">No professional relationship</h2>
            <p>
              Use of this website, including submitting the contact form or
              chatting with the AI assistant, does not create a paralegal-client
              or solicitor-client relationship with {site.name}.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Not legal advice</h2>
            <p>
              Content on this website and responses from the AI assistant are for
              general information only and are not legal advice. Do not act or
              refrain from acting based solely on website content. Contact the
              firm to discuss your specific circumstances.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Confidentiality</h2>
            <p>
              Do not send confidential, privileged, or highly sensitive
              information through website forms or chat. Internet communications
              may not be secure.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Scope of services</h2>
            <p>
              Services described on this website are provided within authorized
              paralegal scope in Ontario, as reflected in the firm’s supplied
              materials. Outcomes are never guaranteed.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Emergencies</h2>
            <p>
              This website is not monitored for emergencies. If you are in
              immediate danger, contact emergency services (911 in Canada).
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Contact</h2>
            <p>
              <a href={site.phoneHref}>{site.phone}</a> ·{" "}
              <a href={site.emailHref}>{site.email}</a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
