import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import SingleFAQ from '@/components/FAQ/SingleFAQ';
import Main from '@/components/Main';
import Header from '@/components/header/Header';
import { fetchFAQs } from '@/functions/FAQ';
import { FAQ as FAQType } from '@/types/FAQ';
import { useEffect, useState } from 'react';

export default function FAQ() {
  const [currentFAQArray, setCurrentFAQArray] = useState<FAQType[]>([]);

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
        <Header />
        <Main>
          <Content>
            <div className='flex flex-col items-center justify-center w-full text-center'>
              <p className='text-xl font-semibold'>Shop minimum is $95, $130/hr rate for all tattoos</p>
              <p>
                <i className='text-xl font-bold'>Cash payment is preferred! Zelle transfers will also be accepted</i>
              </p>
              <div>✧✧✧</div>
            </div>
            {currentFAQArray.map((currentFAQ, index) => (
              <SingleFAQ currentFAQ={currentFAQ} key={index} />
            ))}
          </Content>
        </Main>
      </Body>
    </>
  );
}
