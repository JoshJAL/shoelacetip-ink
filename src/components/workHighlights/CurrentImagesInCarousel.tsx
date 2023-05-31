import supabase from '@/utils/supabase';
import { useState } from 'react';
import BlurImage from '../blurImage/BlurImage';

interface Props {
  currentImages: string[];
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CurrentImagesInCarousel({ currentImages, setCurrentImages }: Props) {
  const [viewImages, setViewImages] = useState(false);

  async function deleteImage(index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this image?')) return;

    let newArray = currentImages;
    newArray.splice(index, 1);

    setCurrentImages((current) => current.filter((image, i) => image[i] !== current[index]));
    const { error } = await supabase.from('carousel').update({ slides: newArray }).eq('id', 1);
    if (error) console.error(error);
  }

  if (!viewImages) {
    return (
      <label className='items-center justify-center md:flex'>
        <input
          type={'checkbox'}
          checked={viewImages}
          onChange={() => setViewImages(!viewImages)}
          className='cursor-pointer accent-lilac'
        />
        &nbsp;Would you like to see the images already in the carousel?
      </label>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <label className='items-center justify-center md:flex'>
        <input
          type={'checkbox'}
          checked={viewImages}
          onChange={() => setViewImages(!viewImages)}
          className='cursor-pointer accent-lilac'
        />
        &nbsp;Would you like to see the images already in the carousel?
      </label>
      <div className='grid items-center justify-center w-full gap-3 md:grid-cols-2'>
        {currentImages.map((image, index) => {
          return (
            <div className='relative flex flex-col items-center w-full group' key={index}>
              <BlurImage
                imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/carousel/${image}`}
                alt={`Carousel Image ${index}`}
                additionalClassNames='w-full mt-2 border rounded-lg border-lilac'
              />
              <button
                onClick={(e) => deleteImage(index, e)}
                className='absolute z-10 top-[50%] bg-red-600 px-4 py-2 rounded-full bg-opacity-75 hidden group-hover:block transition-all duration-200 hover:bg-opacity-100'
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
