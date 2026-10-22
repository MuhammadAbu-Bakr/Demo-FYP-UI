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
  title: {
    default: "GANify — GAN Image Generation Demo",
    template: "%s | GANify",
  },
  description:
    "A polished FYP demo for Generative Adversarial Network image generation using DCGAN trained on the MNIST dataset. Built with PyTorch and FastAPI.",
  keywords: ["GAN", "DCGAN", "MNIST", "Image Generation", "PyTorch", "Deep Learning", "FYP"],
  authors: [{ name: "GANify FYP Team" }],
  openGraph: {
    type: "website",
    title: "GANify — GAN Image Generation Demo",
    description: "Generate handwritten digit images using a DCGAN model trained on MNIST.",
    siteName: "GANify",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
