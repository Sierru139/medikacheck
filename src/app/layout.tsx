import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediCheck AI - Smart Symptom Checker",
  description:
    "AI-powered symptom checker that helps you understand your health symptoms and provides personalized recommendations. Not a replacement for professional medical advice.",
  keywords: [
    "symptom checker",
    "health",
    "medical",
    "AI",
    "diagnosis",
    "healthcare",
  ],
  authors: [{ name: "MediCheck AI" }],
  openGraph: {
    title: "MediCheck AI - Smart Symptom Checker",
    description:
      "AI-powered symptom checker for understanding your health symptoms",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
