import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import ImageGallery from '@/components/imageGallery/ImageGallery';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Main from '@/components/Main';
import { fetchGallery } from '@/functions/gallery';
import { Gallery } from '@/types/gallery';
import { useState, useEffect } from 'react';

export default function Tattoos() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCurrentGallery() {
      await fetchGallery(setGallery);
      setInitialLoad(false);
    }

    fetchCurrentGallery();

    if (!initialLoad) {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  }, [setGallery, initialLoad]);

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
              <ImageGallery gallery={gallery} />
            </div>
          </Content>
        </Main>
      </Body>
    </>
  );
}
