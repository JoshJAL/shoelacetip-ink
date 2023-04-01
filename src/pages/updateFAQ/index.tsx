import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import UpdatePagesHeader from '@/components/header/UpdatePagesHeader';
import Main from '@/components/Main';
import { fetchFAQs } from '@/functions/FAQ';
import { FAQ as FAQType } from '@/types/FAQ';
import { useEffect, useState } from 'react';
import UpdateFAQForm from '@/components/updateFAQForm/UpdateFAQForm';
import FAQAboveForm from '@/components/FAQ/FAQAboveForm';

export default function UpdateFAQ() {
  const [currentFAQArray, setCurrentFAQArray] = useState<FAQType[]>([]);
  const [view, setView] = useState(false);

  useEffect(() => {
    try {
      fetchFAQs(setCurrentFAQArray);
    } catch (error) {
      console.log(error);
    }
  }, [setCurrentFAQArray]);

  return (
    <>
      <DefaultHead />
      <Body>
        <UpdatePagesHeader />
        <Main>
          <Content additionalClasses='w-full justify-center flex flex-col'>
            <label className='items-center justify-center md:flex'>
              <input
                type={'checkbox'}
                checked={view}
                onChange={() => setView(!view)}
                className='cursor-pointer accent-lilac'
              />
              &nbsp;Would you like to see the current FAQs?
            </label>
            {view && (
              <div className='flex flex-col items-center justify-center py-4'>
                {currentFAQArray.map((currentFAQ, index) => (
                  <FAQAboveForm currentFAQ={currentFAQ} key={index} setCurrentFAQs={setCurrentFAQArray} />
                ))}
              </div>
            )}
            <UpdateFAQForm setCurrentFAQs={setCurrentFAQArray} />
          </Content>
        </Main>
      </Body>
    </>
  );
}
