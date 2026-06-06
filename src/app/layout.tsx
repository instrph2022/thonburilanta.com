import type { Metadata } from "next";
import { Inter, Prompt, Sarabun, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sarabun",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thonburi Lanta Hospital — Healthcare on Koh Lanta",
  description: "A full-service 36-bed hospital on Koh Lanta with 24/7 emergency room, English-speaking doctors, and international health insurance direct billing.",
  keywords: [
    "hospital in koh lanta",
    "clinic koh lanta",
    "doctor koh lanta",
    "emergency koh lanta",
    "โรงพยาบาลเกาะลันตา",
    "คลินิกเกาะลันตา",
    "หมอเกาะลันตา"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${prompt.variable} ${sarabun.variable} ${lora.variable} font-sans antialiased bg-warm-white text-dark`}
      >
        <Providers>
          <Navbar />
          <main className="min-height-[calc(100vh-64px)] pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
