import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const blogId = formData.get('blogId') as string;

  if (!file || !blogId) {
    return NextResponse.json({ error: 'Missing file or blog id' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public/assets/blog', blogId);
  await mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);
  const fileUrl = `/assets/blog/${blogId}/${file.name}`;

  return NextResponse.json({ message: 'File Uploaded Successfully', url: fileUrl });
} 