import supabase from '@/utils/supabase';
import { useRef, useState } from 'react';
import Button from '../Button';
import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';
import { Gallery } from '@/types/gallery';
import { deleteGalleryItem } from '@/functions/gallery';
import BlurImage from '../blurImage/BlurImage';

interface Props {
  currentGallery: Gallery;
  setCurrentGallery: React.Dispatch<React.SetStateAction<Gallery[]>>;
}

export default function UpdateGalleryForm({ currentGallery, setCurrentGallery }: Props) {
  const [title, setTitle] = useState(currentGallery.title as string);
  const [description, setDescription] = useState(currentGallery.description as string);
  const [image, setImage] = useState(currentGallery.image as string);
  const [updating, setUpdating] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(index: number) {
    if (!confirm('Are you sure you want to delete this gallery image?')) return;
    setDeleting(true);
    try {
      const data = await deleteGalleryItem(index);
      console.log(data);
      setCurrentGallery((prev) => prev.filter((galleryItem) => galleryItem.id !== index));
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdating(true);
    if (uploadedImage) {
      try {
        const { error } = await supabase.storage
          .from('images')
          .upload('gallery/' + uploadedImage.name, uploadedImage, { cacheControl: '3600', upsert: false });

        if (error && error.message !== 'The resource already exists') {
          alert(error.message + '\nThere was an error uploading your image.\nPlease try again.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setImage(uploadedImage.name);

        const { error } = await supabase
          .from('gallery')
          .update({
            title: title.trim(),
            image: uploadedImage.name,
            description: description.trim()
          })
          .eq('id', currentGallery.id);

        if (error) {
          console.log(error.message + '\nThere was an error updating your gallery item.\nPlease try again.');
        }
      }
    } else {
      const { error } = await supabase
        .from('gallery')
        .update({
          title: title.trim(),
          description: description.trim()
        })
        .eq('id', currentGallery.id);

      if (error) {
        console.log(error.message + '\nThere was an error updating your gallery item.\nPlease try again.');
      }
    }
    setUpdating(false);
    // @ts-ignore
    fileInputRef.current.value = null;
  }

  return (
    <div>
      <form className='flex flex-col w-full' onSubmit={(e) => handleSubmit(e)}>
        <Label htmlFor='title' text='Title:' />
        <InputTextEmailPassword type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <Label htmlFor='description' text='Description:' />
        <InputTextEmailPassword
          type='text'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label htmlFor='image' text='Current Image:' />
        <BlurImage
          imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/gallery/${image}`}
          additionalClassNames='w-[75%] border-2 border-lilac rounded-lg mb-4'
          alt={`Image of ${title}`}
        />
        <Label htmlFor='image' text='Upload New Image:' />
        <input
          type={'file'}
          name={'image'}
          id={'image'}
          onChange={(e) => setUploadedImage(e.target.files![0])}
          ref={fileInputRef}
          className='file:bg-lilac file:border-none file:px-2 file:py-2 file:rounded-lg file:hover file:hover:bg-lilacHover file:transition-all file:duration-200 file:ease-in-out file:cursor-pointer'
        />
        <div className='pt-4'>
          <SubmitButton text={updating ? 'Updating...' : 'Update'} />
        </div>
      </form>
      <div className='pt-4'>
        <Button
          type='button'
          danger
          text={deleting ? 'Deleting...' : 'Delete'}
          onClick={async () => handleDelete(currentGallery.id)}
        />
      </div>
    </div>
  );
}
