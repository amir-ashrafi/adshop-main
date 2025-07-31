import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get current user to check if they're admin
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get recent orders with user information
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        userId: true,
        total: true,
        createdAt: true,
        status: true
      }
    });

    // گرفتن اطلاعات واقعی کاربر از Clerk
    const userIds = [...new Set(recentOrders.map((order) => order.userId))];
    const users = await Promise.all(
      userIds.map(async (id) => {
        try {
          const user = await clerkClient.users.getUser(id);
          let name = user.fullName;
          if (!name || name.trim() === '') {
            name = ((user.firstName || '') + ' ' + (user.lastName || '')).trim();
          }
          if (!name || name.trim() === '') {
            name = user.username || '';
          }
          let email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '';
          if (!name || name.trim() === '') {
            name = email;
          }
          return { id, name, email };
        } catch {
          return { id, name: 'کاربر حذف شده', email: 'اطلاعات یافت نشد' };
        }
      })
    );
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    // Transform orders into customer data
    const customers = recentOrders.map((order) => {
      const user = userMap[order.userId];
      return {
        name: user?.name || 'کاربر حذف شده',
        email: user?.email || 'اطلاعات یافت نشد',
        orderId: order.id,
        total: order.total,
        date: order.createdAt,
        status: order.status
      };
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 