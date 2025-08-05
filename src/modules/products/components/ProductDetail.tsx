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

  const safePrice = price ?? 0;
  const effectiveDiscount = getEffectiveDiscount(discount, discountEndsAt);
  const discountedPrice = getDiscountedPrice(safePrice, discount, discountEndsAt);
  const hasValidDiscount = isDiscountValid(discountEndsAt) && effectiveDiscount > 0;
  const isLoading = (addToCartMutation as any).isLoading ?? false;

  return (
    <div className="container mx-auto py-10 px-4" dir="rtl">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              {images.length > 0 ? (
                <Image
                  src={images[0].image}
                  alt={name}
                  width={500}
                  height={500}
                  quality={70}
                  className="rounded-lg object-cover w-full h-[300px] md:h-[400px]"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                  تصویری موجود نیست
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 justify-between">
              {hasValidDiscount ? (
                <div className="space-y-2 text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${discountedPrice.toFixed(2)} 
                  </p>
                  <p className="text-lg line-through text-gray-400">
                    ${safePrice.toFixed(2)} 
                  </p>
                  <span className="inline-block bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                    {effectiveDiscount}٪ تخفیف
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-semibold text-gray-800 text-right">
                  ${safePrice.toFixed(2)} 
                </p>
              )}

              <p className="text-sm text-gray-600 text-right">تعداد موجود: {quantity}</p>
              <p className="text-sm text-gray-500 text-right">
                دسته‌بندی: {category ?? 'نامشخص'}
              </p>

              <p className="text-sm text-gray-700 text-right leading-relaxed line-clamp-5">
                {description || 'توضیحاتی برای این محصول ثبت نشده است.'}
              </p>

              <div className="flex flex-col sm:flex-row-reverse gap-3 mt-4">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => addToCartMutation.mutate(id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
                  <ShoppingCart className="mr-2 w-5 h-5" />
                </Button>

                <Button variant="secondary" asChild className="w-full sm:w-auto">
                  <Link href="/products">بازگشت به فروشگاه</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
