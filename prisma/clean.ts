import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log("🧹 Memulai pembersihan database Neon PostgreSQL...");

  // Delete in order to satisfy foreign key constraints
  const deletedDownloads = await prisma.digitalDownload.deleteMany();
  console.log(`✓ Menghapus ${deletedDownloads.count} catatan digital download`);

  const deletedOrderItems = await prisma.orderItem.deleteMany();
  console.log(`✓ Menghapus ${deletedOrderItems.count} catatan order items`);

  const deletedOrders = await prisma.order.deleteMany();
  console.log(`✓ Menghapus ${deletedOrders.count} catatan orders`);

  const deletedVariants = await prisma.productVariant.deleteMany();
  console.log(`✓ Menghapus ${deletedVariants.count} catatan varian produk`);

  const deletedProducts = await prisma.product.deleteMany();
  console.log(`✓ Menghapus ${deletedProducts.count} catatan produk`);

  const deletedUsers = await prisma.user.deleteMany();
  console.log(`✓ Menghapus ${deletedUsers.count} catatan user`);

  console.log("✨ Database Neon berhasil dibersihkan total!");
}

main()
  .catch((e) => {
    console.error("Gagal membersihkan database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

