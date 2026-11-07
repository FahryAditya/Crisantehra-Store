import "dotenv/config";
import * as argon2 from "argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { MOCK_PRODUCTS } from "../src/data/mock-products";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log("🌱 Memulai official seeder untuk Neon PostgreSQL...");

  // 1. Clear existing products to ensure clean state
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Super Admin User
  const adminHashedPassword = await argon2.hash("AdminCrisanthera2026!", {
    type: argon2.argon2id,
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@crisanthera.store",
      password: adminHashedPassword,
      name: "Fahry Aditya",
      phone: "+62 811-0000-8888",
      role: "ADMIN",
    },
  });
  console.log(`✓ Super Admin dibuat: ${admin.email} (Role: ${admin.role})`);

  // 3. Create Customer Demo User
  const customerHashedPassword = await argon2.hash("AlyaCustomer2026!", {
    type: argon2.argon2id,
  });

  const customer = await prisma.user.create({
    data: {
      email: "alya@crisanthera.store",
      password: customerHashedPassword,
      name: "Alya Renanta",
      phone: "+62 812-3456-7890",
      role: "CUSTOMER",
    },
  });
  console.log(`✓ Customer Demo dibuat: ${customer.email} (Role: ${customer.role})`);

  // 4. Seed Official Products
  for (const item of MOCK_PRODUCTS) {
    const product = await prisma.product.create({
      data: {
        id: item.id,
        slug: item.slug,
        name: item.name,
        type: item.type === "sticker" ? "STICKER" : "TEMPLATE",
        tagline: item.tagline,
        description: item.description,
        price: item.price,
        originalPrice: item.originalPrice,
        rating: item.rating,
        reviewsCount: item.reviewsCount,
        featured: item.featured || false,
        isNew: item.isNew || false,
        isBestSeller: item.isBestSeller || false,
        stock: item.stock,
        images: item.images,
        tags: item.tags,
        themeAura: item.themeAura,
        dimensions: item.dimensions,
        finish: item.finish,
        waterproof: item.waterproof ?? true,
        framework: item.framework,
        version: item.version,
        techStack: item.techStack || [],
        demoUrl: item.demoUrl,
        variants: {
          create: item.variants.map((v) => ({
            id: v.id,
            name: v.name,
            priceOffset: v.priceOffset || 0,
          })),
        },
      },
    });

    console.log(`✓ Produk dimasukkan: ${product.name} (${product.type})`);
  }

  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();
  console.log(`\n✨ Seeding sukses: ${userCount} users, ${productCount} products resmi di Neon DB!`);
}

main()
  .catch((e) => {
    console.error("Gagal melakukan seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
