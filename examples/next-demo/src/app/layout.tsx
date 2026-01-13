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

export const metadata: Metadata = {
  title: "BugzxMotion | Premium UI Component Library",
  description: "A production-ready, premium UI component library with built-in motion primitives. 50+ components designed to wow users and delight developers.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "BugzxMotion | Premium UI Component Library",
    description: "50+ premium React components with built-in animations",
    images: ['/logo.png'],
  },
};

import { BugzxMotionProvider } from "@bugzx-motion/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BugzxMotionProvider>
          {children}
        </BugzxMotionProvider>
      </body>
    </html>
  );
}
