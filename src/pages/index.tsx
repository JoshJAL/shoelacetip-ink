import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import Main from '@/components/Main';
import Testimonials from '@/components/testimonials/Testimonials';
import WorkHighlights from '@/components/workHighlights/WorkHighlights';
import { Hero as HeroType } from '@/types/hero';
import { Carousel } from '@/types/carousel';
import { Testimonial } from '@/types/testimonials';
import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase';
import { fetchHero } from '@/functions/fetchHero';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';

export default function Home() {
  const [heroInformation, setHeroInformation] = useState<HeroType>({} as HeroType);
  const [carouselImages, setCarouselImages] = useState<Carousel[]>([] as Carousel[]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([] as Testimonial[]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetchHero(setHeroInformation);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Hero heroInformation={heroInformation} />
                <WorkHighlights />
                <Testimonials />
              </>
            )}
          </Content>
        </Main>
      </Body>
    </>
  );
}
