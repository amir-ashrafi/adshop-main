'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import Image from 'next/image'

import IMG1 from './image/1.webp'
import IMG2 from './image/1.gif'
import IMG3 from './image/3.webp'
import IMG4 from './image/3.gif'
import IMG5 from './image/5.webp'
import IMG6 from './image/6.webp'
import IMG7 from './image/4.webp'
const IMAGES = [IMG1, IMG2, IMG3, IMG4,IMG5,IMG6,IMG7]

export default function Banner() {
  const emblaRef = React.useRef<any>(null)
  const [emblaApi, setEmblaApi] = React.useState<any>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // پلاگین autoplay
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  // وقتی embla آماده شد، رویداد select رو وصل کن
  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect() // مقدار اولیه

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="w-full flex flex-col group mx-auto relative overflow-hidden">
      <Carousel className="relative flex-none" plugins={[autoplayPlugin.current]}
        opts={{
          align: 'start',
        }}
        setApi={setEmblaApi} ref={emblaRef}>
        <CarouselContent>
          {IMAGES.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden rounded-none  ">
                <CardContent className="
                  relative 
                  w-full 
                  h-36
                  sm:h-48
                  md:h-56
                  lg:h-64
                  xl:h-80
                ">
                  <Image
                    src={image}
                    alt={`banner-${index}`}
                    fill
                    className="
                      w-full 
                      object-cover
                      transition-all 
                      duration-300
                    "
                    sizes=""
                    priority={index === 0}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="    absolute 
    bottom-8 
    left-1/2 
    -translate-x-1/2 
    z-10 
    flex 
    gap-2 
    opacity-0 
    group-hover:opacity-100 
    group-focus-within:opacity-100
    transition-opacity 
    duration-300">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="
          absolute 
          bottom-4 
          right-6
          flex 
          gap-2
          z-10
          items-center
        ">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`h-2.5 w-2.5 rounded-full border transition duration-300 ${
    selectedIndex === idx
      ? 'bg-white border-white py-3'
      : 'bg-transparent border-white/50 hover:bg-white/70'
  }`}
            />
          ))}
        
        </div>
      </Carousel>
    </div>
  )
}

