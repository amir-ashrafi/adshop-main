import { BlogPost } from '@/types';
import Image from 'next/image';
export default function BlogDetail(post: BlogPost) {
  return (
    <article className="max-w-3xl text-right mx-auto py-4 px-4 bg-white rounded-xl shadow-sm">
      {post.image && (
        <div className="w-full h-72 mb-6 overflow-hidden rounded-xl">
          <Image
          height={500}
          width={500}
            src={post.image}
            alt={post.title}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-snug tracking-tight font-vazir">
        {post.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        تاریخ انتشار: {new Date(post.createdAt).toLocaleDateString('fa-IR')}
      </p>

      <div className="prose prose-sm sm:prose-base lg:prose-lg prose-h2:text-gray-800 prose-p:text-gray-700 leading-relaxed whitespace-pre-line font-vazir">
        {post.content}
      </div>
    </article>
  );
}
