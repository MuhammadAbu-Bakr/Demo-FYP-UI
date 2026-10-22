import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  BarChart3,
  GitBranch,
  Terminal,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { mockGeneratedImages } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "GANify — Generate Handwritten Digits with Deep Learning",
  description:
    "Explore Generative Adversarial Networks with our DCGAN demo. Generate realistic handwritten digit images powered by PyTorch and MNIST.",
};

const FEATURES = [
  {
    icon: Brain,
    title: "DCGAN Architecture",
    description:
      "Deep Convolutional GAN with a 5-layer generator and discriminator trained end-to-end on 60,000 MNIST images.",
    badge: "PyTorch",
    badgeVariant: "violet" as const,
  },
  {
    icon: Zap,
    title: "Real-Time Generation",
    description:
      "Submit a latent vector and get a generated digit image in under 200ms via our FastAPI backend (coming soon).",
    badge: "FastAPI",
    badgeVariant: "emerald" as const,
  },
  {
    icon: BarChart3,
    title: "Latent Space Control",
    description:
      "Tune the noise seed, temperature, and digit class to explore how the GAN interpolates between representations.",
    badge: "Interactive",
    badgeVariant: "blue" as const,
  },
  {
    icon: GitBranch,
    title: "Version-Tracked Models",
    description:
      "Compare outputs across DCGAN checkpoint versions to see how image quality improves through training epochs.",
    badge: "Research",
    badgeVariant: "amber" as const,
  },
  {
    icon: Terminal,
    title: "REST API Access",
    description:
      "Programmatic access to the generation endpoint. Integrate DCGAN outputs into your own research pipelines.",
    badge: "API",
    badgeVariant: "default" as const,
  },
  {
    icon: Sparkles,
    title: "Batch Generation",
    description:
      "Generate up to 64 images in a single request with configurable class labels and diversity parameters.",
    badge: "Pro",
    badgeVariant: "violet" as const,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a Digit Class",
    description:
      "Select any digit from 0–9, or let the model generate random classes using a uniform prior.",
  },
  {
    step: "02",
    title: "Configure the Latent Vector",
    description:
      "Set the noise seed and temperature to control diversity and stochasticity in the generator output.",
  },
  {
    step: "03",
    title: "Generate & Explore",
    description:
      "The DCGAN generator processes your input through 5 transposed convolutions to produce a 28×28 grayscale image.",
  },
  {
    step: "04",
    title: "Export & Analyse",
    description:
      "Download your images as PNG, view the discriminator confidence score, and inspect the generation metadata.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-purple-700/10 blur-3xl" />
          <div className="absolute top-60 left-0 w-56 h-56 rounded-full bg-indigo-700/10 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-6">
          <Badge variant="violet" className="gap-1.5 py-1 px-3">
            <Sparkles size={11} />
            Final Year Project · DCGAN on MNIST
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            <span className="gradient-text-hero">Generate Digits</span>
            <br />
            <span className="text-slate-200">with Deep Learning</span>
          </h1>

          <p className="max-w-xl text-lg text-slate-400 leading-relaxed">
            A polished demo of a <strong className="text-slate-300">Deep Convolutional GAN</strong> trained
            on MNIST. Explore latent space, control generation parameters, and see how adversarial
            training produces realistic handwritten digits.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link href="/dashboard">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight size={16} />}>
                Open Dashboard
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">
                Create Free Account
              </Button>
            </Link>
          </div>

          <p className="text-xs text-slate-600 mt-1">
            No credit card required · 50 free generations / month
          </p>
        </div>

        {/* Hero image grid mock */}
        <div className="relative mt-16 max-w-5xl w-full mx-auto">
          <div className="glass rounded-3xl p-4 sm:p-6">
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
              {mockGeneratedImages.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square rounded-xl overflow-hidden relative group"
                  style={{
                    background: `linear-gradient(135deg, ${img.gradientFrom}, ${img.gradientTo})`,
                  }}
                >
                  {/* Digit label overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/80 font-mono font-bold text-base sm:text-lg select-none drop-shadow-lg">
                      {img.digitClass}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">Sample outputs · DCGAN v0.3.1 · MNIST</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500">Model live</span>
              </div>
            </div>
          </div>
          {/* Bottom glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-violet-600/20 blur-2xl rounded-full" />
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="violet" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              Everything you need to explore GANs
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Built as a research and demonstration platform — from latent space navigation to batch
              generation and API access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, description, badge, badgeVariant }) => (
              <Card key={title} hoverable padding="lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20">
                      <Icon size={18} className="text-violet-400" />
                    </div>
                    <Badge variant={badgeVariant}>{badge}</Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1.5">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="emerald" className="mb-4">Workflow</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              How It Works
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              From latent noise to a realistic handwritten digit in four steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map(({ step, title, description }, idx) => (
              <div
                key={step}
                className="relative flex gap-5 p-6 rounded-2xl border border-slate-800/60 bg-slate-900/50"
              >
                {/* Connector line for desktop */}
                {idx < HOW_IT_WORKS.length - 1 && idx % 2 === 0 && (
                  <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={18} className="text-slate-700" />
                  </div>
                )}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center font-mono font-bold text-violet-400 text-sm">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Proof Strip ──────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          {[
            { value: "60,000", label: "MNIST training images" },
            { value: "200ms", label: "Average generation time" },
            { value: "98.7%", label: "Discriminator accuracy" },
            { value: "DCGAN", label: "Architecture" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-3xl font-bold gradient-text">{value}</span>
              <span className="text-sm text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/5 pointer-events-none" aria-hidden />
            <div className="relative">
              <Badge variant="violet" className="mb-5">Get Started</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
                Ready to explore the latent space?
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Create a free account and generate your first MNIST digit image in under a minute.
                No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/auth/register">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight size={16} />}>
                    Start Generating
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="ghost">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                {["Free tier available", "No credit card required", "50 gens / month"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
