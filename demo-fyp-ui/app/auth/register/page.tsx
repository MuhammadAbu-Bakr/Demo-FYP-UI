"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { sleep } from "@/lib/utils";

const PERKS = [
  "50 free image generations per month",
  "Access to all digit classes (0–9)",
  "Latent space exploration tools",
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.includes("@")) e.email = "Enter a valid email address.";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await sleep(1400);
    window.location.href = "/dashboard";
  }

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl" />
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
          <h1 className="text-2xl font-bold text-slate-100">Create your account</h1>
          <p className="text-sm text-slate-500 mt-1">Start generating with 50 free images</p>
        </div>

        {/* Perks */}
        <div className="flex flex-col gap-2 mb-6">
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="register-form">
            <Input
              id="register-name"
              label="Full name"
              type="text"
              placeholder="Alex Rahman"
              autoComplete="name"
              value={form.name}
              onChange={update("name")}
              leftIcon={<User size={15} />}
              error={errors.name}
              required
            />
            <Input
              id="register-email"
              label="Email address"
              type="email"
              placeholder="alex@university.edu"
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
              leftIcon={<Mail size={15} />}
              error={errors.email}
              required
            />
            <Input
              id="register-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={update("password")}
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
              error={errors.password}
              required
            />
            <Input
              id="register-confirm"
              label="Confirm password"
              type={showPassword ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={update("confirm")}
              leftIcon={<Lock size={15} />}
              error={errors.confirm}
              required
            />

            <p className="text-xs text-slate-600 leading-relaxed">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="text-violet-400 hover:underline">Terms</Link> and{" "}
              <Link href="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>.
            </p>

            <Button
              id="register-submit"
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
              rightIcon={<ArrowRight size={15} />}
            >
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
