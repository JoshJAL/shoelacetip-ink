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
  const [bio, setBio] = useState('');
  const [minimumRate, setMinimumRate] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentHero) {
      setBio(currentHero.bio);
      setMinimumRate(currentHero.minimum_rate);
      setHourlyRate(currentHero.hourly_rate);
      setDisclaimer(currentHero.disclaimer);
    }
  }, [currentHero]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await updateHeroFunction(bio, minimumRate, hourlyRate, disclaimer);
    setSubmitting(false);
  }

  return (
    <form className='flex flex-col w-full' onSubmit={(e) => handleSubmit(e)}>
      <Label htmlFor='bio' text='Bio:' />
      <TextArea name='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
      <Label htmlFor='minimumRate' text='Minimum Rate:' />
      <InputTextEmailPassword
        name={'minimumRate'}
        value={minimumRate}
        onChange={(e) => setMinimumRate(e.target.value)}
      />
      <Label htmlFor='hourlyRate' text='Hourly Rate:' />
      <InputTextEmailPassword name={'hourlyRate'} value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
      <Label htmlFor='disclaimer' text='Disclaimer:' />
      <TextArea name='disclaimer' value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} />
      <div className='py-4'>
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
