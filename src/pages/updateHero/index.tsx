import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import UpdatePagesHeader from '@/components/header/UpdatePagesHeader';
import UpdateHeroContent from '@/components/hero/UpdateHeroContent';
import Main from '@/components/Main';
import { fetchHero } from '@/functions/fetchHero';
import { Hero } from '@/types/hero';
import { useState, useEffect } from 'react';

export default function UpdateHero() {
  const [currentHero, setCurrentHero] = useState<Hero>({} as Hero);

  useEffect(() => {
    try {
      fetchHero(setCurrentHero);
    } catch (error) {
      console.log(error);
    }
  }, [setCurrentHero]);

  return (
    <>
      <DefaultHead />
      <Body>
        <UpdatePagesHeader />
        <Main>
          <Content additionalClasses='w-full justify-center flex'>
            <UpdateHeroContent currentHero={currentHero} />
          </Content>
        </Main>
      </Body>
    </>
  );
}
