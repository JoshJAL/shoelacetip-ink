import { FAQ } from '@/types/FAQ';
import Link from 'next/link';

interface Props {
  currentFAQArray: FAQ[];
}

export default function FAQQuickLinksHeader({ currentFAQArray }: Props) {
  return (
    <div className='flex flex-wrap justify-center w-full gap-2 py-4'>
      {currentFAQArray.map((currentFAQ, index) => (
        <Link
          className='flex items-center px-4 py-3 text-lg font-semibold transition-all duration-200 ease-in-out rounded-lg text-lilacHover hover:bg-lilacHover hover:bg-opacity-20 hover:underline underline-offset-2'
          href={`#${currentFAQ.divId}`}
          key={index}
          dangerouslySetInnerHTML={{ __html: currentFAQ.question }}
        />
      ))}
    </div>
  );
}
