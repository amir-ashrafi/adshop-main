import Banner from '@/components/banner';
import CarouselSpacing from '@/components/banner_icon';
import Discounts from '@/components/Discounts';
import LaptopProducts from '@/components/LaptopProducts';
import FooterDown from '@/components/FooterDown';
import BlogPreview from '../components/blog/BlogPreview';
import Bestmobile from '@/components/bestmobile';
export default function Home() {
  const ImageMobile =[
    { name: 'samsung', img: '/samsung.webp' },
    { name: 'poko', img: '/poko.webp' },
    { name: 'iphone', img: '/iphone.webp' },
    { name: 'anra', img: '/anra.webp' },
    { name: 'shiaomi', img: '/shiaomi.webp' },
  ]
  return (
    <div className="flex flex-col items-center justify-center mt-10 px-0">
      <Banner />
      
      <div className="grid grid-cols-1 gap-10 w-full  pt-2">
        <div className="mx-3 rounded-none ">
          <CarouselSpacing />
          <Discounts />
          <Bestmobile/>
          <LaptopProducts />
          <BlogPreview />
          <FooterDown/> 
        </div>
      </div> 
    </div>
  );
}
