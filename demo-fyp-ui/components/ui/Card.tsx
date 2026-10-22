import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle violet glow on hover */
  hoverable?: boolean;
  /** Glassmorphism style */
  glass?: boolean;
  /** Inner padding preset */
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-7",
};

export default function Card({
  children,
  className,
  hoverable = false,
  glass = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border",
        glass
          ? "bg-white/5 backdrop-blur-md border-white/10"
          : "bg-slate-900/80 border-slate-800/60",
        hoverable && [
          "transition-all duration-300 cursor-pointer",
          "hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10",
          "hover:-translate-y-0.5",
        ],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

/** A styled divider for use inside a Card */
export function CardDivider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-slate-800/80 -mx-5 my-4", className)} />;
}
