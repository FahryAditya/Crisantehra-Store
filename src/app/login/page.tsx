"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Login berhasil! Mengarahkan ke halaman utama...");
      router.push("/");
    }, 800);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md items-center justify-center px-4 py-12">
      <div className="w-full space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_0_20px_var(--primary-glow)]">
            <Sparkles size={22} />
          </div>
          <h1 className="text-2xl font-black text-foreground">Masuk ke Akun</h1>
          <p className="text-xs text-muted">
            Akses pustaka template digital dan riwayat pesanan stiker kamu.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-muted font-semibold">Alamat Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-border bg-surface-secondary pl-10 pr-3.5 py-2.5 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-muted font-semibold">Kata Sandi</label>
              <Link href="#" className="text-[11px] text-primary hover:underline">
                Lupa sandi?
              </Link>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-surface-secondary pl-10 pr-10 py-2.5 text-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-[0_0_15px_var(--primary-glow)] transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Masuk Sekarang"}
          </button>
        </form>

        <div className="border-t border-border pt-4 text-center text-xs text-muted">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Daftar Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
}

