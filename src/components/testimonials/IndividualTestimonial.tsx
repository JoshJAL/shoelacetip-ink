import Image, { StaticImageData } from 'next/image';

interface TestimonialProps {
  firstName: string;
  lastName: string;
  text: string;
  affiliation: string;
  image: string;
}

export default function IndividualTestimonial({ firstName, lastName, text, image, affiliation }: TestimonialProps) {
  return (
    <section className='flex flex-col p-7 bg-lilac rounded-xl md:w-[320px] w-full gap-6'>
      <div className='flex flex-col items-start justify-start'>
        <p className='text-lg font-semibold '>
          <span className='text-5xl font-black text-customPink drop-shadow-[0_1.2px_1px_rgba(0,0,0,0.8)]'>&quot;</span>
          {text}
        </p>
        <div className='flex items-center justify-between gap-1 mt-7'>
          <div className='flex flex-col flex-1'>
            <p className='text-xl font-medium'>
              <span className='text-customPink drop-shadow-[0_1.2px_1px_rgba(0,0,0,0.8)]'>@</span>
              &nbsp;
              {firstName}
              &nbsp;
              {lastName}
            </p>
            <p className='mt-1 text-base'>{affiliation}</p>
          </div>
        </div>
      </div>
      <img src={image} alt={`${firstName} ${lastName}'s Tattoo`} className='border rounded-lg border-customPink' />
    </section>
  );
}
