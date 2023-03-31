import { Testimonial } from '@/types/testimonials';
import { useState, useEffect, useCallback } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import IndividualTestimonial from '../testimonials/IndividualTestimonial';
import Blurb from '../blurb/Blurb';

interface Props {
  testimonials: Testimonial[];
  autoScroll?: boolean;
  scrollInterval?: number;
}

function TestimonialCarousel({ testimonials: slides, autoScroll = true, scrollInterval = 3000 }: Props) {
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
      <Blurb>
        <p className='font-bold md:text-[40px] text-[27px]'>What others are saying</p>
      </Blurb>
      <div
        className='w-full h-full duration-500 bg-center bg-cover border-2 rounded-2xl border-lilac'
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/testimonials/${slides[currentSlide].image})`
        }}
      />
      <div className='scale-90 mt-[-50px] shadow-xl'>
        <IndividualTestimonial
          text={slides[currentSlide].text}
          firstName={slides[currentSlide].first_name}
          lastName={slides[currentSlide].last_name}
          affiliation={slides[currentSlide].affiliation}
        />
      </div>
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
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/testimonials/${slide.image}`}
              alt='Rotating image preview'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialCarousel;
