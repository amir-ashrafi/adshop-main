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
import { Skeleton } from '@/components/ui/skeleton'

const LaptopProducts: React.FC = () => {
  const [laptopProducts, setLaptopProducts] = useState<ProductsWithImages[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLaptopProducts = async () => {
      try {
        setIsLoading(true)
        const allProducts = await getProducts(false, 'bestselling', 'LAPTOP')
        setLaptopProducts(allProducts)
      } catch (error) {
  // eslint-disable-next-line no-console
  console.error('Failed to fetch laptop products:', error)
} finally {
        setIsLoading(false)
      }
    }
    fetchLaptopProducts()
  }, [])

  if (laptopProducts.length === 0 && !isLoading) {
    return null
  }

  return (
    <div className="w-full md:border border-blue-800 md:p-3 rounded-xl ">
      {/* هدر همیشه نمایش داده شود */}
      <div className="flex items-center justify-between bg-blue-700 text-white px-2 py-0 lg:px-4 lg:py-1 lg:rounded-2xl shadow font-medium mb-4">
        <Link
          href="/products?category=LAPTOP"
          className="border-b-2 border-blue-600 hover:border-white rounded-lg transition-colors duration-500 px-2 py-0 my-1"
        >
          نمایش همه
        </Link>
        <span>لپتاپ ها</span>
      </div>

      <div className="relative">
        {isLoading ? (
          // فقط skeleton های محصولات نمایش داده شوند
          <div className="w-full p-4 grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="max-w-[320px] min-w-[220px] flex justify-center">
                <Skeleton className="w-[220px] h-[250px] rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full px-0 md:px-6 pb-4"
          >
            <CarouselContent
              className="gap-0  px-4 w-full"
            >
              {laptopProducts.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-3/5 sm:basis-1/6 space-x-4 lg:!basis-1/12 sm:max-w-[320px] sm:min-w-[240px] flex justify-start sm:justify-center sm:mr-10   m-0 p-0"
                >
                  <ProductItem product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 shadow-lg bg-white/80 hover:bg-white" />
            <CarouselNext className="hidden md:flex -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 shadow-lg bg-white/80 hover:bg-white" />
          </Carousel>
        )}
      </div>
    </div>
  )
}

export default LaptopProducts;
