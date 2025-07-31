import { PrismaClient, ProductCategory, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // محصولات اولیه و سفارشات اولیه حذف شدند؛ دیتابیس بدون داده seed می‌شود
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });