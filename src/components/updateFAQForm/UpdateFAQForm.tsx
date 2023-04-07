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
  const [plainTextQuestion, setPlainTextQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    let questionNoPunctuation = plainTextQuestion.replace(regex, '');

    let questionArray = questionNoPunctuation.split(' ');
    function createId(word: string, index: number) {
      if (index === 0) return word.toLowerCase();
      word.replace(/[!\"#\＄%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]/g, '');
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    let divIdArray: string[] = [];

    for (let i = 0; i < questionArray.length; i++) {
      divIdArray.push(createId(questionArray[i], i));
    }

    let divId = divIdArray.join('');

    const { data } = await supabase
      .from('faq')
      .insert([
        {
          question: question.trim(),
          answer: answer.trim(),
          divId
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
      <RichTextEditor setText={setQuestion} setPlainText={setPlainTextQuestion} />
      <Label htmlFor='answer' text='Answer:' />
      <RichTextEditor setText={setAnswer} />
      <div className='pt-4'>
        <SubmitButton text={submitting ? 'Submitting...' : 'Submit'} />
      </div>
    </form>
  );
}
