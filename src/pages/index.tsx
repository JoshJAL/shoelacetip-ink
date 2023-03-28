import Body from '@/components/Body';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import Main from '@/components/Main';
import Testimonials from '@/components/testimonials/Testimonials';

export default function Home() {
  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content>
            <Hero />
            <Testimonials />
          </Content>
        </Main>
      </Body>
    </>
  );
}
