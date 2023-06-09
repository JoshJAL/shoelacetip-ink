import { FAQ } from '@/types/FAQ';
import supabase from '@/utils/supabase';

export const fetchFAQs = async (setFAQs: React.Dispatch<React.SetStateAction<FAQ[]>>) => {
  let { data } = await supabase.from('faq').select('*');
  if (!data) return;
  data = data?.sort((a, b) => a.id - b.id);
  setFAQs(data! as FAQ[]);
};

export const updateFAQ = async (id: number, question: string, answer: string) => {
  question = question.trim();
  answer = answer.trim();

  const { error } = await supabase.from('faq').update({ question, answer }).eq('id', id);

  if (error) {
    console.error(error);
  }
};

export const deleteFAQ = async (id: number) => {
  const { error } = await supabase.from('faq').delete().eq('id', id).select('*');

  if (error) {
    console.error(error);
  }
};

export const addFAQ = async (question: string, answer: string) => {
  question = question.trim();
  answer = answer.trim();

  const { data, error } = await supabase.from('faq').insert([{ question, answer }]);
  if (data) {
    return data[0] as FAQ;
  }

  if (error) {
    console.error(error);
  }
};
