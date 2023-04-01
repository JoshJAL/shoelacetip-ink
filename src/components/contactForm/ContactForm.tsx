import { useState } from 'react';
import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';
import Label from '../formComponents/Label';
import Select from '../formComponents/Select';
import SubmitButton from '../formComponents/SubmitButton';
import TextArea from '../formComponents/TextArea';

function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [service, setService] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(
      `mailto:sltink.booking@gmail.com?subject=Message from ${firstName} ${lastName} ${
        service === 'question' ? 'has' : 'about'
      } ${service === 'artwork' ? 'an ' + service : 'a ' + service}&body=${message}`
    );
    setFirstName('');
    setLastName('');
    setMessage('');
    setService('');
  }

  const options = [
    { value: '', text: 'Select a service' },
    { value: 'question', text: 'Question' },
    { value: 'drawing', text: 'Drawing' },
    { value: 'tattoo', text: 'Tattoo' },
    { value: 'artwork', text: 'Artwork' }
  ];

  return (
    <form className='flex flex-col w-full max-w-2xl' onSubmit={handleSubmit}>
      <Label htmlFor='firstName' text='First Name:' />
      <InputTextEmailPassword
        type='text'
        name='firstName'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Label htmlFor='lastName' text='First Name:' />
      <InputTextEmailPassword
        type='text'
        name='lastName'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Label htmlFor='service' text='Service:' />
      <Select value={service} name='service' onChange={(e) => setService(e.target.value)} options={options} />
      <Label htmlFor='message' text='Message:' />
      <TextArea name='message' onChange={(e) => setMessage(e.target.value)} value={message} />
      <div className='mt-4'>
        <SubmitButton text='Send Email' />
      </div>
    </form>
  );
}

export default ContactForm;
