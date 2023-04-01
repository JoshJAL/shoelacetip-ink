import { FAQ } from '@/types/FAQ';
import React from 'react';
import Label from '../formComponents/Label';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import SubmitButton from '../formComponents/SubmitButton';
import supabase from '@/utils/supabase';

interface Props {
  setCurrentFAQs: React.Dispatch<React.SetStateAction<FAQ[]>>;
}

export default function UpdateFAQForm({ setCurrentFAQs }: Props) {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const { data } = await supabase
      .from('faq')
      .insert([
        {
          question: question.trim(),
          answer: answer.trim()
        }
      ])
      .select('*');

    setAnswer('');
    setQuestion('');
    setCurrentFAQs((prev) => [...prev, data![0] as FAQ]);
    setSubmitting(false);
  };

  return (
    <form className='flex flex-col w-full' onSubmit={handleSubmit}>
      <Label htmlFor='question' text='Question:' />
      <RichTextEditor setText={setQuestion} />
      <Label htmlFor='answer' text='Answer:' />
      <RichTextEditor setText={setAnswer} />
      <div className='pt-4'>
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
