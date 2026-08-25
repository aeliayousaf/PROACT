import type { Metadata } from "next";
import { PageHero, Section } from "@/components/sections/Section";
import { site } from "../../../content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy information for the ${site.name} website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        body="This page summarizes how the website handles information. It should be reviewed by the firm before relying on it as final legal advice to the public."
      />
      <Section>
        <div className="prose-legal max-w-2xl space-y-8 text-text-muted">
          <p>
            <strong className="text-warm-white">Last updated:</strong> August
            2026
          </p>
          <div>
            <h2 className="mb-3 text-xl">Information we collect</h2>
            <p>
              When you use the contact form, we collect the details you submit
              (such as name, email, phone, preferred contact method, practice
              area selection, and message). The optional AI chat feature
              processes messages you send in order to generate a response. We do
              not ask you to provide confidential or privileged information
              through the website.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">How we use information</h2>
            <p>
              Contact submissions are used to respond to your inquiry.
              Chat messages are processed to provide general information about
              the firm and are not intended to be retained as a client file.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Sharing</h2>
            <p>
              We use service providers to operate website functions (for
              example, email delivery and AI response generation). Those
              providers process information only as needed to deliver the
              service.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl">Contact</h2>
            <p>
              Privacy questions about this website may be directed to{" "}
              <a href={site.emailHref}>{site.email}</a> or{" "}
              <a href={site.phoneHref}>{site.phone}</a>.
            </p>
          </div>
          <p className="text-sm">
            Office address and additional statutory privacy notices are not
            included here because they were not provided in the approved source
            materials. The firm should complete those details before public
            launch if required.
          </p>
        </div>
      </Section>
    </>
  );
}
