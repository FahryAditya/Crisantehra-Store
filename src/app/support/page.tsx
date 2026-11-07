"use client";

import { useState } from "react";
import { useToastStore } from "@/stores/toast-store";
import {
  HelpCircle,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Mail,
  Send,
  ShieldCheck,
  Package,
  Code2,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: "stiker" | "template" | "pengiriman";
}

const faqs: FaqItem[] = [
  {
    category: "stiker",
    question: "Apakah stiker anime Crisanthera tahan air dan cuaca outdoor?",
    answer:
      "Tentu saja! Semua stiker fisik kami dicetak menggunakan bahan Vinyl Premium dengan lapisan laminasi Doff/Glossy Waterproof anti-gores. Aman ditempel di helm, tumbler, bodi motor/mobil, casing smartphone, maupun laptop.",
  },
  {
    category: "stiker",
    question: "Apakah lem stiker meninggalkan bekas saat dilepas?",
    answer:
      "Tidak. Stiker kami menggunakan adhesive berkualitas tinggi yang merekat kuat namun tetap 'residue-free' (tidak merusak permukaan gadget atau cat kendaraan saat ingin diganti).",
  },
  {
    category: "template",
    question: "Bagaimana cara mengakses source code template Next.js setelah membeli?",
    answer:
      "Setelah pembayaran terverifikasi otomatis (QRIS / VA / Kartu), file source code .zip langsung tersedia di menu Akun -> Pustaka Template (ZIP). Anda juga akan menerima tautan unduhan Cloudinary instan di halaman invoice.",
  },
  {
    category: "template",
    question: "Apakah template boleh digunakan untuk proyek komersial klien saya?",
    answer:
      "Boleh! Lisensi komersial Crisanthera mengizinkan penggunaan source code untuk proyek pribadi maupun proyek berbayar untuk klien Anda. Satu-satunya batasan adalah dilarang mendistribusikan ulang atau menjual kembali source code mentah sebagai template mandiri.",
  },
  {
    category: "pengiriman",
    question: "Berapa lama estimasi pengiriman pesanan stiker fisik?",
    answer:
      "Pesanan stiker diproses dan dikemas rapi dengan pelindung kardus kaku pada H+1 setelah konfirmasi pembayaran. Pengiriman via JNE Regular, J&T Express, atau SiCepat memakan waktu 1–3 hari untuk area Jabodetabek/Pulau Jawa dan 2–5 hari untuk luar pulau.",
  },
  {
    category: "pengiriman",
    question: "Bagaimana cara melacak nomor resi kurir saya?",
    answer:
      "Anda dapat membuka menu Akun -> Riwayat Pesanan di akun Crisanthera Anda. Di sana tertera status live kurir dan nomor resi pengiriman yang dapat disalin.",
  },
];

export default function SupportPage() {
  const { showToast } = useToastStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"all" | "stiker" | "template" | "pengiriman">("all");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const filteredFaqs =
    activeTab === "all" ? faqs : faqs.filter((f) => f.category === activeTab);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setName("");
      setEmail("");
      setOrderId("");
      setMessage("");
      showToast("Tiket bantuan telah terkirim! Tim kami akan menghubungi email Anda dalam 1x24 jam.", "success");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a1f68b]/15 text-[#a1f68b] border border-[#a1f68b]/30 shadow-[0_0_20px_rgba(161,246,139,0.2)]">
          <HelpCircle size={28} />
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl tracking-tight">
          Pusat Bantuan & FAQ
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Temukan jawaban seputar spesifikasi stiker vinyl tahan air, lisensi template Next.js, atau hubungi tim bantuan kami.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "all"
              ? "bg-white text-slate-950 shadow-md font-bold"
              : "border border-white/10 bg-[#181b28] text-slate-400 hover:text-white"
          }`}
        >
          Semua Topik
        </button>
        <button
          onClick={() => setActiveTab("stiker")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "stiker"
              ? "bg-white text-slate-950 shadow-md font-bold"
              : "border border-white/10 bg-[#181b28] text-slate-400 hover:text-white"
          }`}
        >
          <Package size={13} /> Stiker Vinyl
        </button>
        <button
          onClick={() => setActiveTab("template")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "template"
              ? "bg-white text-slate-950 shadow-md font-bold"
              : "border border-white/10 bg-[#181b28] text-slate-400 hover:text-white"
          }`}
        >
          <Code2 size={13} /> Template Next.js
        </button>
        <button
          onClick={() => setActiveTab("pengiriman")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "pengiriman"
              ? "bg-white text-slate-950 shadow-md font-bold"
              : "border border-white/10 bg-[#181b28] text-slate-400 hover:text-white"
          }`}
        >
          <ShieldCheck size={13} /> Pengiriman & Garansi
        </button>
      </div>

      {/* Accordion FAQ Bento Cards */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className="bento-card overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="text-xs sm:text-sm font-bold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#a1f68b]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-white/[0.06] bg-[#0b0c12]/50 p-5 text-xs text-slate-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ticket Support Form */}
      <div className="rounded-3xl border border-white/10 bg-[#151722] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#a1f68b]">
            <MessageSquare size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Butuh Bantuan Lebih Lanjut?</h2>
            <p className="text-xs text-slate-400">Kirimkan pesan ke tim teknis & customer care Crisanthera.</p>
          </div>
        </div>

        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Alamat Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Nomor Pesanan (Opsional)</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Contoh: ORD-1731-ABCD"
              className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Pertanyaan atau Kendala</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan detail pertanyaan atau kendala yang Anda alami..."
              className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSending}
              className="flex items-center gap-2 rounded-full bg-[#a1f68b] text-slate-950 px-6 py-2.5 text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <Send size={13} />
              <span>{isSending ? "Mengirimkan..." : "Kirim Tiket Bantuan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

