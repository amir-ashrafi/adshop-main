'use client'
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Link from "next/link"
import IMG1 from './image/1.webp'
import IMG2 from './image/2.webp'
import IMG3 from './image/3.webp'
import IMG4 from './image/4.webp'
import IMG5 from './image/5.webp'
import IMG6 from './image/6.webp'

// Mapping between banner icon types and ProductCategory enum values
const CATEGORY_MAPPING: Record<string, string> = {
  'ساعت هوشمند': 'WATCH',
  'گوشی موبایل': 'MOBILE',
  'ایرپاد': 'AIRPODS',
  'لپتاب': 'LAPTOP',
  'کیس گیمینگ': 'COMPUTER',
  'مانیتور': 'MONITOR'
}

const IMAGES = [
  {
    src:IMG1,
    type:'ساعت هوشمند'
  }, 
  {
    src:IMG2,
    type:'گوشی موبایل'
  }, 
  {
    src:IMG3,
    type:'ایرپاد'
  }, 
  {
    src:IMG4,
    type:'لپتاب'
  },
  {
    src:IMG5,
    type:'کیس گیمینگ'
  },
  {
    src:IMG6,
    type:'مانیتور'
  }
]

function CarouselSpacing() {
  return (
    <div className="flex justify-center py-5 mb-3">
    <Carousel className="w-10/12 max-w-full px-2" opts={{ loop: true }}>
      <CarouselContent className="flex justify-between min-w-full ">
        {IMAGES.map((image, index) => {
          const category = CATEGORY_MAPPING[image.type];
          const productsUrl = category ? `/products?category=${category}` : '/products';
          
          return (
            <CarouselItem key={index} className="basis-1/3  sm:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-between w-full flex-col items-center gap-4">
              <div className="p-1">
                <Card className="border-white rounded-full border-4 hover:border-blue-400 duration-150">
                  <CardContent className="flex aspect-auto items-center justify-center p-0">
                      <Link href={productsUrl} className="cursor-pointer">
                          <Image
                              src={image.src}
                              alt={`banner-${index}`}
                              className="
                              w-16
                              sm:w-24
                              object-fixed
                              transition-all 
                              duration-300
                              "
                              priority={index === 0}
                          /> 
                      </Link>
                                    
                  </CardContent>
                </Card>
              </div>
              <span className="">{image.type}</span> 
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="border-none xl:hidden" />
      <CarouselNext className=" border-none xl:hidden" />
    </Carousel>
    </div>
  )
}

export default CarouselSpacing