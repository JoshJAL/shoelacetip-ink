import { updateArtistPageData } from '@/functions/artistPage';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import { useState, useRef } from 'react';
import { Artist } from '@/types/artist';
import supabase from '@/utils/supabase';

interface Props {
  currentArtistPageInfo: Artist;
}

export default function UpdateArtistForm({ currentArtistPageInfo }: Props) {
  const [bio, setBio] = useState(currentArtistPageInfo.bio);
  const [submitting, setSubmitting] = useState(false);
  const [currentBio, setCurrentBio] = useState(currentArtistPageInfo.bio);
  const [image, setImage] = useState(currentArtistPageInfo.headshot as string);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    if (uploadedImage) {
      try {
        const { error } = await supabase.storage
          .from('images')
          .upload('artist/' + uploadedImage.name, uploadedImage, { cacheControl: '3600', upsert: false });

        if (error && error.message == 'The resource already exists') {
          if (confirm('This image already exists. Do you want to replace it?\nIf not rename it and try again.')) {
            const { error } = await supabase.storage
              .from('images')
              .update('artist/' + uploadedImage.name, uploadedImage, { cacheControl: '3600', upsert: true });

            if (error) {
              console.log(error);
            }

            setImage(uploadedImage.name);
          }
        }

        if (error && error.message !== 'The resource already exists') {
          alert(error.message + '\nThere was an error uploading your image.\nPlease try again.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setImage(uploadedImage.name);
        await updateArtistPageData(bio, uploadedImage.name);
      }
    } else {
      await updateArtistPageData(bio);
    }

    setCurrentBio(bio);
    setSubmitting(false);
    // @ts-ignore
    fileInputRef.current.value = null;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-full'>
      <Label htmlFor='image' text='Current Image:' />
      <img
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/artist/${image}`}
        className='w-[75%] border-2 border-lilac rounded-lg mb-4'
        alt={`Artist Headshot`}
      />
      <Label htmlFor='bio' text='Artist Bio:' />
      <div>
        <p className='pb-4 text-lg font-semibold' dangerouslySetInnerHTML={{ __html: currentBio }} />
      </div>
      <RichTextEditor setText={setBio} />
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
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
