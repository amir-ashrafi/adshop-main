import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // get action by prisma
  const result = await prisma.product.findMany({ include: { images: true } });

  return NextResponse.json({
    data: result,
  });
}
// POST / PUT / DELETE
