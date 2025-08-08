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
  toPersianDigits
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
              <p className="text-sm text-gray-500 text-right">
                دسته‌بندی: {category=="AIRPODS"?'ایرپاد':category=='COMPUTER'?'کامپیوتر':category=='LAPTOP'?'لپتاب':category=='MOBILE'?'موبایل':category=='MONITOR'?'مانیتور':category=='WATCH'?'ساعت' : 'دیگر'}
              </p>
              <p className="text-sm text-gray-600 text-right">تعداد موجود: {toPersianDigits(quantity??0)}</p>

              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed space-y-2">
                  <span className="block mb-1 font-semibold text-gray-800">ویژگی‌ها:</span>
                  <span
                    className="block whitespace-pre-line font-mono text-left break-words"
                    dir="ltr"
                  >
                    {description || 'No description provided.'}
                  </span>
                </p>
              </div>
              {hasValidDiscount ? (
                <div className="space-y-2 justify-around items-center flex text-right">
                  
                  <div className='flex flex-col'>
                    <p className="text-2xl font-bold text-green-600">
                    {toPersianDigits(discountedPrice.toFixed(2))} تومان
                  </p>
                  <p className="text-lg line-through text-gray-400">
                   {toPersianDigits(safePrice.toFixed(2))} تومان
                  </p>
                  </div>
                  <span className=" bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                    {toPersianDigits(effectiveDiscount)}٪ تخفیف
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-semibold text-gray-800 text-right">
                  {toPersianDigits(safePrice.toFixed(2))} تومان
                </p>
              )}



              <div className="flex flex-col sm:flex-row-reverse sm:justify-center gap-3 mt-4">
                
                <Button
                  variant="destructive"
                  onClick={() => addToCartMutation.mutate(id)}
                  disabled={isLoading}
                ><ShoppingCart className="mr-2 w-5 h-5" />
                  {isLoading ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
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
