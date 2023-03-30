import { Testimonial } from '@/types/testimonials';
import supabase from '@/utils/supabase';

export async function fetchTestimonials(setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>) {
  let { data: testimonials, error } = await supabase.from('testimonials').select('*');
  setTestimonials(testimonials as Testimonial[]);
}

export async function deleteTestimonial(id: number) {
  let { data, error } = await supabase.from('testimonials').delete().eq('id', id).select('*');
  console.log(data);
  if (error) console.log(error);
  return data as Testimonial[];
}
