import { FormEvent, useState } from 'react';

import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

import TalkButton from '@element/TalkButton';
import Input from '@element/Input';
import Text from '@element/Text';

interface IProps {
  className?: string;
}

const ContactForm = ({ className }: IProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    return;
  };

  return (
    <div className='flex flex-row gap-32'>
      <form onSubmit={handleSubmit} className={clsx(['flex flex-col gap-8', className])}>
        <div className='flex flex-row gap-16'>
          <Input
            value={firstName}
            setValue={setFirstName}
            name='firstName'
            placeholder="What's your name ?"
            label='First Name'
            className='w-64'
            required
          />

          <Input
            value={lastName}
            setValue={setLastName}
            name='lastName'
            placeholder="What's your surname ?"
            label='Last Name'
            className='w-64'
            required
          />
        </div>

        <Input value={email} setValue={setEmail} name='email' placeholder='How I can contact you ?' label='Email' className='w-64' required />

        <Input
          value={message}
          setValue={setMessage}
          name='message'
          placeholder='What do you want to say ?'
          label='Message'
          className='w-[36rem]'
          textarea
          required
        />

        <TalkButton htmlType='submit' onClick={() => undefined} />
      </form>

      <div className='flex flex-col gap-8 w-full h-full'>
        <div>
          <Text className='font-semibold' big>
            EMAIL
          </Text>
          <Text>lukas.ldrn@gmail.com</Text>
        </div>

        <div>
          <Text className='font-semibold' big>
            PHONE
          </Text>
          <Text>(+33) 7 66 32 44 38</Text>
        </div>

        <div>
          <Text className='font-semibold' big>
            GITHUB
          </Text>
          <Link href='https://github.com/ctrl-plus-w' passHref>
            <a target='_blank' href='replace'>
              <Text>https://github.com/ctrl-plus-w</Text>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
