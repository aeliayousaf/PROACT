import Image from "next/image";
import { site } from "../../../content/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  size?: "header" | "footer" | "og";
};

const logoAssets = {
  header: {
    src: "/brand/logo-horizontal-web.png",
    width: 1000,
    height: 317,
  },
  footer: {
    src: "/brand/logo-vertical-web.png",
    width: 800,
    height: 728,
  },
  og: {
    src: "/brand/logo-main-web.png",
    width: 1200,
    height: 838,
  },
} as const;

const sizes = {
  header: "h-12 w-auto sm:h-14",
  footer: "h-auto w-full object-contain",
  og: "w-full h-auto max-w-md",
} as const;

const footerWidths = "w-[160px] sm:w-[175px]";

/** Approved ProAct logo lockups. Header uses horizontal; footer uses vertical. */
export function Logo({
  className = "",
  priority = false,
  size = "header",
}: LogoProps) {
  const asset = logoAssets[size];

  if (size === "footer") {
    return (
      <div className={`${footerWidths} ${className}`.trim()}>
        <Image
          src={asset.src}
          alt={site.name}
          width={asset.width}
          height={asset.height}
          className={sizes.footer}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <Image
      src={asset.src}
      alt={site.name}
      width={asset.width}
      height={asset.height}
      className={`object-contain ${sizes[size]} ${className}`.trim()}
      style={{ width: "auto" }}
      priority={priority}
    />
  );
}
