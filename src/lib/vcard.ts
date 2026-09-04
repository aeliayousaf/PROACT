import { site } from "../../content/site";

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** vCard payload for founder digital business card QR scans. */
export function buildFounderVCard() {
  const { founder } = site;
  const phone = site.phone.replace(/\D/g, "");

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(founder.name)}`,
    `ORG:${escapeVCard(site.name)}`,
    `TITLE:${escapeVCard(founder.role)}`,
    `TEL;TYPE=WORK,VOICE:+${phone.startsWith("1") ? phone : `1${phone}`}`,
    `EMAIL;TYPE=INTERNET:${site.email}`,
    `URL:${founder.linkedin}`,
    `URL:${founder.x}`,
    `URL:${founder.facebook}`,
    `URL:${site.website}`,
    "END:VCARD",
  ].join("\n");
}
