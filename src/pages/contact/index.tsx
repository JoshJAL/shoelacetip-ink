import Blurb from '@/components/blurb/Blurb';
import Body from '@/components/Body';
import ContactForm from '@/components/contactForm/ContactForm';
import Content from '@/components/Content';
import DefaultHead from '@/components/DefaultHead';
import Header from '@/components/header/Header';
import Main from '@/components/Main';

export default function Contact() {
  return (
    <>
      <DefaultHead />
      <Body>
        <Header />
        <Main>
          <Content additionalClasses='flex flex-col w-full items-center'>
            <Blurb additionalClasses='max-w-2xl'>
              <p>
                Send me an email with some details about what you would like and we can get an appointment booked as
                soon as possible!
              </p>
            </Blurb>
            <ContactForm />
          </Content>
        </Main>
      </Body>
    </>
  );
}
