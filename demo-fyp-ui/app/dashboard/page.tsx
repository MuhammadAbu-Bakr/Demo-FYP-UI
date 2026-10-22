"use client";

import { useState } from "react";
import {
  Sparkles,
  Images,
  TrendingUp,
  Clock,
  Star,
  Download,
  RefreshCw,
  Bell,
  Search,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import {
  mockUser,
  mockGeneratedImages,
  mockUsageStats,
  mockRecentActivity,
} from "@/lib/mockData";
import { formatDate, sleep, cn } from "@/lib/utils";

export default function DashboardPage() {
  const [generating, setGenerating] = useState(false);
  const [latentSeed, setLatentSeed] = useState(1137);
  const [digitClass, setDigitClass] = useState<number | "random">("random");
  const [temperature, setTemperature] = useState(1.0);
  const [generatedOutput, setGeneratedOutput] = useState<null | {
    gradientFrom: string;
    gradientTo: string;
    digit: number;
    seed: number;
  }>(null);

  const GRADIENTS: Array<[string, string]> = [
    ["#6366f1", "#8b5cf6"],
    ["#8b5cf6", "#a855f7"],
    ["#7c3aed", "#6366f1"],
    ["#4f46e5", "#7c3aed"],
    ["#9333ea", "#6d28d9"],
  ];

  async function handleGenerate() {
    setGenerating(true);
    setGeneratedOutput(null);
    await sleep(1800);
    const seed = latentSeed + Math.floor(Math.random() * 100);
    const digit =
      digitClass === "random" ? Math.floor(Math.random() * 10) : digitClass;
    const g = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    setGeneratedOutput({ gradientFrom: g[0], gradientTo: g[1], digit, seed });
    setGenerating(false);
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl shrink-0">
        <div>
          <h1 className="text-base font-semibold text-slate-100">Dashboard</h1>
          <p className="text-xs text-slate-500">
            Welcome back, {mockUser.name.split(" ")[0]} 👋
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
            aria-label="Search"
          >
            <Search size={17} />
          </button>
          <button
            className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white ml-1">
            {mockUser.avatarInitials}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* ─── Stat Cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mockUsageStats.map((stat) => {
            const pct = Math.round((stat.value / stat.max) * 100);
            return (
              <Card key={stat.label} padding="md">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                    <TrendingUp size={13} className="text-emerald-500 mt-0.5" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-slate-100">
                      {stat.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">/ {stat.max.toLocaleString()} {stat.unit}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        pct > 80 ? "bg-red-500" : pct > 60 ? "bg-amber-500" : "bg-violet-500"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ─── Generate Panel ──────────────────────────────────────── */}
          <div className="xl:col-span-1 flex flex-col gap-4">
            <Card padding="lg" glass className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-violet-400" />
                <h2 className="font-semibold text-slate-100 text-sm">Quick Generate</h2>
                <Badge variant="violet" className="ml-auto">DCGAN v0.3.1</Badge>
              </div>

              {/* Digit class selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Digit Class</label>
                <div className="grid grid-cols-6 gap-1">
                  <button
                    onClick={() => setDigitClass("random")}
                    className={cn(
                      "col-span-2 py-1.5 rounded-lg text-xs font-medium transition-all",
                      digitClass === "random"
                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                        : "bg-slate-800 text-slate-500 hover:text-slate-300 border border-transparent"
                    )}
                  >
                    Random
                  </button>
                  {Array.from({ length: 10 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setDigitClass(i)}
                      className={cn(
                        "py-1.5 rounded-lg text-xs font-mono font-bold transition-all",
                        digitClass === i
                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                          : "bg-slate-800 text-slate-500 hover:text-slate-300 border border-transparent"
                      )}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seed */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400" htmlFor="latent-seed">
                  Noise Seed
                </label>
                <div className="flex gap-2">
                  <input
                    id="latent-seed"
                    type="number"
                    value={latentSeed}
                    onChange={(e) => setLatentSeed(Number(e.target.value))}
                    className="flex-1 h-9 rounded-xl bg-slate-900 border border-slate-700/60 text-sm text-slate-100 px-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                  <button
                    onClick={() => setLatentSeed(Math.floor(Math.random() * 9999))}
                    className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
                    aria-label="Random seed"
                  >
                    <RefreshCw size={13} />
                  </button>
                </div>
              </div>

              {/* Temperature */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-400" htmlFor="temperature-slider">
                    Temperature
                  </label>
                  <span className="text-xs font-mono text-violet-400">{temperature.toFixed(2)}</span>
                </div>
                <input
                  id="temperature-slider"
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600">
                  <span>Conservative</span>
                  <span>Diverse</span>
                </div>
              </div>

              <Button
                id="dashboard-generate"
                variant="primary"
                size="md"
                loading={generating}
                onClick={handleGenerate}
                className="w-full"
                leftIcon={<Sparkles size={14} />}
              >
                {generating ? "Generating…" : "Generate Image"}
              </Button>
            </Card>

            {/* Output preview */}
            <Card padding="md" className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Output Preview</span>
                {generatedOutput && (
                  <button
                    className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
                    aria-label="Download"
                  >
                    <Download size={12} /> Save
                  </button>
                )}
              </div>
              <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-slate-800/60 border border-slate-700/40">
                {generating ? (
                  <div className="flex flex-col items-center gap-3">
                    <Spinner size="md" />
                    <span className="text-xs text-slate-500">Running DCGAN…</span>
                  </div>
                ) : generatedOutput ? (
                  <div
                    className="w-full h-full flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${generatedOutput.gradientFrom}, ${generatedOutput.gradientTo})`,
                    }}
                  >
                    <span className="text-white font-mono font-bold text-7xl drop-shadow-xl select-none">
                      {generatedOutput.digit}
                    </span>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="default" className="text-[10px]">
                        seed {generatedOutput.seed}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <Images size={28} />
                    <span className="text-xs">Configure and generate above</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* ─── Recent Generations + Activity ────────────────────────── */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            {/* Recent image grid */}
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Images size={15} className="text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-100">Recent Generations</h2>
                </div>
                <Button variant="ghost" size="sm" leftIcon={<Clock size={13} />}>
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {mockGeneratedImages.slice(0, 12).map((img) => (
                  <div
                    key={img.id}
                    className="aspect-square rounded-xl relative overflow-hidden group cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${img.gradientFrom}, ${img.gradientTo})`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/80 font-mono font-bold text-xl select-none drop-shadow-lg">
                        {img.digitClass}
                      </span>
                    </div>
                    {img.isFavorited && (
                      <div className="absolute top-1 right-1">
                        <Star size={9} className="text-amber-400 fill-amber-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity flex items-end p-1.5">
                      <span className="text-[8px] text-white/70 font-mono">{formatDate(img.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent activity */}
            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={15} className="text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-100">Recent Activity</h2>
              </div>
              <div className="flex flex-col gap-1">
                {mockRecentActivity.map((act, i) => (
                  <div
                    key={act.id}
                    className={cn(
                      "flex items-start gap-3 py-2.5 px-3 rounded-xl transition-colors hover:bg-slate-800/40",
                      i < mockRecentActivity.length - 1 && "border-b border-slate-800/60"
                    )}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300">
                        <span className="font-semibold text-slate-100">{act.action}</span>{" "}
                        — {act.detail}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-600 shrink-0 mt-0.5">{act.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
