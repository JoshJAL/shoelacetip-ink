import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import UpdatePagesHeader from '@/components/header/UpdatePagesHeader';
import Main from '@/components/Main';
import AddTestimonialForm from '@/components/testimonials/AddTestimonialForm';
import UpdateTestimonialsForm from '@/components/testimonials/UpdateTestimonialsForm';
import { fetchTestimonials } from '@/functions/fetchTestimonials';
import { Testimonial } from '@/types/testimonials';
import { useEffect, useState } from 'react';

export default function UpdateTestimonials() {
  const [currentTestimonials, setCurrentTestimonials] = useState<Testimonial[]>([]);
  const [view, setView] = useState(false);

  useEffect(() => {
    try {
      fetchTestimonials(setCurrentTestimonials);
    } catch (error) {
      console.log(error);
    }
  }, [setCurrentTestimonials]);

  return (
    <>
      <DefaultHead />
      <Body>
        <UpdatePagesHeader />
        <Main>
          <Content additionalClasses='w-full justify-center flex flex-col'>
            <label className='items-center justify-center md:flex'>
              <input
                type={'checkbox'}
                checked={view}
                onChange={() => setView(!view)}
                className='cursor-pointer accent-lilac'
              />
              &nbsp;Would you like to see the current testimonials?
            </label>
            {view &&
              currentTestimonials.map((testimonial) => (
                <div className='p-4 mb-4 border-2 rounded-lg border-lilac'>
                  <UpdateTestimonialsForm
                    currentTestimonial={testimonial}
                    key={testimonial.id}
                    setCurrentTestimonials={setCurrentTestimonials}
                  />
                </div>
              ))}
            <AddTestimonialForm
              currentTestimonials={currentTestimonials}
              setCurrentTestimonials={setCurrentTestimonials}
            />
          </Content>
        </Main>
      </Body>
    </>
  );
}
