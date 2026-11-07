"use client";

import { useToastStore } from "@/stores/toast-store";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 left-4 md:left-auto z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-xs font-medium text-slate-950 shadow-2xl transition-all animate-fade-in border border-slate-200"
        >
          {toast.type === "success" && (
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          )}
          {toast.type === "error" && (
            <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
          )}
          {toast.type === "info" && (
            <Info size={16} className="text-sky-600 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 space-y-0.5 leading-snug">
            {toast.title && <div className="font-bold text-slate-900">{toast.title}</div>}
            <div className="text-slate-700">{toast.message}</div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="ml-1 text-slate-400 hover:text-slate-700 transition-colors mt-0.5"
            title="Tutup notifikasi"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
