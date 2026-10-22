"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Key,
  Shield,
  AlertTriangle,
  Copy,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { mockUser } from "@/lib/mockData";
import { sleep, cn } from "@/lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API Keys", icon: Key },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const [notifications, setNotifications] = useState({
    generationComplete: true,
    creditLow: true,
    modelUpdates: false,
    weeklyDigest: true,
    marketingEmails: false,
  });

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await sleep(1000);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleCopyApiKey() {
    navigator.clipboard.writeText("sk-gan-demo-f7a3").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Settings</h1>
            <p className="text-slate-400 mt-1">Manage your account, notifications, and API access.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar tabs */}
            <nav className="flex md:flex-col gap-1 md:w-48 shrink-0">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  id={`settings-tab-${id}`}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all",
                    activeTab === id
                      ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                  )}
                >
                  <Icon size={15} className="shrink-0" />
                  {label}
                </button>
              ))}
            </nav>

            {/* Tab content */}
            <div className="flex-1 min-w-0">
              {/* ── Profile ── */}
              {activeTab === "profile" && (
                <Card padding="lg">
                  <h2 className="text-base font-semibold text-slate-100 mb-6">Profile Information</h2>
                  <form onSubmit={handleSaveProfile} className="flex flex-col gap-5" id="settings-profile-form">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shrink-0">
                        {mockUser.avatarInitials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{mockUser.name}</p>
                        <p className="text-xs text-slate-500 mb-2">{mockUser.email}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="violet">
                            {mockUser.plan.charAt(0).toUpperCase() + mockUser.plan.slice(1)} Plan
                          </Badge>
                          <button
                            type="button"
                            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                          >
                            Change photo
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-slate-800/80" />

                    <Input
                      id="settings-name"
                      label="Full name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                      leftIcon={<User size={15} />}
                    />
                    <Input
                      id="settings-email"
                      label="Email address"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                    />

                    <div className="flex items-center gap-3">
                      <Button
                        id="settings-save-profile"
                        type="submit"
                        variant="primary"
                        size="md"
                        loading={saving}
                        leftIcon={saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
                      >
                        {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {/* ── Notifications ── */}
              {activeTab === "notifications" && (
                <Card padding="lg">
                  <h2 className="text-base font-semibold text-slate-100 mb-6">Notification Preferences</h2>
                  <div className="flex flex-col gap-4">
                    {(
                      [
                        ["generationComplete", "Generation complete", "Be notified when an image batch finishes."],
                        ["creditLow", "Low credit warning", "Alert when your credits drop below 10%."],
                        ["modelUpdates", "Model updates", "Get notified when a new DCGAN checkpoint is deployed."],
                        ["weeklyDigest", "Weekly digest", "A summary of your generation activity each week."],
                        ["marketingEmails", "Product news & updates", "Occasional emails about new features."],
                      ] as const
                    ).map(([key, label, desc]) => (
                      <div key={key} className="flex items-start justify-between gap-4 py-3 border-b border-slate-800/60 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-slate-200">{label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                        </div>
                        <button
                          id={`notif-${key}`}
                          role="switch"
                          aria-checked={notifications[key]}
                          onClick={() =>
                            setNotifications((n) => ({ ...n, [key]: !n[key] }))
                          }
                          className={cn(
                            "relative shrink-0 w-10 h-5 rounded-full transition-colors mt-0.5",
                            notifications[key] ? "bg-violet-600" : "bg-slate-700"
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
                              notifications[key] && "translate-x-5"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* ── API Keys ── */}
              {activeTab === "api" && (
                <div className="flex flex-col gap-5">
                  <Card padding="lg">
                    <h2 className="text-base font-semibold text-slate-100 mb-1">API Key</h2>
                    <p className="text-sm text-slate-500 mb-6">
                      Use this key to authenticate requests to the GANify REST API. Keep it secret.
                    </p>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center px-3 font-mono text-sm text-slate-400 overflow-hidden">
                        {showApiKey
                          ? "sk-gan-demo-f7a3-••••••••••••••••"
                          : mockUser.apiKey}
                      </div>
                      <button
                        id="settings-toggle-key"
                        onClick={() => setShowApiKey((v) => !v)}
                        className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
                        aria-label={showApiKey ? "Hide key" : "Reveal key"}
                      >
                        {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button
                        id="settings-copy-key"
                        onClick={handleCopyApiKey}
                        className={cn(
                          "h-10 w-10 rounded-xl border flex items-center justify-center transition-all",
                          copied
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                            : "bg-slate-800 border-slate-700/60 text-slate-400 hover:text-slate-200"
                        )}
                        aria-label="Copy API key"
                      >
                        {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 mt-3">
                      Base URL: <code className="text-violet-400 font-mono">https://api.ganify.demo/v1</code>
                    </p>
                  </Card>

                  <Card padding="lg">
                    <h2 className="text-sm font-semibold text-slate-100 mb-3">Usage Example</h2>
                    <pre className="bg-slate-950 rounded-xl p-4 text-xs text-slate-400 font-mono overflow-x-auto border border-slate-800/60 leading-relaxed">
{`curl -X POST https://api.ganify.demo/v1/generate \\
  -H "Authorization: Bearer sk-gan-demo-f7a3" \\
  -H "Content-Type: application/json" \\
  -d '{
    "digit_class": 7,
    "seed": 1137,
    "temperature": 1.0,
    "num_images": 4
  }'`}
                    </pre>
                  </Card>
                </div>
              )}

              {/* ── Security / Danger Zone ── */}
              {activeTab === "security" && (
                <div className="flex flex-col gap-5">
                  <Card padding="lg">
                    <h2 className="text-base font-semibold text-slate-100 mb-6">Change Password</h2>
                    <div className="flex flex-col gap-4">
                      <Input
                        id="settings-current-password"
                        label="Current password"
                        type="password"
                        placeholder="••••••••"
                      />
                      <Input
                        id="settings-new-password"
                        label="New password"
                        type="password"
                        placeholder="Min. 8 characters"
                      />
                      <Input
                        id="settings-confirm-password"
                        label="Confirm new password"
                        type="password"
                        placeholder="Repeat new password"
                      />
                      <Button id="settings-change-password" variant="primary" size="md" className="self-start">
                        Update Password
                      </Button>
                    </div>
                  </Card>

                  <Card padding="lg" className="border-red-500/20">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h2 className="text-sm font-semibold text-red-300">Danger Zone</h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          These actions are irreversible. Proceed with caution.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between py-3 border-b border-slate-800/60">
                        <div>
                          <p className="text-sm text-slate-300">Reset all generations</p>
                          <p className="text-xs text-slate-600">Permanently delete all generated images and history.</p>
                        </div>
                        <Button
                          id="settings-reset-generations"
                          variant="danger"
                          size="sm"
                          disabled
                          title="Disabled in demo"
                        >
                          Reset
                        </Button>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm text-slate-300">Delete account</p>
                          <p className="text-xs text-slate-600">Permanently remove your account and all data.</p>
                        </div>
                        <Button
                          id="settings-delete-account"
                          variant="danger"
                          size="sm"
                          disabled
                          title="Disabled in demo"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
