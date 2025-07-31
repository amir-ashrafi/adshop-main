
import Image from 'next/image';
import Link from 'next/link';
import { CardContent} from '@/components/ui';

function Bestmobile() {
    const ImageMobile =[
        { name: 'samsung', img: '/samsung.webp' },
        { name: 'poko', img: '/poko.webp' },
        { name: 'iphone', img: '/iphone.webp' },
        { name: 'anra', img: '/anra.webp' },
        { name: 'shiaomi', img: '/shiaomi.webp' },
      ]
  return (
    <div className='my-7 space-y-7'>
        <div className="w-full flex flex-col items-center ">
          <h2 className="text-xl font-bold mb-4">برترین موبایل ها</h2>
          <div className="flex flex-wrap justify-center gap-4  w-full">
            {ImageMobile.map(company => (
              <Link key={company.name} href={`/products?brand=${company.name}`} className="flex flex-col items-center w-24 md:w-40 md:h-40">
                <div className="w-24 h-20 md:w-40 md:h-40   overflow-hidden rounded-full bg-white shadow-md flex items-center justify-center mb-2">
                  <Image src={company.img} alt={company.name} width={150} height={150} className="object-contain rounded-full w-full p-2 border-2 duration-500 border-white hover:border-sky-500 h-full" />
                </div>
                <span className="text-sm font-medium mt-1">{company.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center   items-center ">
          <Link href="/products" className="block w-full border-none rounded-full">
              <CardContent className="relative 

                  md:rounded-l-full
                  w-full 
                  h-28
                  sm:h-32
                  md:h-36
                  lg:h-48
                  xl:h-56
                  ">
                <Image
                  src="/powerbonk.webp"
                  alt="banner"
                  fill
                  className="  
                      w-full
                      object-contain
                      md:rounded-l-full
                      bg-blue-200
                      transition-all 
                      duration-300"
                  priority
                />
              </CardContent>
          </Link>

        </div>
    </div>
  )
}

export default Bestmobile