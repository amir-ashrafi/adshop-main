"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import UploadBlogImage from '../../UploadBlogImage';
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';

export default function EditBlogPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/blog?id=${id}`)
      .then(res => res.json())
      .then(post => {
        setTitle(post.title ?? '');
        setContent(post.content ?? '');
        setImage(post.image ?? '');
        setPublished(post.published ?? true);
        setLoaded(true);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, content, image, published }),
    });
    setLoading(false);
    router.push('/dashboard/blog');
  }

  return (
    <main className="max-w-xl mx-auto py-8 px-4 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">ویرایش پست وبلاگ</h1>

      {!loaded ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      ) : (
        <>
          <UploadBlogImage blogId={id as string} image={image} setImage={setImage} />

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="عنوان پست"
              className="w-full border bg-white/90 focus:bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-white"
            />

            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              placeholder="متن پست"
              className="w-full focus:shadow-md bg-white/90 focus:bg-white focus:shadow-white border border-gray-300 rounded-md p-2 min-h-[120px] resize-y focus:outline-none"
            />

            <input
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="آدرس تصویر (اختیاری)"
              className="w-full border bg-white/90 focus:bg-white focus:shadow-md focus:shadow-white border-gray-300 rounded-md p-2 focus:outline-none"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={published}
                onChange={e => setPublished(e.target.checked)}
                className="accent-blue-600 w-4 h-4 focus:shadow-md focus:shadow-white focus:bg-white/80"
              />
              انتشار
            </label>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition ${
                loading
                  ? 'bg-white text-blue-600 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-white/80'
              }`}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'در حال ذخیره...' : 'ذخیره'}
            </Button>
          </form>
        </>
      )}
    </main>
  );
}
