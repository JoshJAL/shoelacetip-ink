import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Main from '@/components/Main';
import TestimonialCarousel from '@/components/testimonialCarousel/TestimonialCarousel';
import { fetchHero } from '@/functions/fetchHero';
import { fetchTestimonials } from '@/functions/fetchTestimonials';
import { Hero as HeroType } from '@/types/hero';
import { Testimonial } from '@/types/testimonials';
import { useEffect, useState } from 'react';

export default function Home() {
  const [heroInformation, setHeroInformation] = useState<HeroType[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([] as Testimonial[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetchHero(setHeroInformation);
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
  }, [initialLoad]);

  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <div className='text-zinc-900'></div>
          <Content>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {heroInformation.map((hero) => (
                  <Hero heroInformation={hero} key={hero.id} />
                ))}
                <TestimonialCarousel testimonials={testimonials} />
              </>
            )}
          </Content>
        </Main>
      </Body>
    </>
  );
}
