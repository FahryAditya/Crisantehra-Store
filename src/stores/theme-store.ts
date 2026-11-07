"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CharacterTheme } from "@/types/store";

interface ThemeState {
  theme: CharacterTheme;
  setTheme: (theme: CharacterTheme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "nihilux",
      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", theme);
        }
      },
      toggleTheme: () => {
        const nextTheme: CharacterTheme = get().theme === "nihilux" ? "aha" : "nihilux";
        set({ theme: nextTheme });
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", nextTheme);
        }
      },
    }),
    {
      name: "crisanthera-theme",
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    }
  )
);

