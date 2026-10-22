import Link from "next/link";
import { Sparkles, GitBranch, X, BookOpen } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Research: [
    { label: "DCGAN Paper", href: "https://arxiv.org/abs/1511.06434", external: true },
    { label: "MNIST Dataset", href: "http://yann.lecun.com/exdb/mnist/", external: true },
    { label: "PyTorch Docs", href: "https://pytorch.org/docs/", external: true },
    { label: "FastAPI", href: "https://fastapi.tiangolo.com/", external: true },
  ],
  Account: [
    { label: "Log In", href: "/auth/login" },
    { label: "Register", href: "/auth/register" },
    { label: "Settings", href: "/settings" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-sm text-white">GANify</span>
                <span className="text-[10px] text-slate-400">DCGAN · MNIST</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">
              A final year project exploring Generative Adversarial Networks for MNIST digit generation.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
              >
                <GitBranch size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
              >
                <X size={16} />
              </a>
              <a
                href="https://arxiv.org/abs/1511.06434"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Research Paper"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
              >
                <BookOpen size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {section}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © 2025 GANify — Final Year Project Demo. Not for commercial use.
          </p>
          <p className="text-xs text-slate-600">
            Built with{" "}
            <span className="text-violet-500">Next.js · PyTorch · FastAPI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
