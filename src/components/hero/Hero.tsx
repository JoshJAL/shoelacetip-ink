import Image from 'next/image';

const transparentSiteImage = '/images/siteImageTransparent.png';

export default function Hero() {
  return (
    <section className='flex flex-col items-center justify-center w-full'>
      <div className='w-2/3'>
        <Image src={transparentSiteImage} alt='Site Image' width={825} height={725} />
      </div>

      <p className='text-xl font-semibold text-center'>
        Professional Tattoo artist extraordinaire. Tattooing since 2020. I have a background in{' '}
        {'***add background information here***'}. I love what I do and encourage you to reach out to me for you next
        tattoo!
      </p>
      <div className='flex w-full flex-start'>
        <ul className='flex flex-col gap-2'>
          <li className='text-lg font-bold underline underline-offset-2'>Rates:</li>
          <li className='ml-5'>
            <span className='font-semibold underline underline-offset-2'>Small</span>: $100
          </li>
          <li className='ml-5'>
            <span className='font-semibold underline underline-offset-2'>Medium</span>: $150
          </li>
          <li className='ml-5'>
            <span className='font-semibold underline underline-offset-2'>Large</span>: $200
          </li>
        </ul>
      </div>
    </section>
  );
}
