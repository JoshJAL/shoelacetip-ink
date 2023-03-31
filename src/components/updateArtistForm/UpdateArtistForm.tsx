import { updateArtistPageData } from '@/functions/artistPage';
import Label from '../formComponents/Label';
import SubmitButton from '../formComponents/SubmitButton';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import { useState } from 'react';
import { Artist } from '@/types/artist';

interface Props {
  currentArtistPageInfo: Artist;
}

export default function UpdateArtistForm({ currentArtistPageInfo }: Props) {
  const [bio, setBio] = useState(currentArtistPageInfo.bio);
  const [submitting, setSubmitting] = useState(false);
  const [currentBio, setCurrentBio] = useState(currentArtistPageInfo.bio);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setCurrentBio(bio);
    await updateArtistPageData(bio);
    setSubmitting(false);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Label htmlFor='bio' text='Artist Bio:' />
      <div>
        <p className='pb-4 text-lg font-semibold' dangerouslySetInnerHTML={{ __html: currentBio }} />
      </div>
      <RichTextEditor setText={setBio} />
      <div className='pt-4'>
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
