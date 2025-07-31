import { prisma } from '@/lib/prisma';

export async function getBlogById(id: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog?id=${id}`, {
      cache: 'no-store', // یا 'force-cache' بسته به نیاز
    });
  
    if (!res.ok) return null;
  
    return res.json();
  }
  