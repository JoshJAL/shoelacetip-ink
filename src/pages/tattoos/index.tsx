import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Main from '@/components/Main';

export default function Tattoos() {
  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            <p>Tattoos showcase</p>
          </Content>
        </Main>
      </Body>
    </>
  );
}
