import React from "react";
import { ProductType } from "@/types/store";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "sticker" | "template" | "success";
}

export function Badge({
  className = "",
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const baseStyle =
    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase select-none";

  const variantStyles = {
    primary: "bg-primary/20 text-primary border border-primary/40",
    secondary: "bg-surface-secondary text-muted border border-border",
    outline: "border border-border text-foreground bg-transparent",
    sticker:
      "bg-[var(--badge-sticker-bg)] text-[var(--badge-sticker-text)] border border-[var(--badge-sticker-border)]",
    template:
      "bg-[var(--badge-template-bg)] text-[var(--badge-template-text)] border border-[var(--badge-template-border)]",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

