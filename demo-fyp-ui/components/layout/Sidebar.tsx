"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Images,
  Code2,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser } from "@/lib/mockData";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Generate", href: "/dashboard/generate", icon: Sparkles },
  { label: "Gallery", href: "/dashboard/gallery", icon: Images },
  { label: "API Docs", href: "/dashboard/api", icon: Code2 },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-white/5 bg-slate-950/90 backdrop-blur-xl",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* Logo / header */}
      <div className={cn("flex items-center h-16 px-4 border-b border-white/5 shrink-0", collapsed && "justify-center")}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30">
              <Sparkles size={15} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm text-white">GANify</span>
              <span className="text-[10px] text-slate-400">DCGAN · MNIST</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30">
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
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150",
                isActive
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {mockUser.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{mockUser.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{mockUser.email}</p>
            </div>
            <button
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button
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
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-20 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors shadow-md"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
