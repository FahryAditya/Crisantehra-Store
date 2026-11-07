"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if already installed in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      return;
    }

    // Check if user dismissed prompt recently
    const dismissedAt = localStorage.getItem("crisanthera_pwa_dismissed");
    if (dismissedAt) {
      const parsedTime = parseInt(dismissedAt, 10);
      // Wait 7 days before re-prompting
      if (Date.now() - parsedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Detect iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Delay showing prompt slightly for smoother UX
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If iOS and not standalone, show iOS banner after 4 seconds
    if (isIosDevice) {
      const timer = setTimeout(() => setShowPrompt(true), 4000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("crisanthera_pwa_dismissed", Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden max-w-md mx-auto transition-all duration-300">
      <div className="relative rounded-2xl border border-white/15 bg-[#181b28]/95 p-4 shadow-2xl backdrop-blur-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
          title="Tutup"
        >
          <X size={15} />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#9df68c] to-[#76e4ca] text-slate-950 shadow-md">
            <Smartphone size={20} />
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white tracking-tight">
              Pasang Aplikasi Crisanthera
            </h4>
            <p className="text-[11px] text-slate-300 leading-snug">
              {isIos ? (
                <>
                  Tekan ikon <Share size={12} className="inline mx-0.5 text-[#9df68c]" /> di browser Safari, lalu pilih <span className="font-semibold text-white">Tambahkan ke Layar Utama</span>.
                </>
              ) : (
                "Akses stiker & template anime lebih cepat langsung dari layar utama ponsel kamu!"
              )}
            </p>

            {!isIos && deferredPrompt && (
              <div className="pt-2">
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-1.5 rounded-full bg-[#a1f68b] px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Download size={13} />
                  <span>Pasang Sekarang</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

