import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import FAQQuickLinksHeader from '@/components/FAQ/FAQQuickLinksHeader';
import SingleFAQ from '@/components/FAQ/SingleFAQ';
import Main from '@/components/Main';
import Header from '@/components/header/Header';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import ScrollToTopButton from '@/components/scrollToTopButton/ScrollToTopButton';
import { fetchFAQs } from '@/functions/FAQ';
import { FAQ as FAQType } from '@/types/FAQ';
import { useEffect, useState } from 'react';

export default function FAQ() {
  const [currentFAQArray, setCurrentFAQArray] = useState<FAQType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetchFAQs(setCurrentFAQArray);
      setInitialLoad(false);
    } catch (error) {
      console.log(error);
    }

    if (!initialLoad) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [setCurrentFAQArray, initialLoad]);

  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            <div className={`${loading ? 'block' : 'hidden'} absolute h-screen left-[50%] right-[50%]`}>
              <LoadingSpinner />
            </div>
            <div className={`${loading ? 'hidden' : 'flex'} flex-col`}>
              <ScrollToTopButton />
              <FAQQuickLinksHeader currentFAQArray={currentFAQArray} />
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
            </div>
          </Content>
        </Main>
      </Body>
    </>
  );
}
