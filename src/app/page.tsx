import Banner from '@/components/banner';
import CarouselSpacing from '@/components/banner_icon';
import Discounts from '@/components/Discounts';
import LaptopProducts from '@/components/LaptopProducts';
import FooterDown from '@/components/FooterDown';
import BlogPreview from '../components/blog/BlogPreview';
import Bestmobile from '@/components/bestmobile';
export default function Home() {
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
