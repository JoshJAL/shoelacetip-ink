import Blurb from '@/components/blurb/Blurb';
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
  const [general, setGeneral] = useState<Gallery[]>([]);
  const [something, setSomething] = useState<Gallery[]>([]);
  const [somethingElse, setSomethingElse] = useState<Gallery[]>([]);

  useEffect(() => {
    async function fetchCurrentGallery() {
      await fetchGallery(setGallery);
      setInitialLoad(false);
    }

    fetchCurrentGallery();

    if (!initialLoad) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    gallery.map((image) => {
      if (image.tag === 'general') {
        setGeneral((prev) => [...prev, image]);
      }
      if (image.tag === 'something') {
        setSomething((prev) => [...prev, image]);
      }
      if (image.tag === 'somethingElse') {
        setSomethingElse((prev) => [...prev, image]);
      }
    });
  }, [setGallery, initialLoad, setGeneral, setSomething, setSomethingElse, gallery]);

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
              <Blurb>
                <h1 className='text-4xl font-bold'>General</h1>
              </Blurb>
              <ImageGallery gallery={general} />
              <Blurb>
                <h1 className='text-4xl font-bold'>Something</h1>
              </Blurb>
              <ImageGallery gallery={something} />
              <Blurb>
                <h1 className='text-4xl font-bold'>Something Else</h1>
              </Blurb>
              <ImageGallery gallery={somethingElse} />
            </div>
          </Content>
        </Main>
      </Body>
    </>
  );
}
