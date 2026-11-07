"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyle =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-primary text-white hover:opacity-90 active:scale-[0.98] border border-transparent shadow-[0_0_15px_var(--primary-glow)]",
      secondary:
        "bg-surface-secondary text-foreground hover:bg-surface-hover border border-border",
      outline:
        "border border-border text-foreground hover:border-primary hover:text-primary bg-transparent",
      ghost:
        "text-muted hover:text-foreground hover:bg-surface-secondary bg-transparent",
      glow:
        "bg-primary text-white border border-primary hover:shadow-[0_0_25px_var(--primary-glow)] active:scale-[0.98]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-1" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

