import Blurb from '@/components/blurb/Blurb';
import Body from '@/components/Body';
import Button from '@/components/Button';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import FancyLink from '@/components/fancyLink/FancyLink';
import Header from '@/components/header/Header';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Main from '@/components/Main';
import { getArtistPageData } from '@/functions/artistPage';
import { Artist as ArtistType } from '@/types/artist';
import { useState, useEffect } from 'react';
import { IoLogoInstagram } from 'react-icons/io5';

export default function Artist() {
  const [currentArtistPageInfo, setCurrentArtistPageInfo] = useState<ArtistType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    try {
      getArtistPageData(setCurrentArtistPageInfo);
      setInitialLoad(false);
      console.log(initialLoad);
    } catch (error) {
      console.log(error);
    }

    if (!initialLoad) {
      setTimeout(() => {
        setLoading(false);
      }, 1800);
    }
  }, [initialLoad]);

  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {currentArtistPageInfo.map((currentInfo) => (
                  <div className='flex flex-col items-center justify-center' key={currentInfo.id}>
                    <img
                      className='md:w-[65%] w-full'
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/artist/${currentInfo.headshot}`}
                      alt='Shoelacetip'
                    />
                    <Blurb>
                      <p dangerouslySetInnerHTML={{ __html: currentInfo.bio }} />
                    </Blurb>
                  </div>
                ))}
                <div className='flex justify-evenly'>
                  <div className='flex'>
                    <FancyLink href='https://www.instagram.com/shoelacetip_ink/'>
                      <IoLogoInstagram />
                      <p>Instagram</p>
                    </FancyLink>
                  </div>
                  <div>
                    <Button
                      text='Book Me'
                      additionalClasses='font-semibold px-4 py-3'
                      onClick={() => (window.location.href = '/contact')}
                    />
                  </div>
                </div>
              </>
            )}
          </Content>
        </Main>
      </Body>
    </>
  );
}
