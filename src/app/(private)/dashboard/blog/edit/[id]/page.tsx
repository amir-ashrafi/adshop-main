"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import UploadBlogImage from '../../UploadBlogImage';
import { Button ,CardHeader,CardTitle,CardContent,CardDescription,Label,Textarea,Input,Card } from '@/components/ui';
import { Loader2 } from "lucide-react";
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
    <main className="flex py-10 justify-center bg-white/5 p-6">
      <Card className="w-full max-w-2xl shadow-2xl border-none bg-gradient-to-br from-black to-blue-800 text-white">
      <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
             ویرایش بلاگ
          </CardTitle>
          <CardDescription className="text-white/80 w-full flex justify-center">اطلاعات بلاگ را وارد کنید</CardDescription>
      </CardHeader>

  {!loaded ? (
    <div className="flex justify-center py-20">
      <Loader2 className="w-6 h-6 text-white animate-spin" />
    </div>
  ) : (
    <>
      <CardContent>
      <form onSubmit={handleSubmit} className="space-y-5 mt-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="title" className="flex justify-end w-full">عنوان بلاگ</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="عنوان پست"
            className="text-black text-right bg-white/90 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="flex justify-end w-full">متن بلاگ</Label>
          <Textarea
            id="content"
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            placeholder="متن پست"
            className="text-black text-right bg-white/90 focus:bg-white min-h-[120px] resize-y"
          />
        </div>

          <UploadBlogImage blogId={id as string} image={image} setImage={setImage} />
        <div className="space-y-1">
          <Label htmlFor="image" className="flex justify-end w-full">آدرس تصویر (اختیاری)</Label>
          <Input
            id="image"
            name="image"
            value={image}
            onChange={e => setImage(e.target.value)}
            placeholder="آدرس تصویر (اختیاری)"
            className="text-black text-right bg-white/90 focus:bg-white"
            />
        </div>

        <div className="flex items-center justify-end gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="accent-blue-600 w-4 h-4 focus:shadow-md focus:shadow-white focus:bg-white/80"
          />
          <Label htmlFor="published" className="select-none cursor-pointer text-sm">انتشار</Label>
        </div>
        <div className='flex justify-around'>
          <Button variant="outline" asChild className="bg-white py-5 text-black">
                <Link href="/dashboard/blog">بازگشت</Link>
              </Button>
              <Button
          type="submit"
          variant='outline'
          disabled={loading}
          className={`py-5 text-black border-2 border-white border-b-slate-500 hover:border-white duration-500 hover:bg-black hover:text-white w-28 sm:w-auto `}
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? 'در حال ذخیره...' : 'افزودن بلاگ'}
        </Button>
        </div>
        
      </form>
      </CardContent>
    </>
  )}
  </Card>
</main>
  );
}
