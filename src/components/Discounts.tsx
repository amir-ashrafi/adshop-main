'use client'
import React, { useEffect, useState } from 'react'
import { getProducts } from '@/modules/products/services'
import { ProductsWithImages } from '@/types'
import ProductItem from '@/modules/products/components/ProductItem'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { isDiscountValid, getEffectiveDiscount } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

const Discounts: React.FC = () => {
  const [discountProducts, setDiscountProducts] = useState<ProductsWithImages[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        const allProducts = await getProducts(true, 'discount-desc', 'all')
        const validDiscountProducts = allProducts.filter(product => {
          const effectiveDiscount = getEffectiveDiscount(product.discount || null, product.discountEndsAt || null);
          return effectiveDiscount > 0 && isDiscountValid(product.discountEndsAt || null);
        })
        setDiscountProducts(validDiscountProducts)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('خطا در دریافت محصولات تخفیف‌دار:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDiscountProducts()
  }, [])

  if (!isLoading && discountProducts.length === 0) return null

  return (
    <div className="w-full lg:border border-red-200 lg:p-3 rounded-xl">
      <div className="flex items-center justify-between font-bold bg-red-700 text-white px-2 py-0 lg:px-4 lg:py-2 lg:rounded-2xl shadow mb-4">
        <Link
          href="/products?discount=true"
          className="border-b-2 border-red-600 hover:border-white rounded-lg transition-colors duration-500 px-2 py-0 my-1"
        >
          نمایش همه
        </Link>
        <span>تخفیف‌ ها</span>
      </div>

      <div className="relative">
        <Carousel
          opts={{ align: "start", slidesToScroll: 1 }}
          className="w-full px-0 md:px-6 pb-4"
        >
          <CarouselContent className="gap-0 px-4 w-full">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="!basis-1/4 lg:!basis-1/12 max-w-[320px] min-w-[220px] flex justify-center m-0 p-0"
                  >
                    <Skeleton className="w-[200px] h-[220px] rounded-xl" />
                  </CarouselItem>
                ))
              : discountProducts.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="!basis-1/4 lg:!basis-1/12 max-w-[320px] min-w-[220px] flex justify-center m-0 p-0"
                  >
                    <ProductItem product={product} />
                  </CarouselItem>
                ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex md:-left-3 top-1/2 -translate-y-1/2 z-20 shadow-lg bg-white/80 hover:bg-white" />
          <CarouselNext className="hidden md:flex md:-right-3 top-1/2 -translate-y-1/2 z-20 shadow-lg bg-white/80 hover:bg-white" />
        </Carousel>
      </div>
    </div>
  )
}

export default Discounts
