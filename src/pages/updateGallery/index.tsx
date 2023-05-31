import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Main from '@/components/Main';
import UpdatePagesHeader from '@/components/header/UpdatePagesHeader';
import AddGalleryImageForm from '@/components/imageGallery/AddGalleryImageForm';
import UpdateImageGalleryForm from '@/components/imageGallery/UpdateImageGalleryForm';
import UpdateTagsForm from '@/components/imageGallery/UpdateTagsForm';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import { fetchGallery } from '@/functions/gallery';
import { getTags } from '@/functions/tags';
import { Gallery } from '@/types/gallery';
import { Tag } from '@/types/tags';
import { useState, useEffect } from 'react';

export default function UpdateGallery() {
  const [currentGalleryArray, setCurrentGalleryArray] = useState<Gallery[]>([]);
  const [view, setView] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchCurrentGallery() {
      await fetchGallery(setCurrentGalleryArray);
      const currentTags = await getTags();
      setTags(currentTags);
    }

    fetchCurrentGallery();
  }, [setCurrentGalleryArray, setTags]);

  return (
    <>
      <DefaultHead />
      <Body>
        <UpdatePagesHeader />
        <Main>
          <Content additionalClasses='w-full justify-center flex flex-col'>
            <label className='items-center justify-center md:flex'>
              <input
                type={'checkbox'}
                checked={view}
                onChange={() => setView(!view)}
                className='cursor-pointer accent-lilac'
              />
              &nbsp;Would you like to see the current gallery items?
            </label>
            {view &&
              currentGalleryArray.map((currentGallery) => (
                <div className='p-4 mb-4 border-2 rounded-lg border-lilac' key={currentGallery.id}>
                  <UpdateImageGalleryForm
                    currentGallery={currentGallery}
                    setCurrentGallery={setCurrentGalleryArray}
                    tags={tags}
                  />
                </div>
              ))}
            <AddGalleryImageForm setCurrentGallery={setCurrentGalleryArray} tags={tags} />
            {tags.length == 0 ? <LoadingSpinner /> : <UpdateTagsForm tags={tags} setTags={setTags} />}
          </Content>
        </Main>
      </Body>
    </>
  );
}
