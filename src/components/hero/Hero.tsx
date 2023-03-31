import { Hero as HeroType } from '@/types/hero';
import Image from 'next/image';
import Blurb from '../blurb/Blurb';

const transparentSiteImage = '/images/siteImageTransparent.png';

interface HeroProps {
  heroInformation: HeroType;
}

export default function Hero({ heroInformation }: HeroProps) {
  return (
    <section className='flex flex-col items-center justify-center w-full'>
      <div className='w-[55%]'>
        <Image src={transparentSiteImage} alt='Site Image' width={825} height={725} priority />
      </div>

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
