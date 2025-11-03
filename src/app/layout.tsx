import type React from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PetMascot } from "@/components/pet-mascot";
import { Metadata } from "next";
import { AppProvider } from "@/hocs/app-provider";

// export const metadata: Metadata = {
//   title: "PixelCred - On-Chain Developer Identity",
//   description:
//     "Create your on-chain developer profile on Sui blockchain with PixelCred",
// };

export const metadata: Metadata = {
  title: "Pixel Cred - On-chain Profile & Identity Verification on Sui",
  description:
    "Pixel Cred is a Web3 platform built on the Sui Network that allows users to create, store, and verify their digital profiles directly on-chain with transparency and security.",
  keywords: [
    "Pixel Cred",
    "Sui blockchain",
    "on-chain profile",
    "digital identity",
    "Web3",
    "profile verification",
    "blockchain identity",
  ],
  viewport: "width=device-width, initial-scale=1",
  metadataBase: new URL("https://pixelcred.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "vi-VN": "/vi",
    },
  },
  authors: [{ name: "ahkiet" }],
  creator: "Pixel Cred Team",
  publisher: "Pixel Cred Company",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Pixel Cred - On-chain Profile & Identity Verification on Sui",
    description:
      "Create and verify your digital profile on the Sui blockchain. Pixel Cred enables transparent and secure storage of identities, certificates, and profile images on-chain.",
    siteName: "Pixel Cred",
    url: "https://pixelcred.vercel.app",
    images: [
      {
        url: "https://pixelcred.vercel.app/pixelcred.svg",
        width: 1200,
        height: 630,
        alt: "Pixel Cred - On-chain Profile Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Cred - On-chain Profile & Identity Verification on Sui",
    description:
      "Upload and verify your personal profile on-chain via the Sui Network. Secure, transparent, and decentralized identity with Pixel Cred.",
    images: [
      {
        url: "https://pixelcred.vercel.app/pixelcred.svg",
        width: 1200,
        height: 630,
        alt: "Pixel Cred - Logo",
      },
    ],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <AppProvider>
          <Header />
          <PetMascot />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
