import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lem-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LEM Projects | Strategic Projects, Accommodation, and Supply Solutions",
    template: "%s | LEM Projects",
  },
  description:
    "LEM Projects brings together strategic projects, reliable accommodation, and supply enterprise support for a stronger, more connected operating group.",
  keywords: [
    "LEM Projects",
    "business solutions Limpopo",
    "strategic projects",
    "accommodation Polokwane",
    "accommodation Lebowakgomo",
    "supply enterprise",
    "Limpopo business group",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LEM Projects | Strategic Projects, Accommodation, and Supply Solutions",
    description:
      "Explore the LEM group portfolio across strategic projects, reliable accommodation, and operational supply support.",
    url: siteUrl,
    siteName: "LEM Projects",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/logos/LEM-Projects_Logo.png",
        width: 1200,
        height: 630,
        alt: "LEM Projects logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEM Projects | Strategic Projects, Accommodation, and Supply Solutions",
    description:
      "A unified LEM group presence across strategic projects, accommodation, and supply support.",
    images: ["/logos/LEM-Projects_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <div className="flex min-h-full flex-col">
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
