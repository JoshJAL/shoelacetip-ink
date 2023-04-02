import { Gallery } from '@/types/gallery';
import BlurImage from '../blurImage/BlurImage';

export interface Props {
  galleryItem: Gallery;
}

export default function ImageGalleryImage({ galleryItem }: Props) {
  return (
    <div className='w-full overflow-hidden bg-gray-200 rounded-lg'>
      <BlurImage
        alt={galleryItem.title}
        imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/gallery/${galleryItem.image}`}
      />
    </div>
  );
}
