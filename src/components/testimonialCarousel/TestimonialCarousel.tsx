import { Testimonial } from '@/types/testimonials';
import { useState, useEffect, useCallback, TouchEvent } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import IndividualTestimonial from '../testimonials/IndividualTestimonial';
import Blurb from '../blurb/Blurb';

interface Props {
  testimonials: Testimonial[];
  autoScroll?: boolean;
  scrollInterval?: number;
}

function TestimonialCarousel({ testimonials: slides, autoScroll = false, scrollInterval = 5000 }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

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
    <div className='relative w-full max-w-xl pb-12 m-auto group'>
      <Blurb>
        <p className='font-semibold md:text-[40px] text-[27px]'>What others are saying</p>
      </Blurb>
      <div
        onTouchStart={(e) => onTouchStart(e)}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className='scale-90 shadow-xl'
      >
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
        className='hidden md:group-hover:block absolute top-[50%] translate-x-[-100%] translate-y[-50%] left-7 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-customPink/50 hover:text-black transition-all duration-200'
      >
        <IoChevronBack size={30} />
      </button>
      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className='hidden md:group-hover:block absolute top-[50%] translate-x-[100%] translate-y[-50%] right-7 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-customPink/50 hover:text-black transition-all duration-200'
      >
        <IoChevronForward size={30} />
      </button>
      <div className='flex justify-center py-4 top-4'>
        {slides.map((_slide, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-4 w-4 flex mx-1 items-center cursor-pointer bg-customPink rounded-full ${
              index === currentSlide ? 'scale-[1.5] mx-3' : ''
            } transition-all duration-200 ease-in-out`}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialCarousel;
