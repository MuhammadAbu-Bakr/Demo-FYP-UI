// ─── Types ────────────────────────────────────────────────────────────────────

export interface GeneratedImage {
  id: string;
  createdAt: string;
  /** Noise seed used by the GAN */
  seed: number;
  /** MNIST digit class (0-9) */
  digitClass: number;
  /** Gradient stop colors to visually represent a "generated" image */
  gradientFrom: string;
  gradientTo: string;
  /** Model configuration snapshot */
  config: GenerationConfig;
  isFavorited: boolean;
}

export interface GenerationConfig {
  latentDim: number;
  numImages: number;
  digitClass: number | "random";
  temperature: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  plan: "free" | "pro" | "enterprise";
  joinedAt: string;
  apiKey: string;
}

export interface UsageStat {
  label: string;
  value: number;
  max: number;
  unit: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide icon name
}

export interface RecentActivity {
  id: string;
  action: string;
  detail: string;
  time: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

export const mockUser: UserProfile = {
  id: "usr_01",
  name: "Alex Rahman",
  email: "alex.rahman@university.edu",
  avatarInitials: "AR",
  plan: "pro",
  joinedAt: "2024-09-01",
  apiKey: "sk-gan-••••••••••••••••••••••••••••••••f7a3",
};

const gradients: Array<[string, string]> = [
  ["#6366f1", "#8b5cf6"],
  ["#8b5cf6", "#a855f7"],
  ["#a855f7", "#c084fc"],
  ["#6d28d9", "#7c3aed"],
  ["#4f46e5", "#6366f1"],
  ["#7c3aed", "#8b5cf6"],
  ["#9333ea", "#a855f7"],
  ["#5b21b6", "#6d28d9"],
  ["#4338ca", "#4f46e5"],
  ["#7e22ce", "#9333ea"],
  ["#3730a3", "#4338ca"],
  ["#6b21a8", "#7e22ce"],
];

export const mockGeneratedImages: GeneratedImage[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `img_${String(i + 1).padStart(3, "0")}`,
    createdAt: new Date(Date.now() - i * 3_600_000 * 4).toISOString(),
    seed: 1000 + i * 137,
    digitClass: i % 10,
    gradientFrom: gradients[i % gradients.length][0],
    gradientTo: gradients[i % gradients.length][1],
    config: {
      latentDim: 100,
      numImages: 1,
      digitClass: i % 10,
      temperature: 1.0,
    },
    isFavorited: i < 3,
  })
);

export const mockUsageStats: UsageStat[] = [
  { label: "Images Generated", value: 847, max: 1000, unit: "images" },
  { label: "API Calls", value: 1243, max: 5000, unit: "calls" },
  { label: "Storage Used", value: 230, max: 512, unit: "MB" },
  { label: "Credits Remaining", value: 153, max: 1000, unit: "credits" },
];

export const mockPricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for exploring the GAN demo.",
    features: [
      "50 image generations / month",
      "Standard resolution (28×28)",
      "Basic digit selection",
      "Community support",
      "API access (rate-limited)",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Most Popular",
    monthlyPrice: 12,
    annualPrice: 9,
    description: "For researchers and developers building with GANs.",
    features: [
      "1,000 image generations / month",
      "High-resolution upscaling (256×256)",
      "Advanced latent space controls",
      "Priority queue",
      "Full API access",
      "Email support",
      "Export to PNG / SVG",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "Unlimited scale for academic and institutional use.",
    features: [
      "Unlimited image generations",
      "Custom model fine-tuning",
      "Dedicated GPU compute",
      "SSO / SAML authentication",
      "SLA-backed uptime",
      "Dedicated account manager",
      "Custom integrations (FastAPI)",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export const mockRecentActivity: RecentActivity[] = [
  {
    id: "act_001",
    action: "Generated",
    detail: '12 images of digit "7" (seed 1137)',
    time: "2 minutes ago",
  },
  {
    id: "act_002",
    action: "Favorited",
    detail: "Image img_001 saved to collection",
    time: "18 minutes ago",
  },
  {
    id: "act_003",
    action: "Downloaded",
    detail: "Batch export of 8 PNG images",
    time: "1 hour ago",
  },
  {
    id: "act_004",
    action: "API Call",
    detail: "POST /api/generate — 200 OK (312 ms)",
    time: "3 hours ago",
  },
  {
    id: "act_005",
    action: "Model Update",
    detail: "DCGAN checkpoint v0.3.1 deployed",
    time: "Yesterday",
  },
];

export const dashboardNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Generate", href: "/dashboard/generate", icon: "Sparkles" },
  { label: "Gallery", href: "/dashboard/gallery", icon: "Images" },
  { label: "API Docs", href: "/dashboard/api", icon: "Code2" },
  { label: "Pricing", href: "/pricing", icon: "CreditCard" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];
