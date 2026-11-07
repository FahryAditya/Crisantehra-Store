"use client";

import { create } from "zustand";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: "success" | "error" | "info";
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  addToast: (options: { title?: string; message: string; type?: "success" | "error" | "info" }) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: (message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3200);
  },

  addToast: ({ title, message, type = "success" }) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, title, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3200);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
