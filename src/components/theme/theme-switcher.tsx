"use client";

import { useThemeStore } from "@/stores/theme-store";
import { Moon, Sparkles } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore();
  const isNihilux = theme === "nihilux";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 items-center gap-1.5 rounded-full border border-white/[0.07] bg-[#181b28] px-3 text-xs font-semibold text-slate-300 transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
      title={`Tema Aktif: ${isNihilux ? "Nihilux (Lilac/Mint)" : "Aha (Coral/Lime)"}. Klik untuk ganti.`}
    >
      {isNihilux ? (
        <>
          <span className="h-2 w-2 rounded-full bg-[#c084fc] shadow-[0_0_8px_#c084fc]" />
          <span className="text-[11px] font-bold text-white hidden sm:inline">Nihilux</span>
        </>
      ) : (
        <>
          <span className="h-2 w-2 rounded-full bg-[#ff6e6e] shadow-[0_0_8px_#ff6e6e]" />
          <span className="text-[11px] font-bold text-white hidden sm:inline">Aha</span>
        </>
      )}
    </button>
  );
}
