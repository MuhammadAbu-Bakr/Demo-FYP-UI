"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles, GitBranch, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Blur backing */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-b border-white/5" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="GAN Demo home">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm text-white tracking-tight">GANify</span>
            <span className="text-[10px] text-slate-400 tracking-wide">DCGAN · MNIST</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm transition-colors",
                  pathname === link.href
                    ? "text-violet-400 bg-violet-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
            aria-label="GitHub repository"
          >
            <GitBranch size={17} />
          </a>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="primary" size="sm" rightIcon={<ExternalLink size={13} />}>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="relative md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-3 py-2.5 rounded-xl text-sm transition-colors",
                pathname === link.href
                  ? "text-violet-400 bg-violet-500/10"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
              <Button variant="secondary" size="md" className="w-full">Log in</Button>
            </Link>
            <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
