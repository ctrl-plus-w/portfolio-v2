import { createRef, useState } from 'react';
import { gsap } from 'gsap';

import type { FormEvent } from 'react';

import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

import TalkButton from '@element/TalkButton';
import Input from '@element/Input';
import Text from '@element/Text';

import Check from '@icon/Check';

interface IProps {
  className?: string;
}

const ContactForm = ({ className }: IProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validationScreen = createRef<HTMLDivElement>();
  const container = createRef<HTMLDivElement>();

  const setValidationScreen = () => {
    if (!container.current || !validationScreen.current) return;

    const inputs = container.current.querySelectorAll('.form-control');
    const submitButton = container.current.querySelector('button[type="submit"]');
    const check = container.current.querySelector('.check-icon');

    let tl = gsap.timeline({ paused: true });

    tl.addLabel('start')
      .to(inputs, { opacity: 0.1 }, 'start')
      .to(submitButton, { opacity: 0.1 }, 'start')
      .to(validationScreen.current, { pointerEvents: 'auto', duration: 0 })
      .fromTo(check, { rotation: -180, y: 15, opacity: 0 }, { opacity: 1, rotation: 0, y: 0 });

    tl.play();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const name = `${firstName} ${lastName}`;
    const data = { name, email, message };

    // Check if all the fields aren't empty
    if (!Object.values(data).every((value) => value.trim() !== '')) return;

    const headers = {
      'Content-Type': 'application/json',
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      setValidationScreen();
    }
  };

  return (
    <div ref={container} className={clsx(['relative flex flex-row gap-32', className])}>
      <form onSubmit={handleSubmit} className='relative flex flex-col gap-8'>
        <div ref={validationScreen} className='z-40 absolute w-full h-full grid place-items-center pointer-events-none'>
          <Check width={38} className='text-beige opacity-0' />
        </div>

        <div className={clsx(['flex flex-row gap-16'])}>
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
