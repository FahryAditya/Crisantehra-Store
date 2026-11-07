"use client";

import { useState } from "react";
import Link from "next/link";
import { useToastStore } from "@/stores/toast-store";
import {
  Download,
  Layers,
  Key,
  FileCode,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Copy,
} from "lucide-react";

interface PurchasedTemplate {
  id: string;
  name: string;
  version: string;
  framework: string;
  licenseType: string;
  licenseKey: string;
  purchasedDate: string;
  downloadCount: number;
  maxDownloads: number;
  fileSize: string;
  demoUrl: string;
  changelog: { version: string; date: string; notes: string[] }[];
}

export default function DownloadsPage() {
  const { showToast } = useToastStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const purchasedTemplates: PurchasedTemplate[] = [
    {
      id: "tmpl-1",
      name: "Crisanthera Commerce — Dual-Theme Next.js 16 Store",
      version: "v2.1.0",
      framework: "Next.js 16 (App Router) + Tailwind CSS v4",
      licenseType: "Commercial Unlimited License",
      licenseKey: "CRIS-COMM-9812-7492-XQ88",
      purchasedDate: "05 November 2026",
      downloadCount: 3,
      maxDownloads: 20,
      fileSize: "14.2 MB",
      demoUrl: "https://demo.crisanthera.store/commerce",
      changelog: [
        {
          version: "v2.1.0",
          date: "01 Nov 2026",
          notes: [
            "Upgrade ke Next.js 16.4.3 dengan Turbopack bundling",
            "Integrasi Tailwind CSS v4 @theme configuration",
            "Penambahan sistem tema Duality (Nihilux & Aha)",
          ],
        },
        {
          version: "v2.0.0",
          date: "15 Okt 2026",
          notes: ["Initial release dengan App Router dan Prisma 7"],
        },
      ],
    },
    {
      id: "tmpl-2",
      name: "Nihilux Dev — Dark Aesthetic Minimalist Portfolio",
      version: "v1.4.2",
      framework: "Next.js 16 + MDX Blog",
      licenseType: "Personal Developer License",
      licenseKey: "CRIS-PORT-4401-1928-LV90",
      purchasedDate: "28 Oktober 2026",
      downloadCount: 1,
      maxDownloads: 10,
      fileSize: "8.6 MB",
      demoUrl: "https://demo.crisanthera.store/nihilux-dev",
      changelog: [
        {
          version: "v1.4.2",
          date: "25 Okt 2026",
          notes: [
            "Optimasi Core Web Vitals skor 100/100",
            "Pembaruan komponen Motion v14",
          ],
        },
      ],
    },
  ];

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadZip = (template: PurchasedTemplate) => {
    showToast(
      `Memulai unduhan aman ${template.name} (${template.version}.zip)... File dialirkan via Cloudinary.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-[#a1f68b]" size={22} />
            <span>Digital Library & Download Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Unduh source code template Next.js yang sudah kamu beli dan kelola lisensi proyekmu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-mono font-semibold text-slate-300">
            Total: {purchasedTemplates.length} Template Aktif
          </span>
        </div>
      </div>

      {/* Template Download Cards */}
      <div className="space-y-5">
        {purchasedTemplates.map((template) => (
          <div key={template.id} className="bento-card p-6 sm:p-7 space-y-6">
            {/* Top Row: Title & Download CTA */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/[0.06] pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {template.name}
                  </h3>
                  <span className="rounded-md bg-[#a1f68b]/15 border border-[#a1f68b]/30 px-2 py-0.5 text-[11px] font-mono font-bold text-[#a1f68b]">
                    {template.version}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{template.framework}</p>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownloadZip(template)}
                className="flex items-center justify-center gap-2 rounded-full bg-white text-slate-950 px-5 py-2.5 text-xs font-bold hover:bg-[#a1f68b] transition-all active:scale-95 shadow-lg shrink-0"
              >
                <Download size={14} /> Unduh Source Code (.ZIP)
              </button>
            </div>

            {/* License & Access Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* License Type */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0b0c12]/50 p-4 space-y-1">
                <span className="text-slate-400 text-[11px] block">Tipe Lisensi:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#a1f68b]" />
                  <span>{template.licenseType}</span>
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Dibeli pada {template.purchasedDate}
                </span>
              </div>

              {/* License Key */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0b0c12]/50 p-4 space-y-1">
                <span className="text-slate-400 text-[11px] block">Kunci Lisensi:</span>
                <div className="flex items-center justify-between">
                  <code className="font-mono text-[11px] text-[#a1f68b] font-bold">
                    {template.licenseKey}
                  </code>
                  <button
                    onClick={() => handleCopy(template.licenseKey)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Salin Kunci Lisensi"
                  >
                    {copiedKey === template.licenseKey ? (
                      <CheckCircle2 size={13} className="text-[#a1f68b]" />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Gunakan untuk verifikasi pembaruan otomatis
                </span>
              </div>

              {/* Quota & Size */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0b0c12]/50 p-4 space-y-1">
                <span className="text-slate-400 text-[11px] block">Kuota Unduhan:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">
                    {template.downloadCount} / {template.maxDownloads} Kali
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {template.fileSize}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden mt-1">
                  <div
                    className="h-full bg-[#a1f68b]"
                    style={{
                      width: `${(template.downloadCount / template.maxDownloads) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Changelog Accordion / Info */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#0b0c12]/30 p-4 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <FileCode size={13} className="text-[#c084fc]" />
                  <span>Catatan Rilis & Changelog:</span>
                </span>
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#a1f68b] hover:underline flex items-center gap-1"
                >
                  Live Preview <ExternalLink size={11} />
                </a>
              </div>

              <div className="space-y-2">
                {template.changelog.map((log) => (
                  <div key={log.version} className="space-y-1 pl-2 border-l border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-[11px]">
                        {log.version}
                      </span>
                      <span className="text-[10px] text-slate-500">({log.date})</span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
                      {log.notes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

