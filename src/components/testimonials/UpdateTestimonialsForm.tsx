import { deleteTestimonial } from '@/functions/fetchTestimonials';
import { Testimonial } from '@/types/testimonials';
import supabase from '@/utils/supabase';
import { useRef, useState } from 'react';
import Button from '../Button';
import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';
import TextArea from '../formComponents/TextArea';
import BlurImage from '../blurImage/BlurImage';

interface Props {
  currentTestimonial: Testimonial;
  setCurrentTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}

export default function UpdateTestimonialsForm({ currentTestimonial, setCurrentTestimonials }: Props) {
  const [firstName, setFirstName] = useState(currentTestimonial.first_name as string);
  const [lastName, setLastName] = useState(currentTestimonial.last_name as string);
  const [testimonial, setTestimonial] = useState(currentTestimonial.text as string);
  const [image, setImage] = useState(currentTestimonial.image as string);
  const [affiliation, setAffiliation] = useState(currentTestimonial.affiliation as string);
  const [updating, setUpdating] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [deleting, setDeleting] = useState(false);

  function appendNumberToFileName(fileName: string) {
    const fileNameWithoutExtension = fileName.split('.')[0];
    const fileExtension = fileName.split('.')[1];
    const newFileName = fileNameWithoutExtension + '-' + Date.now() + '.' + fileExtension;
    return newFileName;
  }

  async function handleDelete(index: number) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    setDeleting(true);
    try {
      const data = await deleteTestimonial(index);
      console.log(data);
      setCurrentTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== index));
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdating(true);
    if (uploadedImage) {
      let fileName = uploadedImage.name;
      try {
        const { error } = await supabase.storage
          .from('images')
          .upload('testimonials/' + fileName, uploadedImage, { cacheControl: '3600', upsert: false });

        if (error && error.message == 'The resource already exists') {
          fileName = appendNumberToFileName(uploadedImage.name);
          const { error } = await supabase.storage
            .from('images')
            .upload('testimonials/' + fileName, uploadedImage, { cacheControl: '3600', upsert: false });

          if (error) {
            console.log(error);
          }
        }

        if (error && error.message !== 'The resource already exists') {
          alert(error.message + '\nThere was an error uploading your image.\nPlease try again.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setImage(fileName);

        const { error } = await supabase
          .from('testimonials')
          .update({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            text: testimonial.trim(),
            image: fileName,
            affiliation: affiliation.trim()
          })
          .eq('id', currentTestimonial.id);

        if (error) {
          console.log(error.message + '\nThere was an error updating your testimonial.\nPlease try again.');
        }
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          text: testimonial.trim(),
          affiliation: affiliation.trim()
        })
        .eq('id', currentTestimonial.id);

      if (error) {
        console.log(error.message + '\nThere was an error updating your testimonial.\nPlease try again.');
      }
    }
    setUpdating(false);
    // @ts-ignore
    fileInputRef.current.value = null;
  }

  return (
    <div>
      <form className='flex flex-col w-full' onSubmit={(e) => handleSubmit(e)}>
        <Label htmlFor='firstName' text='First Name:' />
        <InputTextEmailPassword
          type='text'
          name='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Label htmlFor='lastName' text='Last Name:' />
        <InputTextEmailPassword
          type='text'
          name='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Label htmlFor='testimonial' text='Testimonial:' />
        <TextArea name='testimonial' value={testimonial} onChange={(e) => setTestimonial(e.target.value)} />
        <Label htmlFor='affiliation' text='Affiliation:' />
        <InputTextEmailPassword
          type='text'
          name='affiliation'
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        />
        <Label htmlFor='image' text='Current Image:' />
        <BlurImage
          imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/testimonials/${image}`}
          additionalClassNames='w-[75%] border-2 border-lilac rounded-lg mb-4'
          alt={`Testimonial image for ${firstName} ${lastName}`}
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
          onClick={async () => handleDelete(currentTestimonial.id)}
        />
      </div>
    </div>
  );
}
