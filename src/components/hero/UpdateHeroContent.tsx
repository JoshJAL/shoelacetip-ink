import { updateHero as updateHeroFunction } from '@/functions/fetchHero';
import { Hero } from '@/types/hero';
import { useState } from 'react';
import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';
import TextArea from '../formComponents/TextArea';
import RichTextEditor from '../richTextEditor/RichTextEditor';

interface Props {
  currentHero: Hero;
}

export default function UpdateHeroContent({ currentHero }: Props) {
  const [bio, setBio] = useState(currentHero.bio);
  const [disclaimer, setDisclaimer] = useState(currentHero.disclaimer);
  const [submitting, setSubmitting] = useState(false);
  const [currentBio, setCurrentBio] = useState(currentHero.bio);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setCurrentBio(bio);
    await updateHeroFunction(bio, disclaimer);
    setSubmitting(false);
  }

  return (
    <form className='flex flex-col w-full max-w-lg menu_bar' onSubmit={(e) => handleSubmit(e)}>
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
