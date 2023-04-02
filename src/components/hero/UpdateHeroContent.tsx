import { updateHero as updateHeroFunction } from '@/functions/fetchHero';
import { Hero } from '@/types/hero';
import { useState, useRef } from 'react';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';
import TextArea from '../formComponents/TextArea';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import supabase from '@/utils/supabase';
import BlurImage from '../blurImage/BlurImage';

interface Props {
  currentHero: Hero;
}

export default function UpdateHeroContent({ currentHero }: Props) {
  const [bio, setBio] = useState(currentHero.bio);
  const [disclaimer, setDisclaimer] = useState(currentHero.disclaimer);
  const [submitting, setSubmitting] = useState(false);
  const [currentBio, setCurrentBio] = useState(currentHero.bio);
  const [image, setImage] = useState(currentHero.heroImage as string);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    if (uploadedImage) {
      try {
        const { error } = await supabase.storage
          .from('images')
          .upload('hero/' + uploadedImage.name, uploadedImage, { cacheControl: '3600', upsert: false });

        if (error && error.message == 'The resource already exists') {
          if (confirm('This image already exists. Do you want to replace it?\nIf not rename it and try again.')) {
            const { error } = await supabase.storage
              .from('images')
              .update('hero/' + uploadedImage.name, uploadedImage, { cacheControl: '3600', upsert: true });

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
        updateHeroFunction(bio, disclaimer, uploadedImage.name);
      }
    } else {
      await updateHeroFunction(bio, disclaimer);
    }

    setCurrentBio(bio);
    setSubmitting(false);
    // @ts-ignore
    fileInputRef.current.value = null;
  }

  return (
    <form className='flex flex-col w-full menu_bar' onSubmit={(e) => handleSubmit(e)}>
      <Label htmlFor='image' text='Upload New Image:' />
      <div className='flex items-center justify-center w-full'>
        <BlurImage
          imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/hero/${image}`}
          alt='Hero Image'
          additionalClassNames='w-[60%]'
        />
      </div>
      <input
        type={'file'}
        name={'image'}
        id={'image'}
        onChange={(e) => setUploadedImage(e.target.files![0])}
        ref={fileInputRef}
        className='file:bg-lilac file:border-none file:px-2 file:py-2 file:rounded-lg file:hover file:hover:bg-lilacHover file:transition-all file:duration-200 file:ease-in-out file:cursor-pointer'
      />
      <Label htmlFor='bio' text='Bio:' />
      <div>
        <p className='pb-4 text-lg font-semibold' dangerouslySetInnerHTML={{ __html: currentBio }} />
      </div>
      <RichTextEditor setText={setBio} />
      <Label htmlFor='disclaimer' text='Disclaimer:' />
      <TextArea required name='disclaimer' value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} />
      <div className='py-4'>
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
