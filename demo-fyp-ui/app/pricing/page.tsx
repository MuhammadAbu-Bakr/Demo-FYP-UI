"use client";

import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { mockPricingPlans } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const COMPARISON_FEATURES = [
  { label: "Monthly generations", free: "50", pro: "1,000", enterprise: "Unlimited" },
  { label: "Image resolution", free: "28×28", pro: "256×256", enterprise: "Custom" },
  { label: "Digit class control", free: "✓", pro: "✓", enterprise: "✓" },
  { label: "Latent space controls", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { label: "API access", free: "Rate-limited", pro: "Full", enterprise: "Dedicated" },
  { label: "Batch generation", free: "—", pro: "✓", enterprise: "✓" },
  { label: "PNG / SVG export", free: "—", pro: "✓", enterprise: "✓" },
  { label: "Custom model training", free: "—", pro: "—", enterprise: "✓" },
  { label: "Support", free: "Community", pro: "Email", enterprise: "Dedicated" },
  { label: "SLA uptime", free: "—", pro: "—", enterprise: "✓" },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="violet" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Start free and scale as your research grows. All plans include access to our DCGAN API.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={cn("text-sm", !annual ? "text-slate-200 font-medium" : "text-slate-500")}>
              Monthly
            </span>
            <button
              id="pricing-billing-toggle"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((v) => !v)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors",
                annual ? "bg-violet-600" : "bg-slate-700"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm",
                  annual && "translate-x-5"
                )}
              />
            </button>
            <span className={cn("text-sm flex items-center gap-1.5", annual ? "text-slate-200 font-medium" : "text-slate-500")}>
              Annual
              <Badge variant="emerald">Save 25%</Badge>
            </span>
          </div>
        </div>

        {/* Plan cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {mockPricingPlans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-3xl border flex flex-col",
                  plan.highlighted
                    ? "bg-gradient-to-b from-violet-900/40 to-slate-900/80 border-violet-500/40 shadow-xl shadow-violet-500/15"
                    : "bg-slate-900/60 border-slate-800/60"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="violet" className="shadow-lg shadow-violet-500/30 px-3 py-1">
                      <Sparkles size={10} />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  <h2 className="font-bold text-lg text-slate-100 mb-1">{plan.name}</h2>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">{plan.description}</p>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-slate-100">
                      {price === 0 ? "Free" : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-slate-500 text-sm mb-1">/ mo</span>
                    )}
                    {annual && price > 0 && (
                      <span className="text-xs text-emerald-400 mb-1 ml-2">billed annually</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    id={`pricing-cta-${plan.id}`}
                    variant={plan.highlighted ? "primary" : "outline"}
                    size="md"
                    className="w-full"
                    rightIcon={<ArrowRight size={14} />}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature comparison table */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-slate-100 mb-6 text-center">Full Feature Comparison</h2>
          <div className="rounded-2xl border border-slate-800/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/60 bg-slate-900/60">
                  <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Feature
                  </th>
                  {mockPricingPlans.map((p) => (
                    <th
                      key={p.id}
                      className={cn(
                        "py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-center",
                        p.highlighted ? "text-violet-400" : "text-slate-500"
                      )}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-slate-800/40 transition-colors hover:bg-slate-800/20",
                      i === COMPARISON_FEATURES.length - 1 && "border-0"
                    )}
                  >
                    <td className="py-3 px-5 text-slate-400">{row.label}</td>
                    {[row.free, row.pro, row.enterprise].map((val, j) => (
                      <td
                        key={j}
                        className={cn(
                          "py-3 px-4 text-center",
                          val === "—" ? "text-slate-700" : "text-slate-300",
                          j === 1 && "text-violet-300"
                        )}
                      >
                        {val === "✓" ? (
                          <Check size={15} className="text-emerald-400 mx-auto" />
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
