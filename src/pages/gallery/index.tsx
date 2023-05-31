import Blurb from '@/components/blurb/Blurb';
import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import ImageGallery from '@/components/imageGallery/ImageGallery';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Main from '@/components/Main';
import { fetchGallery } from '@/functions/gallery';
import { getTags } from '@/functions/tags';
import { Gallery } from '@/types/gallery';
import { Tag } from '@/types/tags';
import { useState, useEffect } from 'react';

export default function Tattoos() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag1, setTag1] = useState<Gallery[]>([]);
  const [tag2, setTag2] = useState<Gallery[]>([]);
  const [tag3, setTag3] = useState<Gallery[]>([]);

  useEffect(() => {
    async function fetchCurrentGallery() {
      await fetchGallery(setGallery);
      const currentTags = await getTags();
      setTags(currentTags);

      for (let i = 0; i < tags.length; i++) {
        for (let j = 0; j < gallery.length; j++) {
          if (gallery[j].tag === tags[i].tag_name && tags[i].id === 1) {
            setTag1((prev) => [...prev, gallery[j]]);
          }
          if (gallery[j].tag === tags[i].tag_name && tags[i].id === 2) {
            setTag2((prev) => [...prev, gallery[j]]);
          }
          if (gallery[j].tag === tags[i].tag_name && tags[i].id === 3) {
            setTag3((prev) => [...prev, gallery[j]]);
          }
        }
      }

      setInitialLoad(false);
    }

    fetchCurrentGallery();

    if (!initialLoad) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [setGallery, initialLoad, setTag1, setTag2, setTag3, setTags]);

  tags.sort((a, b) => (a.id > b.id ? 1 : -1));

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
              {tags.map((tag) => (
                <div key={tag.id}>
                  <Blurb>
                    <h1 className='text-4xl font-bold'>{tag.tag_name}</h1>
                  </Blurb>
                  <ImageGallery gallery={tag.id === 1 ? tag1 : tag.id === 2 ? tag2 : tag3} />
                </div>
              ))}
            </div>
          </Content>
        </Main>
      </Body>
    </>
  );
}
