import Blurb from '@/components/blurb/Blurb';
import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Main from '@/components/Main';

export default function Artist() {
  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            <Blurb>
              <p>Art showcase</p>
            </Blurb>
          </Content>
        </Main>
      </Body>
    </>
  );
}
