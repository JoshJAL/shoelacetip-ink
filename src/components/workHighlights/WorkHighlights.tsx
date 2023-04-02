import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useState, useEffect, useCallback } from 'react';
import BlurImage from '../blurImage/BlurImage';

interface WorkHighlightsProps {
  autoScroll?: boolean;
  scrollInterval?: number;
  slides: string[];
}

export default function WorkHighlights({ autoScroll = true, scrollInterval = 3000, slides }: WorkHighlightsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  }, [currentSlide, slides.length]);

  function prevSlide() {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  }

  useEffect(() => {
    if (!autoScroll) return;
    const timer = setTimeout(nextSlide, scrollInterval);
    return () => clearTimeout(timer);
  }, [currentSlide, autoScroll, scrollInterval, nextSlide]);

  return (
    <div className='max-w-xl md:h-[780px] h-[615px] w-full m-auto pb-12 relative group'>
      <div
        className='w-full h-full duration-500 bg-center bg-cover border-2 rounded-2xl border-lilac'
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/carousel/${slides[currentSlide]})`
        }}
      />
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y[-50%] left-7 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-white/50 hover:text-black transition-all duration-200'
      >
        <IoChevronBack size={30} />
      </button>
      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y[-50%] right-7 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-white/50 hover:text-black transition-all duration-200'
      >
        <IoChevronForward size={30} />
      </button>
      <div className='flex justify-center py-4 top-4'>
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-4 w-4 flex mx-1 items-center cursor-pointer ${
              index === currentSlide ? 'scale-[2.4] mx-3' : ''
            } transition-all duration-200 ease-in-out`}
          >
            <BlurImage
              imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/carousel/${slide}`}
              alt='Rotating image preview'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
