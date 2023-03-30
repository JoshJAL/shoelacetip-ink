import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';
import Label from '../formComponents/Label';
import { useState, useRef } from 'react';
import TextArea from '../formComponents/TextArea';
import SubmitButton from '../formComponents/SubmitButton';
import supabase from '@/utils/supabase';
import { Testimonial } from '@/types/testimonials';

interface AddTestimonialFormProps {
  currentTestimonials: Testimonial[];
  setCurrentTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}

export default function AddTestimonialForm({ currentTestimonials, setCurrentTestimonials }: AddTestimonialFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [updating, setUpdating] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdating(true);
    if (uploadedImage) {
      const { error } = await supabase.storage
        .from('images')
        .upload('testimonials/' + uploadedImage.name, uploadedImage, { cacheControl: '3600', upsert: false });

      if (error && error.message !== 'The resource already exists') {
        alert(error.message + '\nThere was an error uploading your image.\nPlease try again.');
        console.log(error);
      }

      const { data, error: testimonialError } = await supabase
        .from('testimonials')
        .insert([
          {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            text: testimonial.trim(),
            image: uploadedImage.name,
            affiliation: affiliation.trim()
          }
        ])
        .select('*');

      setCurrentTestimonials((prev) => [...prev, data![0] as Testimonial]);

      if (testimonialError) {
        console.log(testimonialError.message + '\nThere was an error updating your testimonial.\nPlease try again.');
      }

      setFirstName('');
      setLastName('');
      setTestimonial('');
      setAffiliation('');
      setUploadedImage(null);
      setUpdating(false);
      // @ts-ignore
      fileInputRef.current.value = null;
    }
  }

  return (
    <form className='flex flex-col w-full' onSubmit={(e) => handleSubmit(e)}>
      <Label htmlFor='firstName' text='First Name:' />
      <InputTextEmailPassword
        type='text'
        name='firstName'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Label htmlFor='lastName' text='Last Name:' />
      <InputTextEmailPassword
        type='text'
        name='lastName'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Label htmlFor='testimonial' text='Testimonial:' />
      <TextArea required name='testimonial' value={testimonial} onChange={(e) => setTestimonial(e.target.value)} />
      <Label htmlFor='affiliation' text='Affiliation:' />
      <InputTextEmailPassword
        required
        type='text'
        name='affiliation'
        value={affiliation}
        onChange={(e) => setAffiliation(e.target.value)}
      />
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
