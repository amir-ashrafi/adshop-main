import {  NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function POST() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // دریافت آیتم‌های سبد خرید کاربر
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
  if (!cartItems.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  // محاسبه مجموع قیمت
  const total = cartItems.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  // ساخت سفارش و آیتم‌های سفارش در یک تراکنش
  const order = await prisma.order.create({
    data: {
      userId,
      total,
      status: 'PAID',
      items: {
        create: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price || 0,
        })),
      },
    },
    include: {
      items: { include: { product: true } },
    },
  });

  // پاک کردن سبد خرید کاربر
  await prisma.cartItem.deleteMany({ where: { userId } });

  return NextResponse.json({ order });
}
 