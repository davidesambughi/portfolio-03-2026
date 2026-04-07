import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://davidesambughi.com'),
  title: "Davide Sambughi — Full-Stack Developer",
  description:
    "Portfolio of Davide Sambughi, a full-stack developer specializing in Next.js 16, GEO-optimized web apps, and AI-assisted development.",
  openGraph: {
    title: "Davide Sambughi — Full-Stack Developer",
    description:
      "Full-stack developer specializing in Next.js 16, GEO-optimized web apps, and AI-assisted development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davide Sambughi — Full-Stack Developer",
    description:
      "Full-stack developer specializing in Next.js 16, GEO-optimized web apps, and AI-assisted development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
