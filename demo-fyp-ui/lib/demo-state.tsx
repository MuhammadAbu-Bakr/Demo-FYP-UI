"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ImageRecord = { id: string; digit: number; seed: number; createdAt: string };
type Account = { id: string; name: string; email: string; passwordHash: string; plan: "free" | "pro" };
type Store = { accounts: Account[]; currentId: string | null; history: Record<string, ImageRecord[]>; usage: Record<string, { day: string; used: number; count: number }> };
type DemoContextValue = { account: Account | null; history: ImageRecord[]; used: number; count: number; ready: boolean; register(name: string, email: string, password: string): Promise<string | null>; login(email: string, password: string): Promise<boolean>; logout(): void; generate(n: number, digit: number | "random", seed: number): Promise<boolean>; remove(id: string): void; clear(): void; upgrade(): void };
const KEY = "digitforge-demo-v1";
const Context = createContext<DemoContextValue | null>(null);
const today = () => new Date().toLocaleDateString();
const passwordDigest = async (id: string, password: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${id}:${password}`)))).map(b => b.toString(16).padStart(2, "0")).join("");
const initial: Store = { accounts: [], currentId: null, history: {}, usage: {} };

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>(initial);
  const [ready, setReady] = useState(false);
  const [todayKey, setTodayKey] = useState("");
  useEffect(() => {
    const id = window.setTimeout(() => {
      try { const raw = localStorage.getItem(KEY); if (raw) setStore(JSON.parse(raw) as Store); } catch { localStorage.removeItem(KEY); }
      setTodayKey(today());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(store)); }, [store, ready]);
  const account = store.accounts.find(a => a.id === store.currentId) ?? null;
  const key = account?.id ?? "";
  const usage = useMemo(() => key ? (store.usage[key]?.day === todayKey ? store.usage[key] : { day: todayKey, used: 0, count: 0 }) : { day: todayKey, used: 0, count: 0 }, [key, store.usage, todayKey]);
  const history = useMemo(() => key ? (store.history[key] ?? []) : [], [key, store.history]);
  const value = useMemo<DemoContextValue>(() => ({ account, history, used: usage.used, count: usage.count, ready,
    async register(name, email, password) { const normalized = email.trim().toLowerCase(); if (store.accounts.some(a => a.email === normalized)) return "An account with this email already exists."; const id = crypto.randomUUID(); const user: Account = { id, name: name.trim(), email: normalized, passwordHash: await passwordDigest(id, password), plan: "free" }; setStore(s => ({ ...s, accounts: [...s.accounts, user], currentId: user.id })); return null; },
    async login(email, password) { const user = store.accounts.find(a => a.email === email.trim().toLowerCase()); if (!user || user.passwordHash !== await passwordDigest(user.id, password)) return false; setStore(s => ({ ...s, currentId: user.id })); return true; },
    logout() { setStore(s => ({ ...s, currentId: null })); },
    async generate(n, digit, seed) { if (!account) return false; const limit = account.plan === "pro" ? 20 : 2; if (usage.count + n > limit || usage.used + n * 5 > (account.plan === "pro" ? 100 : 10)) return false; await new Promise(r => setTimeout(r, 900)); const rows = Array.from({ length: n }, (_, i) => ({ id: crypto.randomUUID(), digit: digit === "random" ? Math.floor(Math.random() * 10) : digit, seed: seed + i, createdAt: new Date().toISOString() })); setStore(s => ({ ...s, history: { ...s.history, [account.id]: [...rows, ...(s.history[account.id] ?? [])].slice(0, 20) }, usage: { ...s.usage, [account.id]: { day: today(), used: usage.used + n * 5, count: usage.count + n } } })); return true; },
    remove(id) { if (account) setStore(s => ({ ...s, history: { ...s.history, [account.id]: (s.history[account.id] ?? []).filter(x => x.id !== id) } })); },
    clear() { if (account) setStore(s => ({ ...s, history: { ...s.history, [account.id]: [] } })); },
    upgrade() { if (account) setStore(s => ({ ...s, accounts: s.accounts.map(a => a.id === account.id ? { ...a, plan: "pro" } : a) })); },
  }), [account, history, usage, ready, store.accounts]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useDemo() { const value = useContext(Context); if (!value) throw new Error("useDemo must be used inside DemoProvider"); return value; }
