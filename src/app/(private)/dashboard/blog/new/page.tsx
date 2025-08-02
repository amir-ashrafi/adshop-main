"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from '@/components/ui';
import Image from 'next/image';
export default function NewBlogPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    // برای بلاگ جدید id نداریم، پس یک id موقت تولید می‌کنیم
    const tempId = crypto.randomUUID();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('blogId', tempId);
    const res = await fetch('/api/blog-image', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) setImage(data.url);
    setFile(null);
    setLoading(false);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, image, published }),
    });
    setLoading(false);
    router.push('/dashboard/blog');
  }

  return (
    <main className="max-w-2xl mx-auto mt-5 p-6 bg-gradient-to-br from-green-500 via-emerald-500 to-sky-500 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-6 text-white text-center">افزودن پست جدید</h1>

  <div className="space-y-6">
    {/* آپلود تصویر */}
    <div>
      <Label htmlFor="blog-image" className=" mb-2 font-medium text-white w-full flex justify-center">تصویر بلاگ</Label>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          id="blog-image"
          type="file"
          accept="image/*"
          onChange={handleChangeFile}
          className="w-full sm:w-auto flex-1 bg-white"
        />
        <Button
          type="button"
          onClick={handleUpload}
          disabled={loading || !file}
          className="whitespace-nowrap bg-white text-black hover:text-black hover:bg-black"
        >
          {loading ? 'در حال آپلود...' : 'آپلود تصویر'}
        </Button>
      </div>
      {image && (
        <Image
          src={image}
          alt="blog"
          width={100}
          height={100}
          className="mt-4 rounded-md w-48 h-32 object-cover border"
        />
      )}
    </div>

    {/* فرم پست */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        placeholder="عنوان پست"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        placeholder="متن پست"
        className="w-full border border-gray-300 rounded px-3 py-2 min-h-[120px] focus:outline-none focus:ring focus:border-blue-500"
      />
      <input
        value={image}
        onChange={e => setImage(e.target.value)}
        placeholder="آدرس تصویر (اختیاری)"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={published}
          onChange={e => setPublished(e.target.checked)}
        />
        انتشار
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-blue-400 px-4 py-2 rounded hover:bg-blue-200 hover:text-white transition"
      >
        {loading ? 'در حال ذخیره...' : 'ذخیره'}
      </button>
    </form>
  </div>
</main>

  );
} 