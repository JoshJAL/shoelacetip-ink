import { FAQ as FAQType } from '@/types/FAQ';
import Blurb from '../blurb/Blurb';

interface Props {
  currentFAQ: FAQType;
}

export default function FAQ({ currentFAQ }: Props) {
  return (
    <div>
      <Blurb>
        <div dangerouslySetInnerHTML={{ __html: currentFAQ.question }} />
      </Blurb>
      <div className='text-lg font-semibold' dangerouslySetInnerHTML={{ __html: currentFAQ.answer }} />
    </div>
  );
}
