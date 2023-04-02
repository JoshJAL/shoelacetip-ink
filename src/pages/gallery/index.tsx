import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import ImageGallery from '@/components/imageGallery/ImageGallery';
import Main from '@/components/Main';
import { fetchGallery } from '@/functions/gallery';
import { Gallery } from '@/types/gallery';
import { useState, useEffect } from 'react';

export default function Tattoos() {
  const [gallery, setGallery] = useState<Gallery[]>([]);

  useEffect(() => {
    async function fetchCurrentGallery() {
      await fetchGallery(setGallery);
    }

    fetchCurrentGallery();
  }, [setGallery]);

  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            <ImageGallery gallery={gallery} />
          </Content>
        </Main>
      </Body>
    </>
  );
}
