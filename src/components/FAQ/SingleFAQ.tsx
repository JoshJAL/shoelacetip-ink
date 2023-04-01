import { FAQ as FAQType } from '@/types/FAQ';
import Blurb from '../blurb/Blurb';

interface Props {
  currentFAQ: FAQType;
}

export default function SingleFAQ({ currentFAQ }: Props) {
  return (
    <div className='flex flex-col py-4'>
      <div className='flex items-center justify-center w-full'>
        <Blurb>
          <div dangerouslySetInnerHTML={{ __html: currentFAQ.question }} />
        </Blurb>
      </div>
      <div className='text-lg font-semibold text-center' dangerouslySetInnerHTML={{ __html: currentFAQ.answer }} />
      <div className='pt-4 text-center'>✧</div>
    </div>
  );
}
