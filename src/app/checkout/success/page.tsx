"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, Download, Package, ArrowRight, Sparkles } from "lucide-react";
import { useToastStore } from "@/stores/toast-store";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToastStore();
  const orderId = searchParams.get("orderId") || "CRIS-849201";
  const email = searchParams.get("email") || "pembeli@example.com";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
        <CheckCircle2 size={42} />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          <Sparkles size={13} /> Pembayaran Diterima
        </span>
        <h1 className="text-3xl font-black text-foreground sm:text-4xl">
          Pesanan Berhasil Dibuat!
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
          Terima kasih telah berbelanja di Crisanthera-Store. Rincian faktur dan konfirmasi transaksi telah
          dikirimkan ke <strong className="text-foreground">{email}</strong>.
        </p>
      </div>

      {/* Invoice Card Details */}
      <div className="rounded-2xl border border-border bg-surface p-6 text-left space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
          <div>
            <span className="text-muted block">Nomor Pesanan</span>
            <span className="font-mono font-bold text-foreground text-sm">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-muted block">Status Pesanan</span>
            <span className="font-bold text-emerald-400">Terverifikasi</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
          <div className="rounded-xl border border-border/80 bg-surface-secondary/50 p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Download size={16} className="text-primary" />
              <span>Aset Digital (Template)</span>
            </div>
            <p className="text-muted text-[11px]">
              Tautan unduhan source code ZIP siap digunakan. Kamu juga dapat mengaksesnya kapan saja di Digital Library.
            </p>
            <button
              onClick={() => showToast("Memulai unduhan bundle template Crisanthera (.ZIP)...")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-md hover:opacity-90 mt-1"
            >
              <Download size={13} /> Download Source Code (.ZIP)
            </button>
          </div>

          <div className="rounded-xl border border-border/80 bg-surface-secondary/50 p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Package size={16} className="text-primary" />
              <span>Pengiriman Fisik (Stiker)</span>
            </div>
            <p className="text-muted text-[11px]">
              Pesanan stiker sedang disiapkan oleh tim kurator Crisanthera. Nomor resi pelacakan ekspedisi akan dikirim via email/WhatsApp.
            </p>
            <span className="inline-block text-[11px] font-semibold text-primary">
              Estimasi Pengiriman: 1 - 2 Hari Kerja
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-md hover:opacity-90"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/catalog"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-xs font-bold text-foreground hover:bg-surface-secondary"
        >
          Belanja Produk Lain <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-muted">Memuat konfirmasi pesanan...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

