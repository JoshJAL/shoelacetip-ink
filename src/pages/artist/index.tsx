import Blurb from '@/components/blurb/Blurb';
import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Main from '@/components/Main';
import { getArtistPageData } from '@/functions/artistPage';
import { Artist as ArtistType } from '@/types/artist';
import { useState, useEffect } from 'react';

export default function Artist() {
  const [currentArtistPageInfo, setCurrentArtistPageInfo] = useState<ArtistType[]>([]);

  useEffect(() => {
    try {
      getArtistPageData(setCurrentArtistPageInfo);
    } catch (error) {
      console.log(error);
    }
  }, [setCurrentArtistPageInfo]);

  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            {currentArtistPageInfo.map((currentInfo) => (
              <Blurb>
                <p dangerouslySetInnerHTML={{ __html: currentInfo.bio }} />
              </Blurb>
            ))}
          </Content>
        </Main>
      </Body>
    </>
  );
}
