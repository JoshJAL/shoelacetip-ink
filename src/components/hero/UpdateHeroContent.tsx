import { Hero } from '@/types/hero';
import Label from '../formComponents/Label';
import { useState, useEffect } from 'react';
import SubmitButton from '../formComponents/SubmitButton';
import { updateHero as updateHeroFunction } from '@/functions/fetchHero';
import TextArea from '../formComponents/TextArea';
import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';

interface Props {
  currentHero: Hero;
}

export default function UpdateHeroContent({ currentHero }: Props) {
  const [bio, setBio] = useState(currentHero.bio as string);
  const [minimumRate, setMinimumRate] = useState(currentHero.minimum_rate as string);
  const [hourlyRate, setHourlyRate] = useState(currentHero.hourly_rate as string);
  const [disclaimer, setDisclaimer] = useState(currentHero.disclaimer as string);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await updateHeroFunction(bio, minimumRate, hourlyRate, disclaimer);
    setSubmitting(false);
  }

  return (
    <form className='flex flex-col w-full max-w-lg' onSubmit={(e) => handleSubmit(e)}>
      <Label htmlFor='bio' text='Bio:' />
      <TextArea required name='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
      <Label htmlFor='minimumRate' text='Minimum Rate:' />
      <InputTextEmailPassword
        required
        name={'minimumRate'}
        value={minimumRate}
        onChange={(e) => setMinimumRate(e.target.value)}
      />
      <Label htmlFor='hourlyRate' text='Hourly Rate:' />
      <InputTextEmailPassword
        required
        name={'hourlyRate'}
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
      />
      <Label htmlFor='disclaimer' text='Disclaimer:' />
      <TextArea required name='disclaimer' value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} />
      <div className='py-4'>
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
