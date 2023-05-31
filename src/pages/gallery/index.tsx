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
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag1, setTag1] = useState<Gallery[]>([]);
  const [tag2, setTag2] = useState<Gallery[]>([]);
  const [tag3, setTag3] = useState<Gallery[]>([]);

  useEffect(() => {
    async function fetchCurrentGallery() {
      const currentGallery = await fetchGallery();
      const currentTags = await getTags();
      setTags(currentTags);

      if (currentGallery.length === 0) return;

      try {
        for (let i = 0; i < currentTags.length; i++) {
          for (let j = 0; j < currentGallery.length; j++) {
            if (currentGallery[j].tag === currentTags[i].tag_name && currentTags[i].id === 1) {
              setTag1((prev) => [...prev, currentGallery[j]]);
            }
            if (currentGallery[j].tag === currentTags[i].tag_name && currentTags[i].id === 2) {
              setTag2((prev) => [...prev, currentGallery[j]]);
            }
            if (currentGallery[j].tag === currentTags[i].tag_name && currentTags[i].id === 3) {
              setTag3((prev) => [...prev, currentGallery[j]]);
            }
            1;
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentGallery();
  }, [setTag1, setTag2, setTag3, setTags]);

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
