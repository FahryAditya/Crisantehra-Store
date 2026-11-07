"use client";

import Link from "next/link";
import { formatRupiah } from "@/data/mock-products";
import { useToastStore } from "@/stores/toast-store";
import {
  Download,
  Package,
  Layers,
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { showToast } = useToastStore();
  return (
    <div className="space-y-6">
      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-muted text-xs">
            <span>Template Dimiliki</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Layers size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-foreground">2 Template</div>
          <p className="text-[11px] text-emerald-400 font-semibold">Siap unduh versi terbaru (v2.1)</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-muted text-xs">
            <span>Pesanan Stiker Fisik</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <Package size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-foreground">3 Paket</div>
          <p className="text-[11px] text-muted">1 dalam perjalanan (JNE)</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-muted text-xs">
            <span>Total Pengeluaran</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-foreground">{formatRupiah(597000)}</div>
          <p className="text-[11px] text-muted">Hemat Rp 85.000 via diskon</p>
        </div>
      </div>

      {/* Quick Access to Purchased Templates */}
      <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-base font-bold text-foreground">Akses Cepat Template Digital</h2>
            <p className="text-xs text-muted">Unduh arsip kode sumber ZIP yang sudah kamu beli.</p>
          </div>
          <Link
            href="/dashboard/downloads"
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Lihat Semua Pustaka <ArrowRight size={13} />
          </Link>
        </div>

        <div className="space-y-3">
          {[
            {
              id: "t1",
              name: "Crisanthera Commerce — Dual-Theme Next.js 16 Store",
              version: "v2.1.0",
              framework: "Next.js 16 (App Router)",
              license: "Single Project License",
              purchasedAt: "05 Nov 2026",
              fileSize: "14.2 MB",
            },
            {
              id: "t2",
              name: "Nihilux Dev — Dark Aesthetic Minimalist Portfolio",
              version: "v1.4.2",
              framework: "Next.js 16",
              license: "Personal License",
              purchasedAt: "28 Okt 2026",
              fileSize: "8.6 MB",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/80 bg-surface-secondary/40 p-4 transition-all hover:border-primary/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{item.name}</span>
                  <span className="rounded-md bg-primary/20 px-1.5 py-0.5 text-[10px] font-mono text-primary font-bold">
                    {item.version}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
                  <span>{item.framework}</span>
                  <span>•</span>
                  <span>Lisensi: {item.license}</span>
                  <span>•</span>
                  <span>Ukuran: {item.fileSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Mengunduh ${item.name} (${item.version}.zip) dari Cloudinary...`)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  <Download size={13} /> Unduh ZIP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sticker Orders */}
      <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-base font-bold text-foreground">Pesanan Stiker Terbaru</h2>
            <p className="text-xs text-muted">Pantau status kurir dan ekspedisi stiker anime fisik.</p>
          </div>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Semua Pesanan <ArrowRight size={13} />
          </Link>
        </div>

        <div className="rounded-xl border border-border/80 bg-surface-secondary/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-foreground">#CRIS-948102</span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                Dalam Pengiriman
              </span>
            </div>
            <p className="text-xs text-muted">
              Nihilux Void Chrysanthemum (Holographic) & Duality Mini Pack
            </p>
            <div className="text-[11px] text-muted">
              Ekspedisi: <strong className="text-foreground">JNE Regular</strong> • Resi: <code className="text-primary font-mono font-semibold">JNE940182749ID</code>
            </div>
          </div>

          <div className="text-right sm:shrink-0">
            <span className="text-xs font-bold text-foreground block">{formatRupiah(77000)}</span>
            <span className="text-[10px] text-muted block">Estimasi tiba besok</span>
          </div>
        </div>
      </div>
    </div>
  );
}

