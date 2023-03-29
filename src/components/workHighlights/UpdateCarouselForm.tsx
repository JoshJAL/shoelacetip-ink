import { fetchCurrentImages } from '@/functions/fetchCarousel';
import supabase from '@/utils/supabase';
import { useRef } from 'react';
import { useState } from 'react';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';

interface Props {
  currentImages: string[];
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function UpdateCarouselForm({ currentImages, setCurrentImages }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);
  const fileInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  function handleUploadFiles(chosenFiles: File[]) {
    const uploaded = [...uploadedFiles];
    const fileNames = [...uploadedFileNames];
    chosenFiles.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        fileNames.push(file.name);
      }
    });
    setUploadedFiles(uploaded);
    setUploadedFileNames(fileNames);
  }

  function handleFileEvent(e: React.ChangeEvent<HTMLInputElement>) {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    let newArray = [...currentImages];

    if (uploadedFiles.length > 0) {
      newArray.push(...uploadedFileNames);
      const { error: updateDbRowError } = await supabase.from('carousel').update({ slides: newArray }).eq('id', 1);

      if (updateDbRowError) {
        console.log('Error updating db', updateDbRowError);
      }

      for (let i = 0; i < uploadedFiles.length; i++) {
        const { error } = await supabase.storage
          .from('images')
          .upload('carousel/' + uploadedFiles[i].name, uploadedFiles[i], {
            cacheControl: '3600',
            upsert: false
          });

        if (error && error.message !== 'The resource already exists') {
          alert(error.message + '\nThere was an error uploading your image(s).\nPlease try again.');
        }
      }
    }
    setCurrentImages(newArray);
    setSubmitting(false);
    // @ts-ignore
    fileInputRef.current.value = null;
    setUploadedFiles([]);
    setUploadedFileNames([]);
  }

  return (
    <form className='flex flex-col w-full' onSubmit={(e) => handleSubmit(e)}>
      <Label text='Would you like to add Additional Images?' htmlFor='updateCarouselImages' />
      <input
        type={'file'}
        multiple
        name={'updateCarouselImages'}
        id={'updateCarouselImages'}
        onChange={(e) => handleFileEvent(e)}
        ref={fileInputRef}
        className='file:bg-lilac file:border-none file:px-2 file:py-2 file:rounded-lg file:hover file:hover:bg-lilacHover file:transition-all file:duration-200 file:ease-in-out file:cursor-pointer'
      />
      <div className='py-4'>
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
