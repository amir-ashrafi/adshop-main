import type { Metadata } from 'next'
import { getBlogById } from '@/modules/blog/services'
import BlogDetail from '@/components/blog/BlogDetail'
import customMetadataGenerator from '@/lib/metadata'
import { BlogPost } from '@/types'

// generateMetadata
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const blog = (await getBlogById(params.id)) as BlogPost | null

  if (!blog) {
    return customMetadataGenerator({ title: 'پست یافت نشد' })
  }

  return customMetadataGenerator({
    title: blog.title,
    description: blog.content.slice(0, 150),
    images: blog.image
      ? [{ image: blog.image, id: 'blog-image', productId: null }]
      : [],
  })
}

// صفحه اصلی
export default async function BlogPage(
  { params }: { params: { id: string } }
) {
  const blog = (await getBlogById(params.id)) as BlogPost | null

  if (!blog) {
    return (
      <section className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          پست مورد نظر پیدا نشد ❌
        </h1>
        <p className="text-gray-500">
          لینک یا شناسه این پست ممکن است اشتباه باشد.
        </p>
      </section>
    )
  }

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.image,
    datePublished: blog.createdAt,
    articleBody: blog.content,
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 bg-white rounded-xl shadow-sm font-vazir">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetail {...blog} />
    </section>
  )
}
