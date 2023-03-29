import { Hero as HeroType } from '@/types/hero';
import Image from 'next/image';

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
        <p className='pb-4 text-xl font-semibold text-center'>{heroInformation.bio}</p>
        <div className='flex w-full flex-start'>
          <ul className='flex flex-col gap-2'>
            <li className='text-lg font-bold'>Rates:</li>
            <li className='ml-5'>
              <span className='font-semibold underline underline-offset-2'>Minimum</span>:{' '}
              {heroInformation.minimum_rate}
            </li>
            <li className='ml-5'>
              <span className='font-semibold underline underline-offset-2'>Hourly</span>: {heroInformation.hourly_rate}
            </li>
          </ul>
        </div>
        <p className='py-4 text-xl font-semibold text-center'>
          <i>{heroInformation.disclaimer}</i>
        </p>
      </div>
    </section>
  );
}
