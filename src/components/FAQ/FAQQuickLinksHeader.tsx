import { FAQ } from '@/types/FAQ';
import { Link as ReactScroll } from 'react-scroll';

interface Props {
  currentFAQArray: FAQ[];
}

export default function FAQQuickLinksHeader({ currentFAQArray }: Props) {
  return (
    <div className='flex flex-col flex-wrap items-center justify-center w-full gap-2 py-4 text-center md:flex-row'>
      {currentFAQArray.map((currentFAQ, index) => (
        <ReactScroll
          smooth={true}
          offset={-60}
          duration={500}
          className='flex items-center px-4 py-3 text-lg font-semibold transition-all duration-200 ease-in-out rounded-lg cursor-pointer text-lilacHover hover:bg-lilacHover hover:bg-opacity-20 hover:underline underline-offset-2'
          to={`${currentFAQ.divId}`}
          key={index}
          dangerouslySetInnerHTML={{ __html: currentFAQ.question }}
        />
      ))}
    </div>
  );
}
