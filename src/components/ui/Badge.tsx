import { cn } from "@/lib/utils";

// =============================================================
// Badge — status / category labels
// =============================================================

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    brand:
      "bg-[var(--brand-900)] text-[var(--brand-300)] border border-[var(--brand-800)]",
    success:
      "bg-emerald-900/30 text-emerald-400 border border-emerald-800/50",
    warning:
      "bg-amber-900/30 text-amber-400 border border-amber-800/50",
    danger:
      "bg-red-900/30 text-red-400 border border-red-800/50",
    outline:
      "bg-transparent text-[var(--text-secondary)] border border-[var(--border-default)]",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5 rounded-md",
    md: "text-xs px-2.5 py-1 rounded-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
