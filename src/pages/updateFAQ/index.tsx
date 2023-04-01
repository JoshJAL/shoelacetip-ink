import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import UpdatePagesHeader from '@/components/header/UpdatePagesHeader';
import UpdateHeroContent from '@/components/hero/UpdateHeroContent';
import Main from '@/components/Main';
import { fetchHero } from '@/functions/fetchHero';
import { Hero } from '@/types/hero';
import { useEffect, useState } from 'react';

export default function UpdateFAQ() {
  const [currentFAQArray, setCurrentFAQArray] = useState<Hero[]>([]);

  useEffect(() => {
    try {
      fetchHero(setCurrentFAQArray);
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
          <Content additionalClasses='w-full justify-center flex'>
            {currentFAQArray.map((currentFAQ) => (
              <UpdateHeroContent currentHero={currentFAQ} key={currentFAQ.id} />
            ))}
          </Content>
        </Main>
      </Body>
    </>
  );
}
