// /app/api/blog-image/route.ts
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'blogs' }, (err, result) => {
          if (err || !result) return reject(err)
          resolve(result)
        })
        .end(buffer)
    })

    return NextResponse.json({
      message: 'File Uploaded to Cloudinary',
      url: (result as any).secure_url,
    })
  }  catch (err) {
  console.error('Upload error:', err);
  return NextResponse.json({ error: 'Upload failed', details: String(err) }, { status: 500 });
}
}
