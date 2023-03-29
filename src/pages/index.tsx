import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import Main from '@/components/Main';
import Testimonials from '@/components/testimonials/Testimonials';
import WorkHighlights from '@/components/workHighlights/WorkHighlights';
import { Hero as HeroType } from '@/types/hero';
import { Testimonial } from '@/types/testimonials';
import { useState, useEffect } from 'react';
import { fetchHero } from '@/functions/fetchHero';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import { fetchCurrentImages } from '@/functions/fetchCarousel';
import { fetchTestimonials } from '@/functions/fetchTestimonials';

export default function Home() {
  const [heroInformation, setHeroInformation] = useState<HeroType>({} as HeroType);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([] as Testimonial[]);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetchHero(setHeroInformation);
      fetchCurrentImages(setCurrentImages);
      setInitialLoad(false);
      fetchTestimonials(setTestimonials);
    } catch (error) {
      console.log(error);
    }

    if (!initialLoad) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [setCurrentImages, initialLoad]);

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
                <WorkHighlights slides={currentImages} />
                <Testimonials testimonials={testimonials} />
              </>
            )}
          </Content>
        </Main>
      </Body>
    </>
  );
}
