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
  title: "DigitForge AI — Generate Handwritten Digits with Deep Learning",
  description:
      "Explore a frontend demonstration of GAN-based handwritten digit generation for MNIST.",
};

const FEATURES = [
  {
    icon: Brain,
    title: "GAN Learning Context",
    description:
      "An educational interface for exploring GAN concepts and the MNIST dataset.",
    badge: "Research",
    badgeVariant: "violet" as const,
  },
  {
    icon: Zap,
    title: "Simulated Generation",
    description:
      "Try a local sample workflow with browser-side state. No model or backend is called.",
    badge: "Demo",
    badgeVariant: "emerald" as const,
  },
  {
    icon: BarChart3,
    title: "Generation Settings",
    description:
      "Choose a digit class, image count, and seed, then see token costs before generating.",
    badge: "Interactive",
    badgeVariant: "blue" as const,
  },
  {
    icon: GitBranch,
    title: "Per-Account History",
    description:
      "Review your latest sample images, with history capped at 20 individual records.",
    badge: "Research",
    badgeVariant: "amber" as const,
  },
  {
    icon: Terminal,
    title: "Generation History",
    description:
      "Review and manage your recent sample outputs, with local browser persistence.",
    badge: "API",
    badgeVariant: "default" as const,
  },
  {
    icon: Sparkles,
    title: "Batch Generation",
    description:
      "Choose from a few batch sizes, with daily plan limits enforced in the demo.",
    badge: "Free + Pro",
    badgeVariant: "violet" as const,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a Digit Class",
    description:
      "Select a digit from 0–9 or choose a random sample class.",
  },
  {
    step: "02",
    title: "Configure the Latent Vector",
    description:
      "Select how many placeholder images to display and an optional seed value.",
  },
  {
    step: "03",
    title: "Generate & Explore",
    description:
      "The frontend simulates a generation delay and creates local metadata records. It does not run DCGAN inference.",
  },
  {
    step: "04",
    title: "Export & Analyse",
    description:
      "Download a simple SVG placeholder and inspect its generation metadata.",
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
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-lime-600/10 blur-3xl" />
          <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-green-700/10 blur-3xl" />
          <div className="absolute top-60 left-0 w-56 h-56 rounded-full bg-lime-700/10 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(46,204,64,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,204,64,0.5) 1px, transparent 1px)",
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
            An interactive frontend demo for exploring <strong className="text-slate-300">GAN-based handwritten digit generation</strong>.
            Configure sample outputs and track usage with local demo state. No trained model is connected.
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
            Free demo account · 10 daily tokens · simulated generation
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
              <span className="text-xs text-slate-500">Illustrative digit placeholders · MNIST concept</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500">Demo preview</span>
              </div>
            </div>
          </div>
          {/* Bottom glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-lime-600/20 blur-2xl rounded-full" />
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
              generation settings, local history, and account preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, description, badge, badgeVariant }) => (
              <Card key={title} hoverable padding="lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-lime-500/15 border border-lime-500/20">
                      <Icon size={18} className="text-lime-400" />
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
                <div className="shrink-0 w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center font-mono font-bold text-lime-400 text-sm">
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

      <section id="faq" className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10"><Badge variant="emerald" className="mb-4">FAQ</Badge><h2 className="text-3xl font-bold text-slate-100">About this demo</h2></div>
          <div className="space-y-4">{[
            ["Does this run a trained GAN?", "No. Generation is simulated with typographic sample placeholders. The interface is designed to demonstrate a future GAN and MNIST workflow."],
            ["What are tokens?", "Tokens are local demo counters: each sample image costs five tokens. The Free plan starts with ten daily tokens; the Pro simulation starts with one hundred."],
            ["Are plans or checkout real?", "No. The Pro upgrade only changes this browser demo account. No payment details are requested and no payment is processed."],
            ["Where is my account data stored?", "This demo stores account, usage, and generated sample records in browser local storage. It can be cleared or edited and is not server-secured."],
          ].map(([q,a])=><details key={q} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"><summary className="cursor-pointer font-medium text-slate-100">{q}</summary><p className="text-sm text-slate-400 leading-relaxed mt-3">{a}</p></details>)}</div>
        </div>
      </section>

      {/* ─── Social Proof Strip ──────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          {[
            { value: "0–9", label: "Digit classes to explore" },
            { value: "5", label: "Tokens per sample" },
            { value: "20", label: "Saved images per account" },
            { value: "MNIST", label: "Dataset concept" },
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
            <div className="absolute inset-0 bg-gradient-to-br from-lime-600/10 to-green-600/5 pointer-events-none" aria-hidden />
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
