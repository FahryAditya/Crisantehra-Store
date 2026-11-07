import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { MOCK_PRODUCTS } from "../src/data/mock-products";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log("Memulai seeding database Neon...");

  // Clear existing products to prevent unique constraint conflict
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

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

    console.log(`✓ Ditambahkan: ${product.name} (${product.type})`);
  }

  const count = await prisma.product.count();
  console.log(`\nBerhasil mengisi database Neon dengan ${count} produk!`);
}

main()
  .catch((e) => {
    console.error("Gagal melakukan seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

