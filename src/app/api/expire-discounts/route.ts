import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find all products with expired discounts
    const expiredProducts = await prisma.product.findMany({
      where: {
        discount: { gt: 0 },
        discountEndsAt: { lt: new Date() }
      },
      select: {
        id: true,
        name: true,
        discount: true,
        discountEndsAt: true
      }
    });

    if (expiredProducts.length === 0) {
      return NextResponse.json({ 
        message: 'No expired discounts found',
        expiredCount: 0 
      });
    }

    // Reset discount to 0 for expired products
    const updateResult = await prisma.product.updateMany({
      where: {
        discount: { gt: 0 },
        discountEndsAt: { lt: new Date() }
      },
      data: {
        discount: 0,
        discountEndsAt: null
      }
    });

    return NextResponse.json({
      message: 'Discounts expired successfully',
      expiredCount: updateResult.count,
      expiredProducts: expiredProducts.map(p => ({
        id: p.id,
        name: p.name,
        previousDiscount: p.discount,
        expiredAt: p.discountEndsAt
      }))
    });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error expiring discounts:', error);
    return NextResponse.json(
      { error: 'Failed to expire discounts' },
      { status: 500 }
    );
  }
}

// GET method to check for expired discounts without updating them
export async function GET() {
  try {
    const expiredProducts = await prisma.product.findMany({
      where: {
        discount: { gt: 0 },
        discountEndsAt: { lt: new Date() }
      },
      select: {
        id: true,
        name: true,
        discount: true,
        discountEndsAt: true
      }
    });

    return NextResponse.json({
      expiredCount: expiredProducts.length,
      expiredProducts: expiredProducts.map(p => ({
        id: p.id,
        name: p.name,
        discount: p.discount,
        expiredAt: p.discountEndsAt
      }))
    });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error checking expired discounts:', error);
    return NextResponse.json(
      { error: 'Failed to check expired discounts' },
      { status: 500 }
    );
  }
} 