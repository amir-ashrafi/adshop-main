"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Pencil, Trash } from "lucide-react";
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export default function DashboardBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog?all=1')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('آیا از حذف این پست مطمئن هستید؟')) return;
    await fetch('/api/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setPosts(posts => posts.filter(p => p.id !== id));
  }

  const SkeletonCard = () => (
    <div className="animate-pulse border rounded-lg p-4 bg-white shadow flex flex-col md:flex-row gap-4 rtl">
      <div className="bg-gray-300 w-full md:w-32 h-24 rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-2 bg-gray-100 rounded w-1/4 mt-2" />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="h-4 w-16 bg-gray-300 rounded" />
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 rtl" dir="rtl">
      <div className="w-full flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">مدیریت وبلاگ</h1>

        <Link href="/dashboard/blog/new">
          <Button variant="outline" className="py-5 text-black border-2 border-white border-b-slate-500 hover:border-white duration-500 hover:bg-black hover:text-white w-28 sm:w-auto">
            افزودن پست جدید
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 mt-6 grid-cols-1 lg:grid-cols-2">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : posts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">پستی وجود ندارد.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 bg-slate-200 shadow flex flex-col sm:flex-row-reverse gap-4"
            >
                {post.image && (
                <Image
                  height={500}
                  width={500}
                  src={post.image}
                  alt={post.title}
                  className="w-full block sm:hidden sm:h-24 h-48 object-cover rounded"
                />
              )}
              <div className="flex-1 flex flex-col justify-between text-right">
                <div>
                  <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
                  <p className="text-sm mb-2 text-slate-700 line-clamp-3">
                    {post.content.slice(0, 80)}...
                  </p>
                </div>
                <span className="text-xs text-slate-600 mt-2">
                  {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <div className='flex flex-col gap-2'>
                {post.image && (
                <Image
                  height={500}
                  width={500}
                  src={post.image}
                  alt={post.title}
                  className="w-full hidden sm:block sm:h-24 h-48 object-cover rounded"
                />
              )}
              <div className="flex  flex-row gap-2 items-center justify-center">
                {/* دکمه ویرایش */}
                <Link href={`/dashboard/blog/edit/${post.id}`} className="w-full sm:w-24">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-colors duration-200 w-full"
                  >
                    <Pencil className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">ویرایش</span>
                  </Button>
                </Link>

                {/* دکمه حذف */}
                <Button
                  onClick={() => handleDelete(post.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 w-full sm:w-24"
                >
                  <Trash className="w-4 h-4" />
                  <span className="text-sm font-medium">حذف</span>
                </Button>
              </div>
              </div>
              

            </div>
          ))
        )}
      </div>
    </main>
  );
}
