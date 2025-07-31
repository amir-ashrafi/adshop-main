import { Metadata } from 'next';
import { getBlogById } from '@/modules/blog/services';
import BlogDetail from '@/components/blog/BlogDetail';
import customMetadataGenerator from '@/lib/metadata';
import { BlogPost } from '@/types';

// 🟢 اصلاح تایپ ورودی
type PageProps = {
  params: {
    id: string;
  };
};

// ✅ metadata generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = (await getBlogById(params.id)) as BlogPost;

  if (!blog) {
    return customMetadataGenerator({ title: 'پست یافت نشد' });
  }

  return customMetadataGenerator({
    title: blog.title,
    description: blog.content.slice(0, 150),
    images: blog.image ? [blog.image] : [],
  });
}

// ✅ صفحه اصلی
export default async function Page({ params }: PageProps) {
  const blog = (await getBlogById(params.id)) as BlogPost;

  if (!blog) {
    return (
      <section className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-red-600 mb-4">پست مورد نظر پیدا نشد ❌</h1>
        <p className="text-gray-500">لینک یا شناسه این پست ممکن است اشتباه باشد.</p>
      </section>
    );
  }

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.image,
    datePublished: blog.createdAt,
    articleBody: blog.content,
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 bg-white rounded-xl shadow-sm font-vazir">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetail {...blog} />
    </section>
  );
}
