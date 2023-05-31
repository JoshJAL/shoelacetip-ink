import { Testimonial } from '@/types/testimonials';
import supabase from '@/utils/supabase';

export async function fetchTestimonials(setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>) {
  let { data: testimonials, error } = await supabase.from('testimonials').select('*');
  if (!testimonials) return;
  testimonials = testimonials?.sort((a, b) => a.id - b.id);
  setTestimonials(testimonials as Testimonial[]);
}

export async function deleteTestimonial(id: number) {
  let { data, error } = await supabase.from('testimonials').delete().eq('id', id).select('*');
  if (error) console.error(error);
  if (!data) return;
  data = data?.sort((a, b) => a.id - b.id);
  return data as Testimonial[];
}
