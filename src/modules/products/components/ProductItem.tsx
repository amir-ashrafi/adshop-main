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
    description = ''
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
      <Card className={`${hasValidDiscount?'':'pt-5'} w-full sm:w-[240px] h-80 flex flex-col rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 hover:scale-105 font-vazir bg-white`}>
        {hasValidDiscount && (
          <div className="bg-red-100 text-red-700 text-xs font-bold px-3 py-2 flex justify-between items-center">
            <span>⏰ {timeLeft}</span>
            <span className="ml-2">ای دی اف</span>
          </div>
        )}
        <CardHeader className="h-[150px] space-y-0 flex items-center justify-center p-0 m-0 bg-gray-50/5">
          <div className="relative w-[140px] h-[140px]">
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
          <p className="text-xs text-gray-500 mb-2">{category}</p>
          <h3 className="text-sm font-semibold mb-1 text-gray-800 line-clamp-1">{name}</h3>

          {hasValidDiscount ? (
            <div className="flex justify-around  gap-1 items-center">
              <div className='flex flex-col '>
                <span className="text-lg font-bold text-green-600">
                    ${discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-sm text-gray-400">
                ${basePrice.toFixed(2)}
              </span>
              </div>
              
              <span className="text-xs text-red-500 font-bold bg-red-100 px-2 py-0.5 rounded">
                {effectiveDiscount}% 
              </span>

            </div>
          ) : (
            <div className="flex flex-col gap-2">
  {description && (
    <p className="text-xs text-gray-500 line-clamp-1 leading-5">
      {description}
    </p>
  )}
  <span className="text-lg font-medium text-gray-800">
    {basePrice > 0 ? `$${basePrice.toFixed(2)}` : 'قیمت نامشخص'}
  </span>
</div>

          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
