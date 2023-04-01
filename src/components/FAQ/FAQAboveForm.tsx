import { FAQ as FAQType } from '@/types/FAQ';
import Blurb from '../blurb/Blurb';
import Label from '../formComponents/Label';
import Button from '../Button';
import supabase from '@/utils/supabase';
import { useState } from 'react';
import RichTextEditor from '../richTextEditor/RichTextEditor';

interface Props {
  currentFAQ: FAQType;
  setCurrentFAQs: React.Dispatch<React.SetStateAction<FAQType[]>>;
}

export default function FAQAboveForm({ currentFAQ, setCurrentFAQs }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [newQuestion, setNewQuestion] = useState(currentFAQ.question);
  const [newAnswer, setNewAnswer] = useState(currentFAQ.answer);

  const handleDelete = async () => {
    setDeleting(true);
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    const { data, error } = await supabase.from('faq').delete().match({ id: currentFAQ.id }).select('*');
    if (error) {
      console.log(error);
    }
    if (data) {
      setCurrentFAQs((prev) => prev.filter((faq) => faq.id !== currentFAQ.id));
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    const { data, error } = await supabase
      .from('faq')
      .update({ question: newQuestion, answer: newAnswer })
      .match({ id: currentFAQ.id })
      .select('*');
    if (error) {
      console.log(error);
    }
    if (data) {
      currentFAQ.question = newQuestion;
      currentFAQ.answer = newAnswer;
      setCurrentFAQs((prev) => prev.map((faq) => (faq.id === currentFAQ.id ? currentFAQ : faq)));
    }
    setUpdating(false);
  };

  return (
    <div className='flex flex-col w-full gap-2 p-2 my-2 border-2 rounded-lg border-customPink'>
      <Label htmlFor='question' text='Question:' />
      <div className='mb-4 text-lg' dangerouslySetInnerHTML={{ __html: currentFAQ.question }} />
      <RichTextEditor setText={setNewQuestion} />
      <Label htmlFor='answer' text='Answer:' />
      <div className='mb-4 text-lg' dangerouslySetInnerHTML={{ __html: currentFAQ.answer }} />
      <RichTextEditor setText={setNewAnswer} />
      <div className='flex flex-col gap-4 mt-2'>
        <div>
          <Button text={updating ? 'Updating...' : 'Update'} onClick={handleUpdate} />
        </div>
        <div>
          <Button danger text={deleting ? 'Deleting...' : 'Delete'} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
