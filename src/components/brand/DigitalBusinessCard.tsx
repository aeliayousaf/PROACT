import Image from "next/image";
import QRCode from "qrcode";
import { site } from "../../../content/site";
import { buildFounderVCard } from "@/lib/vcard";

export async function DigitalBusinessCard() {
  const { digitalCard } = site.founder;

  if (digitalCard.qrImage) {
    return (
      <Image
        src={digitalCard.qrImage}
        alt={`${site.founder.name} digital business card QR code`}
        width={180}
        height={180}
        className="h-[180px] w-[180px] object-contain"
      />
    );
  }

  const svg = await QRCode.toString(buildFounderVCard(), {
    type: "svg",
    margin: 2,
    width: 180,
    color: {
      dark: "#07090e",
      light: "#f7f4ee",
    },
  });

  return (
    <div
      className="digital-card-qr-mark"
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden
    />
  );
}
