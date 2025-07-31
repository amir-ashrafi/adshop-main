import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get current user to check if they're admin
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get unique user count from orders (this represents customers who have made orders)
    const uniqueUsers = await prisma.order.groupBy({
      by: ['userId'],
      _count: {
        userId: true
      }
    });
    const userCount = uniqueUsers.length;

    // Get product count from Prisma
    const productCount = await prisma.product.count();

    // Get order count from Prisma
    const orderCount = await prisma.order.count();

    // Get total income from paid orders
    const totalIncomeResult = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: 'PAID' },
    });

    const totalIncome = totalIncomeResult._sum.total || 0;

    return NextResponse.json({
      users: userCount,
      products: productCount,
      orders: orderCount,
      income: totalIncome,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}