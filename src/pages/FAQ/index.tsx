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
            {currentFAQArray.map((currentFAQ, index) => (
              <SingleFAQ currentFAQ={currentFAQ} key={index} />
            ))}
          </Content>
        </Main>
      </Body>
    </>
  );
}
