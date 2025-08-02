// /app/api/image/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// =============== POST ===============
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const productId = formData.get('productId') as string;

  if (!file || !productId) {
    return NextResponse.json({ error: 'Missing file or product id' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'products' }, (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    const url = (uploadResult as any).secure_url;
    const publicId = (uploadResult as any).public_id;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        images: {
          create: {
            image: url,
            cloudinaryId: publicId, // ذخیره Cloudinary ID برای حذف بعدی
          },
        },
      },
      include: { images: true },
    });

    return NextResponse.json({
      message: 'File uploaded to Cloudinary',
      data: updatedProduct.images,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 });
  }
}

// =============== GET ===============
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
  }

  const images = await prisma.image.findMany({ where: { productId } });

  return NextResponse.json({ images });
}

// =============== DELETE ===============
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get('imageId');

  if (!imageId) {
    return NextResponse.json({ error: 'Missing image id' }, { status: 400 });
  }

  const image = await prisma.image.findUnique({
    where: { id: imageId },
    include: { Product: true },
  });

  if (!image) {
    return NextResponse.json({ error: 'Invalid image id' }, { status: 404 });
  }

  try {
    // حذف از Cloudinary
    if (image.cloudinaryId) {
      await cloudinary.uploader.destroy(image.cloudinaryId);
    }

    // حذف از دیتابیس
    await prisma.image.delete({ where: { id: imageId } });

    return NextResponse.json({
      message: 'Image deleted successfully',
      data: image.productId,
    });
  } catch (error) {
    console.error('Deletion error:', error);
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}
