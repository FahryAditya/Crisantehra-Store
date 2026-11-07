"use client";

import { useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/data/mock-products";
import { useToastStore } from "@/stores/toast-store";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Copy,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface OrderItem {
  id: string;
  orderNumber: string;
  type: "sticker" | "template" | "mixed";
  productNames: string[];
  totalAmount: number;
  date: string;
  status: "processing" | "shipping" | "delivered";
  courier?: string;
  trackingNumber?: string;
  timeline: { step: string; time: string; completed: boolean }[];
}

export default function OrdersPage() {
  const { showToast } = useToastStore();
  const [filter, setFilter] = useState<"all" | "shipping" | "delivered">("all");

  const orders: OrderItem[] = [
    {
      id: "ord-1",
      orderNumber: "CRIS-948102",
      type: "sticker",
      productNames: [
        "Nihilux 'Void Chrysanthemum' Holographic Sticker (7.5cm)",
        "Crisanthera Duality Emblem 5-in-1 Mini Pack",
      ],
      totalAmount: 77000,
      date: "06 November 2026",
      status: "shipping",
      courier: "JNE Regular (Est. 1-2 Hari)",
      trackingNumber: "JNE940182749ID",
      timeline: [
        { step: "Pesanan Berhasil Dibuat", time: "06 Nov, 14:20", completed: true },
        { step: "Pembayaran QRIS Dikonfirmasi", time: "06 Nov, 14:22", completed: true },
        { step: "Stiker Dipacking dengan Pelindung Bubblewrap", time: "06 Nov, 17:00", completed: true },
        { step: "Paket Diserahkan ke Ekspedisi JNE Bandung", time: "07 Nov, 08:30", completed: true },
        { step: "Paket Tiba di Alamat Pembeli", time: "Estimasi 08 Nov", completed: false },
      ],
    },
    {
      id: "ord-2",
      orderNumber: "CRIS-771920",
      type: "template",
      productNames: ["Crisanthera Commerce — Dual-Theme Next.js 16 Store (v2.1.0)"],
      totalAmount: 349000,
      date: "05 November 2026",
      status: "delivered",
      timeline: [
        { step: "Transaksi Berhasil", time: "05 Nov, 09:10", completed: true },
        { step: "Lisensi Di-generate Otomatis", time: "05 Nov, 09:10", completed: true },
        { step: "Akses ZIP Cloudinary Diaktifkan", time: "05 Nov, 09:10", completed: true },
      ],
    },
    {
      id: "ord-3",
      orderNumber: "CRIS-610283",
      type: "sticker",
      productNames: ["Aha 'Crimson Spark' Die-Cut Vinyl Sticker"],
      totalAmount: 39000,
      date: "24 Oktober 2026",
      status: "delivered",
      courier: "J&T Express",
      trackingNumber: "JT8829104712ID",
      timeline: [
        { step: "Paket Telah Diterima Pembeli", time: "26 Okt, 11:45", completed: true },
      ],
    },
  ];

  const filteredOrders = orders.filter((o) => {
    if (filter === "shipping") return o.status === "shipping";
    if (filter === "delivered") return o.status === "delivered";
    return true;
  });

  const handleCopyResi = (resi: string) => {
    navigator.clipboard.writeText(resi);
    showToast(`Nomor resi ${resi} berhasil disalin!`);
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    showToast(`Invoice #${orderNumber} sedang diunduh...`);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="text-[#a1f68b]" size={22} />
            <span>Riwayat Pesanan & Pelacakan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pantau status ekspedisi pengiriman stiker fisik dan arsip pembelian digitalmu.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0b0c12] p-1 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-3.5 py-1.5 font-semibold transition-all ${
              filter === "all" ? "bg-white text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setFilter("shipping")}
            className={`rounded-full px-3.5 py-1.5 font-semibold transition-all ${
              filter === "shipping" ? "bg-white text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Dikirim
          </button>
          <button
            onClick={() => setFilter("delivered")}
            className={`rounded-full px-3.5 py-1.5 font-semibold transition-all ${
              filter === "delivered" ? "bg-white text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bento-card p-6 sm:p-7 space-y-5">
            {/* Top Bar: Order ID, Date, Amount, Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white font-mono font-bold text-xs">
                  #
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        order.status === "shipping"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-[#a1f68b]/20 text-[#a1f68b] border border-[#a1f68b]/30"
                      }`}
                    >
                      {order.status === "shipping" ? "Dalam Pengiriman" : "Selesai"}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Transaksi tanggal {order.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-base font-extrabold text-white">
                  {formatRupiah(order.totalAmount)}
                </span>
                <button
                  onClick={() => handleDownloadInvoice(order.orderNumber)}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <FileText size={13} />
                  <span>Invoice</span>
                </button>
              </div>
            </div>

            {/* Product items in this order */}
            <div className="space-y-1.5 text-xs">
              <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider block">
                Item Pembelian:
              </span>
              <ul className="space-y-1">
                {order.productNames.map((name, i) => (
                  <li key={i} className="text-white font-medium flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a1f68b]" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tracking Timeline (for physical stickers) */}
            {order.trackingNumber && (
              <div className="rounded-2xl border border-white/[0.06] bg-[#0b0c12]/50 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <div className="flex items-center gap-2">
                    <Truck size={15} className="text-[#a1f68b]" />
                    <span className="font-bold text-white">{order.courier}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[11px]">No. Resi:</span>
                    <code className="font-mono font-bold text-[#a1f68b]">
                      {order.trackingNumber}
                    </code>
                    <button
                      onClick={() => handleCopyResi(order.trackingNumber!)}
                      className="text-slate-400 hover:text-white p-0.5"
                      title="Salin Resi"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>

                {/* Vertical Timeline Steps */}
                <div className="space-y-3 pt-1">
                  {order.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/10">
                        {step.completed ? (
                          <div className="h-2 w-2 rounded-full bg-[#a1f68b]" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-slate-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-xs ${
                            step.completed ? "font-bold text-white" : "text-slate-500"
                          }`}
                        >
                          {step.step}
                        </span>
                        <span className="text-[10px] text-slate-500 block">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Template Digital CTA if order is template */}
            {order.type === "template" && (
              <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#0b0c12]/50 p-3 text-xs">
                <span className="text-slate-400">Template siap digunakan</span>
                <Link
                  href="/dashboard/downloads"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#a1f68b] hover:underline"
                >
                  Buka di Pustaka Template <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

