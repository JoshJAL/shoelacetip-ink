import { Testimonial } from '@/types/testimonials';
import IndividualTestimonial from './IndividualTestimonial';

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <div className='flex flex-col w-full px-4 py-5 md:px-8 md:py-7 bg-lightOlive rounded-2xl'>
      <div className='min-h-[100px]'>
        <p className='font-bold md:text-[60px] text-[27px]'>What others are saying</p>
      </div>
      <div className='flex flex-wrap gap-5'>
        {testimonials.map((testimonial) => (
          <IndividualTestimonial
            key={testimonial.id}
            firstName={testimonial.first_name}
            lastName={testimonial.last_name}
            affiliation={testimonial.affiliation}
            text={testimonial.text}
            image={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/testimonials/${testimonial.image}`}
          />
        ))}
      </div>
    </div>
  );
}
