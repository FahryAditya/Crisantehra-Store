import "server-only";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL;

if (!connectionString && process.env.NODE_ENV !== "production") {
  console.warn(
    "⚠️ [Prisma] DATABASE_URL tidak ditemukan di process.env! Pastikan .env / .env.local terisi dan restart development server (npm run dev)."
  );
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString:
        connectionString ||
        "postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=public",
    }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
