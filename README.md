# Next.js Project

Stack: Next.js 16 (App Router, src/), Tailwind CSS v4, lucide-react, zustand, motion, TanStack Query, Prisma 7, Zod, Argon2.

## Mulai
```bash
npm install        # otomatis menjalankan prisma generate
# isi DATABASE_URL di .env
npm run dev
```

## Struktur penting
- `src/components/providers.tsx` — QueryClientProvider (dipakai di layout)
- `src/stores/counter.ts` — contoh store zustand
- `src/lib/prisma.ts` — Prisma client (adapter pg), server-only
- `src/lib/password.ts` — hash/verify Argon2, server-only
- `prisma/schema.prisma` + `prisma.config.ts`
