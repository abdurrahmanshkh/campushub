import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Build60 | Campus Growth Hub",
    template: "%s | Build60",
  },
  description:
    "Build60 makes it easy for student clubs to launch, promote and track high-impact technical workshops across campus.",
  keywords: [
    "AI workshop engineering students",
    "student tech clubs",
    "campus developer workshop",
    "build AI project 60 minutes",
  ],
  authors: [{ name: "Build60 Campus Initiative" }],
  creator: "Build60",
  publisher: "Build60 Growth Prototype",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Build60 Campus Growth Hub",
    title: "Build60 | Campus Growth Hub",
    description:
      "A campus-distribution operating system for practical developer workshops. One link, one QR, complete campaign kit.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Build60 Campus Growth Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build60 | Campus Growth Hub",
    description:
      "Give your campus club one link, one QR, and a complete campaign kit. Real-time attribution and student referrals.",
    images: ["/api/og"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Build60 Campus Growth Hub",
  url: siteUrl,
  description:
    "A campus-distribution operating system empowering student tech clubs to organize and track high-impact developer workshops.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F7F7F3] text-[#0B1220]">
        {children}
      </body>
    </html>
  );
}
