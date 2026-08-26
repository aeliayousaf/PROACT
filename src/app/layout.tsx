import type { Metadata } from "next";
import { Cinzel, Montserrat, Bebas_Neue, Mea_Culpa } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { site } from "../../content/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const meaCulpa = Mea_Culpa({
  variable: "--font-mea-culpa",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.proactlegalsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Ontario Legal Advocacy`,
    template: `%s | ${site.name}`,
  },
  description: site.summary,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: site.name,
    title: site.name,
    description: site.summary,
    images: [{ url: "/brand/logo-main-web.png", alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.summary,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: site.name,
  description: site.summary,
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Ontario",
  },
  image: `${siteUrl}/brand/logo-main-web.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${montserrat.variable} ${cinzel.variable} ${bebas.variable} ${meaCulpa.variable} h-full`}
    >
      <body className="site-grain min-h-full flex flex-col bg-ink text-text antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main" className="flex-1 pt-[var(--header-h)]">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
