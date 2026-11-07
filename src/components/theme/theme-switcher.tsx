"use client";

import { useThemeStore } from "@/stores/theme-store";
import { Moon, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function ThemeSwitcher() {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const isNihilux = theme === "nihilux";

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 shadow-inner">
      <button
        type="button"
        onClick={() => setTheme("nihilux")}
        className={`relative flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
          isNihilux
            ? "bg-primary text-white shadow-[0_0_14px_var(--primary-glow)]"
            : "text-muted hover:text-foreground"
        }`}
        title="Aktifkan Tema Nihilux (Mystic Violet)"
      >
        <Moon size={14} className={isNihilux ? "text-white" : "text-muted"} />
        <span>Nihilux</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme("aha")}
        className={`relative flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
          !isNihilux
            ? "bg-primary text-white shadow-[0_0_14px_var(--primary-glow)]"
            : "text-muted hover:text-foreground"
        }`}
        title="Aktifkan Tema Aha (Crimson Spark)"
      >
        <Sparkles size={14} className={!isNihilux ? "text-white" : "text-muted"} />
        <span>Aha</span>
      </button>
    </div>
  );
}

