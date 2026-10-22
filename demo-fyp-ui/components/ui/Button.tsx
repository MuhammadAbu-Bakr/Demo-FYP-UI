import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/25 border border-violet-500/30",
  secondary:
    "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60",
  ghost:
    "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-slate-100",
  danger:
    "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30",
  outline:
    "bg-transparent border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-[0.97]",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading ? (
        <Loader2 className="shrink-0 animate-spin" size={size === "sm" ? 13 : size === "lg" ? 18 : 15} />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
