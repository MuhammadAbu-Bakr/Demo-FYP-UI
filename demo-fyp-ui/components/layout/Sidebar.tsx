"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  History,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemo } from "@/lib/demo-state";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Generation", href: "/dashboard#generator", icon: Sparkles },
  { label: "Generation History", href: "/history", icon: History },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { account, logout } = useDemo();

  return (
    <>
    <button onClick={() => setMobileOpen(true)} className="md:hidden fixed z-30 top-3 left-3 rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300" aria-label="Open navigation"><Menu size={18}/></button>
    {mobileOpen && <button onClick={() => setMobileOpen(false)} aria-label="Close navigation" className="md:hidden fixed inset-0 z-30 bg-black/60"/>}
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/5 bg-slate-950/95 backdrop-blur-xl md:relative md:z-auto",
        "transition-all duration-300 ease-in-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* Logo / header */}
      <div className={cn("flex items-center h-16 px-4 border-b border-white/5 shrink-0", collapsed && "justify-center")}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-lime-600 to-green-600 shadow-lg shadow-lime-500/30">
              <Sparkles size={15} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm text-white">DigitForge AI</span>
              <span className="text-[10px] text-slate-400">DCGAN · MNIST</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-lime-600 to-green-600 shadow-lg shadow-lime-500/30">
            <Sparkles size={15} className="text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150",
                isActive
                  ? "bg-lime-500/15 text-lime-300 border border-lime-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span className="font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User avatar + sign out */}
      <div className={cn("border-t border-white/5 p-3", collapsed ? "flex justify-center" : "")}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {account?.name.split(" ").map(p => p[0]).join("").slice(0,2) || "DF"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{account?.name || "Guest workspace"}</p>
              <p className="text-[10px] text-slate-500 truncate">{account?.email || "Create an account to save"}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        className="hidden md:flex absolute -right-3 top-20 z-10 items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors shadow-md"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
    </>
  );
}
