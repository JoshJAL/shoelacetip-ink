import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Main from '@/components/Main';

import ohNo from '../../public/images/oh-no.gif';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <div className='relative flex items-center justify-center mb-6 lg:h-[500px] h-80'>
            <div className='absolute w-full h-full overflow-hidden'>
              <Image
                src={ohNo}
                className='absolute object-cover h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 left-1/2 lg:top-[60%] top-1/2 opacity-60'
                alt='Oh no!'
              />
            </div>
          </div>
          <Content>
            <section className='flex flex-col items-center justify-center gap-4 text-center'>
              <h1 className='text-3xl font-bold'>Oops!</h1>
              <p className='text-xl font-semibold'>Looks like you went to the wrong place!</p>
              <p className='text-xl font-semibold'>Don&#39;t worry, I&#39;ve got you covered.</p>
              <Link className='text-xl font-semibold ' href='/'>
                Take me home!
              </Link>
            </section>
          </Content>
        </Main>
      </Body>
    </>
  );
}
