import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import UpdatePagesHeader from '@/components/header/UpdatePagesHeader';
import Main from '@/components/Main';
import UpdateArtistForm from '@/components/updateArtistForm/UpdateArtistForm';
import { getArtistPageData } from '@/functions/artistPage';
import { Artist } from '@/types/artist';
import { useState, useEffect } from 'react';

export default function Tattoos() {
  const [currentArtistPageInfo, setCurrentArtistPageInfo] = useState<Artist[]>([]);

  useEffect(() => {
    try {
      getArtistPageData(setCurrentArtistPageInfo);
    } catch (error) {
      console.error(error);
    }
  }, [setCurrentArtistPageInfo]);

  return (
    <>
      <DefaultHead />
      <Body>
        <UpdatePagesHeader />
        <Main>
          <Content>
            {currentArtistPageInfo.map((currentArtist) => (
              <UpdateArtistForm currentArtistPageInfo={currentArtist} key={currentArtist.id} />
            ))}
          </Content>
        </Main>
      </Body>
    </>
  );
}
