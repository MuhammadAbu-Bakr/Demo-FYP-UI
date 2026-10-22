"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { sleep } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await sleep(1200);
    // Mock: accept any non-empty credentials
    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }
    // Mock success — redirect to dashboard
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-6 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-base text-white">GANify</span>
              <span className="text-[10px] text-slate-400 tracking-wide">DCGAN · MNIST</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-slate-100">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your GANify account</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="login-form">
            <Input
              id="login-email"
              label="Email address"
              type="email"
              placeholder="alex@university.edu"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={15} />}
              required
            />

            <Input
              id="login-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={15} />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              required
            />

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input
                  id="login-remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 accent-violet-500"
                />
                Remember me
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 text-center" role="alert">
                {error}
              </p>
            )}

            <Button
              id="login-submit"
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-1"
              rightIcon={<ArrowRight size={15} />}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/8" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-transparent px-3 text-xs text-slate-600">Demo credentials</span>
            </div>
          </div>

          {/* Mock credentials hint */}
          <button
            type="button"
            onClick={() => {
              setEmail("alex.rahman@university.edu");
              setPassword("demo1234");
            }}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-700/60 text-xs text-slate-500 hover:border-violet-500/40 hover:text-violet-400 transition-all"
          >
            Use demo account ↗
          </button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
