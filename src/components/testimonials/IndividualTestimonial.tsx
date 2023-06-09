import BlurImage from '../blurImage/BlurImage';

interface TestimonialProps {
  firstName: string | null;
  lastName: string | null;
  text: string;
  affiliation: string;
  image?: string;
  additionalClasses?: string;
}

export default function IndividualTestimonial({
  firstName,
  lastName,
  text,
  image,
  affiliation,
  additionalClasses
}: TestimonialProps) {
  return (
    <section
      className={`flex flex-col w-full gap-6 p-7 bg-lilac rounded-xl ${additionalClasses ? additionalClasses : ''}`}
    >
      <div className='flex flex-col items-start justify-start'>
        <p className='text-lg font-semibold '>
          <span className='text-5xl font-black text-customPink drop-shadow-[0_1.2px_1px_rgba(0,0,0,0.8)]'>&quot;</span>
          {text}
        </p>
        <div className='flex items-center justify-between gap-1 mt-7'>
          <div className='flex flex-col flex-1'>
            {firstName || lastName ? (
              <p className='text-xl font-medium'>
                <span className='text-customPink drop-shadow-[0_1.2px_1px_rgba(0,0,0,0.8)]'>@</span>
                &nbsp;
                {firstName}
                &nbsp;
                {lastName}
              </p>
            ) : null}
            <p className='mt-1 text-base'>{affiliation}</p>
          </div>
        </div>
      </div>
      {image && (
        <BlurImage
          imageSource={image}
          alt={`${firstName} ${lastName}'s Tattoo`}
          additionalClassNames='border rounded-lg border-customPink'
        />
      )}
    </section>
  );
}
