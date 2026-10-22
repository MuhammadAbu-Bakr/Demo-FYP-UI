import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/demo-state";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DigitForge AI — Handwritten Digit Demo",
    template: "%s | DigitForge AI",
  },
  description:
    "A frontend demo of GAN-based handwritten digit generation using MNIST samples.",
  keywords: ["GAN", "DCGAN", "MNIST", "Image Generation", "PyTorch", "Deep Learning", "FYP"],
  authors: [{ name: "DigitForge AI FYP Team" }],
  openGraph: {
    type: "website",
    title: "DigitForge AI — GAN Image Generation Demo",
    description: "Explore a simulated GAN-based handwritten digit generation interface for MNIST.",
    siteName: "DigitForge AI",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
