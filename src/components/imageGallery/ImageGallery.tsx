import { Gallery } from '@/types/gallery';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import BlurImage from '../blurImage/BlurImage';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  gallery: Gallery[];
}

export default function ImageGallery({ gallery }: ImageGalleryProps) {
  const [modal, setModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>('');
  const [tempTitle, setTempTitle] = useState<string>('');
  const [tempDescription, setTempDescription] = useState<string>('');

  const getImage = (imgSrc: string, description: string, title: string) => {
    setTempImageSrc(imgSrc);
    setTempDescription(description);
    setTempTitle(title);
    setModal(true);
  };

  return (
    <>
      <div
        className={`w-full h-auto fixed top-0 left-0 flex flex-col items-center justify-center bg-black bg-opacity-60 overflow-hidden z-50 transition-all duration-300 ease-in-out
          ${modal ? 'scale-100 opacity-1 visible' : 'invisible scale-0 opacity-0'}`}
      >
        <BlurImage
          imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/gallery/${tempImageSrc}`}
          alt='Opened Gallery Image'
          additionalClassNames='w-full max-w-[100%] h-screen'
        />
        <IoClose
          className='fixed w-20 h-20 cursor-pointer top-3 lg:right-[15%] right-3 text-lilac hover:text-lilacHover'
          onClick={() => setModal(false)}
        />
        <div className='fixed flex flex-col items-center justify-center px-6 py-4 mx-5 text-center rounded-lg bg-lilac bottom-10'>
          <p className='text-xl font-semibold'>{tempTitle}</p>
          <p className='text-lg'>{tempDescription}</p>
        </div>
      </div>
      <div className={styles.gallery}>
        {gallery.map((galleryItem) => (
          <div
            className={styles.images}
            key={galleryItem.id}
            onClick={() => getImage(galleryItem.image, galleryItem.description, galleryItem.description)}
          >
            <BlurImage
              alt={galleryItem.title}
              imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/gallery/${galleryItem.image}`}
              additionalClassNames='rounded-lg'
            />
          </div>
        ))}
      </div>
    </>
  );
}
