'use client'

import * as React from "react";
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowDownLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton"; // ← افزودن Skeleton

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export default function BlogPreviewCarousel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data.slice(0, 6));
        setIsLoading(false);
      });
  }, []);

  return (
    <section className=" p-3 border border-blue-600 my-5 rounded-xl ">
      <div className="flex justify-between items-center flex-row mb-4">
        <Link href="/blog" className="text-blue-600 flex items-center hover:underline font-medium text-xs">
          <ArrowDownLeft className="ml-1 w-4 h-4" />
          نمایش بیشتر در بلاگ
        </Link>
        <h2 className="text-sm font-bold">از وبلاگ اشرفی تک</h2>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-1 max-h-96">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 basis-2/3  sm:bottom-1/2 md:basis-2/5 lg:basis-1/4">
                  <Card>
                    <CardContent className="p-3 space-y-2">
                      <Skeleton className="w-full h-40 rounded" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            : posts.map((post) => (
                <CarouselItem key={post.id} className=" pl-1 text-right  sm:basis-2/3 sm:bottom-1/2 md:basis-2/5 lg:basis-1/4">
                  <div className="p-1">
                    <Link href={`/blog/${post.id}`} className="block hover:opacity-90 transition-all">
                      <Card >
                        <CardContent className="p-3 space-y-2">
                          {post.image && (
                            <Image
                            width={500}
                            height={500}
                              src={post.image}
                              alt={post.title}
                              className="w-full h-40 object-cover rounded"
                            />
                          )}
                          <h3 className="font-semibold text-base">{post.title}</h3>
                          <p className="text-sm text-right rtl text-gray-600 mb-3 leading-relaxed">
                <span dir="rtl">
                  {post.content.slice(0, 80)}
                  <span dir="ltr">…</span>
                </span>
              </p>
                          <span className="text-xs text-gray-400 block">
                            {new Date(post.createdAt).toLocaleDateString('fa-IR')}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
