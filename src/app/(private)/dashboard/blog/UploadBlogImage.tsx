"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Button, Input, Label } from '@/components/ui';

interface Props {
  blogId: string;
  image: string;
  setImage: (url: string) => void;
}

export default function UploadBlogImage({ blogId, image, setImage }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file || !blogId) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('blogId', blogId);
    const res = await fetch('/api/blog-image', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) setImage(data.url);
    setFile(null);
    setLoading(false);
  };

  return (
    <div className="w-full space-y-3">
      
      <Label className='flex justify-end text-white' htmlFor="blog-image">تصویر بلاگ</Label>
      <div className="flex gap-2 w-full justify-between">
        <Input className='bg-white/90  focus:bg-white text-black ' id="blog-image" type="file" accept="image/*" onChange={handleChangeFile} />
        <Button className='bg-white text-black hover:text-black hover:bg-white/90' type="button" onClick={handleUpload} disabled={loading || !file}>
          {loading ? 'در حال آپلود...' : 'آپلود تصویر'}
        </Button>
      </div>
      {image && (
        <Image height={100} width={100} src={image} alt="blog" className="mt-4 rounded-md w-40 h-32 object-cover" />
      )}
    </div>
  );
} 