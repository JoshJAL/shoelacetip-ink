import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Main from '@/components/Main';
import CurrentImagesInCarousel from '@/components/workHighlights/CurrentImagesInCarousel';
import UpdateCarouselForm from '@/components/workHighlights/UpdateCarouselForm';
import { fetchCurrentImages } from '@/functions/fetchCarousel';
import { useEffect } from 'react';
import { useState } from 'react';

export default function UpdateCarousel() {
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      fetchCurrentImages(setCurrentImages);
    }
    fetchImages();
  }, [setCurrentImages]);

  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            <CurrentImagesInCarousel currentImages={currentImages} setCurrentImages={setCurrentImages} />
            <UpdateCarouselForm currentImages={currentImages} setCurrentImages={setCurrentImages} />
          </Content>
        </Main>
      </Body>
    </>
  );
}
