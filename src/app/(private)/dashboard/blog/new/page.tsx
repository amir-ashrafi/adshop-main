"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle,Label,Textarea,CardDescription,Input,Button } from "@/components/ui";
export default function NewBlogPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
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
    const tempId = crypto.randomUUID();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("blogId", tempId);
    const res = await fetch("/api/blog-image", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setImage(data.url);
    setFile(null);
    setLoading(false);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image, published }),
    });
    setLoading(false);
    router.push("/dashboard/blog");
  }

  return (
    <main className="flex py-10 justify-center bg-white/5 p-6">
      <Card className="w-full max-w-2xl shadow-2xl border-none bg-gradient-to-br from-black to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            افزودن بلاگ جدید
          </CardTitle>
          <CardDescription className="text-white/80 w-full flex justify-center">اطلاعات بلاگ را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="blog-image" className="mb-2 font-medium w-full flex justify-center">
              تصویر بلاگ
            </Label>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Input
                id="blog-image"
                type="file"
                accept="image/*"
                onChange={handleChangeFile}
                className="bg-white text-black"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleUpload}
                disabled={loading || !file}
              >
                {loading ? "در حال آپلود..." : "آپلود تصویر"}
              </Button>
            </div>
            {image && (
              <Image
                src={image}
                alt="blog"
                width={500}
                height={500}
                className="mt-4 rounded-md w-48 h-32 object-cover border"
              />
            )}
          </div>

          {/* فرم پست */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="justify-end flex">عنوان بلاگ</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="عنوان پست"
                className="bg-white text-black text-right"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="content" className="flex justify-end">متن بلاگ</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="متن پست"
                className="min-h-[120px] text-right bg-white text-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="imageUrl" className="flex justify-end">آدرس تصویر (اختیاری)</Label>
              <Input
                id="imageUrl"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="text-black bg-white "
              />
            </div>

            <div className="flex justify-end items-center gap-2">
              <Checkbox
                id="published"
                checked={published}
                onCheckedChange={(checked) => setPublished(!!checked)}
                className="bg-white"
              />
              <Label htmlFor="published" className="text-right">انتشار</Label>
            </div>
            <div className="flex justify-around">
              <Button variant="outline" asChild className="bg-white py-5 text-black">
                <Link href="/dashboard/blog">بازگشت</Link>
              </Button>
              <Button
              type="submit"
              disabled={loading}
              variant="outline"
              className="py-5 text-black border-2 border-white border-b-slate-500 hover:border-white duration-500 hover:bg-black hover:text-white w-28 sm:w-auto"
            >
              {loading ? "در حال افزودن بلاگ..." : "افزودن بلاگ"}
            </Button>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
