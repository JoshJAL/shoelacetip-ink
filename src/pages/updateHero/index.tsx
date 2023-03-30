import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import UpdatePagesHeader from '@/components/header/UpdatePagesHeader';
import UpdateHeroContent from '@/components/hero/UpdateHeroContent';
import Main from '@/components/Main';
import { fetchHero } from '@/functions/fetchHero';
import { Hero } from '@/types/hero';
import { useEffect, useState } from 'react';

export default function UpdateHero() {
  const [currentHeroArray, setCurrentHeroArray] = useState<Hero[]>([]);

  useEffect(() => {
    try {
      fetchHero(setCurrentHeroArray);
    } catch (error) {
      console.log(error);
    }
  }, [setCurrentHeroArray]);

  return (
    <>
      <DefaultHead />
      <Body>
        <UpdatePagesHeader />
        <Main>
          <Content additionalClasses='w-full justify-center flex'>
            {currentHeroArray.map((currentHero) => (
              <UpdateHeroContent currentHero={currentHero} key={currentHero.id} />
            ))}
          </Content>
        </Main>
      </Body>
    </>
  );
}
