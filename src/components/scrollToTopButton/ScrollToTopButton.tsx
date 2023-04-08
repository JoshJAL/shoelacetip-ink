import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const isBrowser = () => typeof window !== 'undefined';

function scrollToTop() {
  if (!isBrowser()) return;
  if (window.scrollY < 500) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function ScrollToTopButton() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`${
        scrollY < 500 ? 'opacity-0 cursor-default' : 'opacity-100'
      } fixed flex items-center justify-center gap-2 px-4 py-3 rounded-lg bottom-4 bg-lilac hover:bg-lilacHover md:right-[22.8%] right-2 transition-all duration-200 ease-in-out`}
      onClick={scrollToTop}
    >
      <FaArrowUp /> Back to the Top
    </button>
  );
}
