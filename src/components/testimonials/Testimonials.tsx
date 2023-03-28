import IndividualTestimonial from './IndividualTestimonial';

import joshuaTattoo from '/public/images/testimonialImages/JoshuaTattoo.png';

export default function Testimonials() {
  return (
    <div className='flex flex-col w-full px-4 py-5 md:px-8 md:py-7 bg-darkOlive rounded-2xl'>
      <div className='min-h-[100px]'>
        <p className='font-bold md:text-[60px] text-[27px]'>What others are saying</p>
      </div>
      <div className='flex flex-wrap gap-5'>
        <IndividualTestimonial
          firstName='Joshua'
          lastName='Levine'
          affiliation='Client'
          text='I love this thing, sometimes I just catch myself staring at it for hours'
          image={joshuaTattoo}
        />
        <IndividualTestimonial
          firstName='Joshua'
          lastName='Levine'
          affiliation='Client'
          text='I love this thing, sometimes I just catch myself staring at it for hours'
          image={joshuaTattoo}
        />
        <IndividualTestimonial
          firstName='Joshua'
          lastName='Levine'
          affiliation='Client'
          text='I love this thing, sometimes I just catch myself staring at it for hours'
          image={joshuaTattoo}
        />
      </div>
    </div>
  );
}
