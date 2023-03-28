import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useState, useEffect } from 'react';

interface WorkHighlightsProps {
  autoScroll?: boolean;
  scrollInterval?: number;
}

export default function WorkHighlights({ autoScroll = true, scrollInterval = 3000 }: WorkHighlightsProps) {
  const slides = [
    'https://i.ibb.co/ncrXc2V/1.png',
    'https://i.ibb.co/B3s7v4h/2.png',
    'https://i.ibb.co/XXR8kzF/3.png',
    'https://i.ibb.co/yg7BSdM/4.png'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  }

  function prevSlide() {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  }

  useEffect(() => {
    if (!autoScroll) return;
    const timer = setTimeout(nextSlide, scrollInterval);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className='max-w-lg h-[780px] w-full m-auto pb-10 relative group'>
      <div
        className='w-full h-full duration-500 bg-center bg-cover rounded-2xl'
        style={{ backgroundImage: `url(${slides[currentSlide]})` }}
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
      <div className='flex justify-center py-2 top-4'>
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 mx-1 cursor-pointer ${
              index === currentSlide ? 'scale-[2]' : ''
            } transition-all duration-200 ease-in-out`}
          >
            <img src={slide} />
          </div>
        ))}
      </div>
    </div>
  );
}
