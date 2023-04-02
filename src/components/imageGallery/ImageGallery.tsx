import ImageGalleryImage from './ImageGalleryImage';
import { Gallery } from '@/types/gallery';

interface ImageGalleryProps {
  gallery: Gallery[];
}

export default function ImageGallery({ gallery }: ImageGalleryProps) {
  return (
    <div className='gallery'>
      <div className='images'>
        {gallery.map((galleryItem) => (
          <ImageGalleryImage key={galleryItem.id} galleryItem={galleryItem} />
        ))}
      </div>
    </div>
  );
}
