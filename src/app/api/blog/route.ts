import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    return NextResponse.json(post);
  }
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 5, // فقط ۵ پست آخر برای پیش‌نمایش
  });
  return NextResponse.json(posts);
}

// POST: ایجاد پست جدید
export async function POST(req: NextRequest) {
  const { title, content, image, published } = await req.json();
  const post = await prisma.blogPost.create({
    data: { title, content, image, published: !!published },
  });
  return NextResponse.json(post);
}

// PUT: ویرایش پست (id باید در body باشد)
export async function PUT(req: NextRequest) {
  const { id, title, content, image, published } = await req.json();
  const post = await prisma.blogPost.update({
    where: { id },
    data: { title, content, image, published: !!published },
  });
  return NextResponse.json(post);
}

// DELETE: حذف پست (id باید در body باشد)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 