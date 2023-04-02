import { Hero as HeroType } from '@/types/hero';
import Blurb from '../blurb/Blurb';
import BlurImage from '../blurImage/BlurImage';

interface HeroProps {
  heroInformation: HeroType;
}

export default function Hero({ heroInformation }: HeroProps) {
  return (
    <section className='flex flex-col items-center justify-center w-full'>
      <BlurImage
        imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/hero/${heroInformation.heroImage}`}
        additionalClassNames='md:w-[60%] w-full'
        alt='Hero Image'
      />

      <div className='py-4'>
        <Blurb>
          <p dangerouslySetInnerHTML={{ __html: heroInformation.bio }} />
        </Blurb>
        <p className='py-4 text-xl font-semibold text-center'>
          <i>{heroInformation.disclaimer}</i>
        </p>
      </div>
    </section>
  );
}
