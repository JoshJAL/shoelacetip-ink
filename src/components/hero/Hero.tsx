import { Hero as HeroType } from '@/types/hero';
import Blurb from '../blurb/Blurb';
import BlurImage from '../blurImage/BlurImage';

interface HeroProps {
  heroInformation: HeroType;
}

export default function Hero({ heroInformation }: HeroProps) {
  return (
    <section className='flex flex-col items-center justify-center w-full'>
      <div className='flex items-center justify-center w-full p-6 rounded-lg bg-lilac'>
        <BlurImage
          imageSource={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/hero/${heroInformation.heroImage}`}
          additionalClassNames='xl:w-[80%] w-full rounded-lg shadow-lg '
          alt='Hero Image'
        />
      </div>

      <div className='pt-4'>
        <Blurb>
          <p dangerouslySetInnerHTML={{ __html: heroInformation.bio }} />
        </Blurb>
      </div>
    </section>
  );
}
