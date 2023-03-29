import { Testimonial } from '@/types/testimonials';
import supabase from '@/utils/supabase';

export async function fetchTestimonials(setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>) {
  let { data: testimonials, error } = await supabase.from('testimonials').select('*');
  setTestimonials(testimonials as Testimonial[]);
}
