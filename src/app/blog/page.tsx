import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
export const dynamic = 'force-dynamic';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  // Allow nulls returned from Prisma
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

interface SearchParams {
  search?: string;
}

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function BlogPage({ searchParams }: Props) {
  // Resolve the searchParams promise (even if undefined)
  const { search = '' } = (await searchParams) ?? {};

  const posts: BlogPost[] = await prisma.blogPost.findMany({
    where: {
      published: true,
      OR: search
        ? [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ]
        : undefined,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-6xl w-full mx-auto py-10 my-5 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        وبلاگ اشرفی تک
      </h1>

      <form method="get" className="mb-10 flex gap-3 items-center justify-center">
        <input
          name="search"
          defaultValue={search}
          placeholder="جستجو در عنوان یا متن..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          جستجو
        </button>
      </form>

      {posts.length === 0 && (
        <p className="text-center text-gray-500">
          هیچ پستی با این مشخصات یافت نشد.
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group border border-gray-100"
          >
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {post.content.slice(0, 120)}...
              </p>
              <span className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString('fa-IR')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
