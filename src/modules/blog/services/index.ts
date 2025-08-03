// import { prisma } from '@/lib/prisma';

export async function getBlogById(id: string) {
    const baseUrl = process.env.BASE_URL;
    const res = await fetch(`${baseUrl}/api/blog?id=${id}`, {
      cache: 'no-store', // یا 'force-cache' بسته به نیاز
    });
  
    if (!res.ok) return null;
  
    return res.json();
  }
  