'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ProductsWithImages } from '@/types'; 
import { useCart } from '@/hooks/useCart';
import {
  isDiscountValid,
  getEffectiveDiscount,
  getDiscountedPrice,
} from '@/lib/utils';

// این خط رو حذف کردم چون conflict ایجاد می‌کرد
// import { ProductCategory } from '@/types';

// برای حل مشکل نوع دسته‌بندی، به جای مقدار رشته، از enum یا union-type که Prisma تولید می‌کند استفاده کن
// اگر می‌خواهی مقدار پیشفرض داشته باشی، بهتر است مقدار null یا undefined باشه و قبل از نمایش بررسی شود

export default function ProductDetail({
  id,
  name,
  images = [],
  price,
  discount = null,
  discountEndsAt = null,
  quantity = 0,
  category,
  description,
}: ProductsWithImages) {
  const { addToCartMutation } = useCart();

  // مقدار امن برای قیمت در صورت null بودن
  const safePrice = price ?? 0;

  const effectiveDiscount = getEffectiveDiscount(discount, discountEndsAt);
  const discountedPrice = getDiscountedPrice(safePrice, discount, discountEndsAt);
  const hasValidDiscount = isDiscountValid(discountEndsAt) && effectiveDiscount > 0;

  // چون ممکن است isLoading وجود نداشته باشد، بهتر است چک کنیم و پیشفرض false بگذاریم
  const isLoading = (addToCartMutation as any).isLoading ?? false;

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex justify-center text-gray-800">
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {images.length > 0 ? (
                <Image
                  src={images[0].image}
                  alt={name}
                  width={500}
                  height={500}
                  quality={70}
                  className="rounded-lg object-cover w-full h-[400px]"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 justify-between">
              {hasValidDiscount ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </p>
                  <p className="text-lg line-through text-gray-400">
                    ${safePrice.toFixed(2)}
                  </p>
                  <span className="inline-block bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                    {effectiveDiscount}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-semibold text-gray-800">
                  ${safePrice.toFixed(2)}
                </p>
              )}

              <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
              <p className="text-sm text-gray-500">Category: {category ?? 'Uncategorized'}</p>

              <p className="text-gray-700 text-sm line-clamp-4">
                {description || 'No description available.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => addToCartMutation.mutate(id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'در حال افزودن...' : 'افزودن به سبد'}
                  <ShoppingCart className="ml-2 w-5 h-5" />
                </Button>

                <Button variant="secondary" asChild className="w-full sm:w-auto">
                  <Link href="/products">بازگشت به محصولات</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
