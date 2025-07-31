import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function GET() {
  try {
    // Get current user to check if they're admin
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get orders with their items and product details
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: {
                  select: {
                    image: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get unique userIds
    const userIds = [...new Set(orders.map((order: any) => order.userId))];
    // Fetch user info from Clerk
    const users = await Promise.all(
      userIds.map(async (id: string) => {
        try {
          const user = await clerkClient.users.getUser(id);
          // Get best name
          let name = user.fullName;
          if (!name || name.trim() === '') {
            name = ((user.firstName || '') + ' ' + (user.lastName || '')).trim();
          }
          if (!name || name.trim() === '') {
            name = user.username || '';
          }
          // Get best email
          const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || 'Unknown';
          if (!name || name.trim() === '') {
            name = email;
          }
          return {
            id,
            name,
            email,
          };
        } catch {
          return { id, name: 'Unknown', email: '' };
        }
      })
    );
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    // Sort orders by createdAt ascending for orderNumber
    const sortedOrders = [...orders].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const orderIdToNumber = Object.fromEntries(sortedOrders.map((order, idx) => [order.id, idx + 1]));

    // Transform the data to match the expected format
    const transformedOrders = orders.map((order: any) => {
      const user = userMap[order.userId];
      let customer = 'کاربر حذف شده';
      let customerEmail = 'اطلاعات یافت نشد';
      if (user) {
        if (user.name && user.name !== 'Unknown') {
          customer = user.name;
        } else if (user.email) {
          customer = user.email;
        }
        if (user.email) {
          customerEmail = user.email;
        }
      }
      return {
        id: order.id,
        userId: order.userId,
        orderNumber: orderIdToNumber[order.id],
        customer,
        customerEmail,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        items: order.items.map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0]?.image || null,
          },
        })),
      };
    });

    return NextResponse.json(transformedOrders);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error occurred:',error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !['PAID', 'SHIPPED', 'DELIVERED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update order status:', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}