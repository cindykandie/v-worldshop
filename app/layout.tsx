import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const adminFont = DM_Sans({
  variable: "--font-admin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Vagina Worldshop",
  description: "A glowing, feminine world of movement, community, and embodied art.",
  icons: {
    icon: "/icon.png",
  },
};

export const viewport = {
  themeColor: "#0a0712",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${adminFont.variable} antialiased vw-surface`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
