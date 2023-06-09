import supabase from '@/utils/supabase';
import { useRef, useState } from 'react';
import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';
import { Gallery } from '@/types/gallery';
import { Tag } from '@/types/tags';

interface AddGalleryFormProps {
  setCurrentGallery: React.Dispatch<React.SetStateAction<Gallery[]>>;
  tags: Tag[];
}

export default function AddGalleryImageForm({ setCurrentGallery, tags }: AddGalleryFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [updating, setUpdating] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  tags.sort((a, b) => a.id - b.id);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdating(true);
    if (uploadedImage) {
      const { error } = await supabase.storage
        .from('images')
        .upload('gallery/' + uploadedImage.name, uploadedImage, { cacheControl: '3600', upsert: false });

      if (error && error.message !== 'The resource already exists') {
        alert(error.message + '\nThere was an error uploading your image.\nPlease try again.');
        console.error(error);
      }

      const { data, error: galleryError } = await supabase
        .from('gallery')
        .insert([
          {
            title: title.trim(),
            description: description.trim(),
            image: uploadedImage.name,
            tag: tag.trim()
          }
        ])
        .select('*');

      setCurrentGallery((prev) => [...prev, data![0] as Gallery]);

      if (galleryError) {
        console.error(galleryError.message + '\nThere was an error updating your gallery item.\nPlease try again.');
      }

      setTitle('');
      setDescription('');
      setTag('');
      setUploadedImage(null);
      setUpdating(false);
      // @ts-ignore
      fileInputRef.current.value = null;
    }
  }

  return (
    <form className='flex flex-col w-full' onSubmit={(e) => handleSubmit(e)}>
      <Label htmlFor='title' text='Title:' />
      <InputTextEmailPassword
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Label htmlFor='description' text='Description:' />
      <InputTextEmailPassword
        type='text'
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Label htmlFor='tag' text='Category:' />
      <select
        name='tag'
        onChange={(e) => setTag(e.target.value)}
        className='px-2 py-2 text-lg font-semibold border-2 rounded-lg outline-none cursor-pointer border-lilac'
      >
        <option value=''>Select a tag</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.tag_name}>
            {tag.tag_name}
          </option>
        ))}
      </select>
      <Label htmlFor='image' text='Upload New Image:' />
      <input
        required
        type={'file'}
        name={'image'}
        id={'image'}
        onChange={(e) => setUploadedImage(e.target.files![0])}
        ref={fileInputRef}
        className='file:bg-lilac file:border-none file:px-2 file:py-2 file:rounded-lg file:hover file:hover:bg-lilacHover file:transition-all file:duration-200 file:ease-in-out file:cursor-pointer'
      />
      <div className='pt-4'>
        <SubmitButton text={updating ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
