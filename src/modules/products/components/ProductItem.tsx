'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';
import { ProductType } from '@/types';
import {
  isDiscountValid,
  getEffectiveDiscount,
  getDiscountedPrice,
} from '@/lib/utils';

const ProductItem = ({ product }: { product: ProductType }) => {
  const {
    id,
    name,
    images = [],
    price = 0,
    discount = null,
    discountEndsAt = null,
    category,
  } = product;

  const basePrice = typeof price === 'number' ? price : 0;
  const effectiveDiscount = getEffectiveDiscount(discount, discountEndsAt);
  const discountedPrice = getDiscountedPrice(price, discount, discountEndsAt);
  const hasValidDiscount = isDiscountValid(discountEndsAt) && effectiveDiscount > 0;

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!discountEndsAt || !hasValidDiscount) return;

    const endTime = new Date(discountEndsAt).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft('تمام شد');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const result = (days > 0 ? `${days} روز ` : '') + `${hours}:${minutes}:${seconds}`;
      setTimeLeft(result);
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, [discountEndsAt, hasValidDiscount]);

  return (
    <Link href={`/products/${id}`}>
      <Card className="w-full sm:w-[240px] h-auto flex flex-col rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 hover:scale-105 font-vazir bg-white">
        {hasValidDiscount && (
          <div className="bg-red-100 text-red-700 text-xs font-bold px-3 py-2 flex justify-between items-center">
            <span>⏰ {timeLeft}</span>
            <span className="ml-2">تخفیف</span>
          </div>
        )}
        <CardHeader className="h-[150px] flex items-center justify-center bg-gray-50">
          <div className="relative w-[110px] h-[110px]">
            <Image
              src={images[0]?.image || '/assets/noImage.jpg'}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100px, 110px"
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 text-center">
          <h3 className="text-sm font-semibold mb-1 text-gray-800 line-clamp-1">{name}</h3>
          <p className="text-xs text-gray-500 mb-2">{category}</p>

          {hasValidDiscount ? (
            <div className="flex flex-col gap-1 items-center">
              <span className="text-lg font-bold text-green-600">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-xs text-red-500 font-bold bg-red-100 px-2 py-0.5 rounded">
                {effectiveDiscount}% تخفیف
              </span>
              <span className="line-through text-sm text-gray-400">
                ${basePrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-base font-medium text-gray-800">
              {basePrice > 0 ? `$${basePrice.toFixed(2)}` : 'قیمت نامشخص'}
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
