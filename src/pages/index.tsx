import Head from 'next/head';

import type { NextPage } from 'next';

import BackgroundLine from '@element/BackgroundLine';
import TalkButton from '@element/TalkButton';
import Title from '@element/Title';
import Text from '@element/Text';

import Sparkles from '@icon/Sparkles';

const Home: NextPage = () => {
  return (
    <div className='relative'>
      {/* ---------- PAGE SETTINGS --------- */}
      <Head>
        <title>Lukas Laudrain</title>
      </Head>

      {/* ---------- LINES ----------------- */}
      <BackgroundLine width='50%' id={1} className='absolute top-0 left-0' />
      <BackgroundLine width='40%' id={2} className='absolute top-[20vh] right-0' />

      {/* ---------- HERO SECTION ---------- */}
      <section id='hero-section' className='flex flex-col h-screen px-32 py-16'>
        <div className='flex flex-col mt-32 h-full'>
          <Title sep>Lukas Laudrain</Title>
          <Text big>
            I am the french <b>full-stack developer</b>,<br /> that will help you <Sparkles />
            <b>step up</b>
            <Sparkles /> your business
          </Text>

          <TalkButton className='mt-12' onClick={() => alert()} />

          <Text className='mt-auto'>© 2022 Lukas Laudrain</Text>
        </div>
      </section>

      <section id='about-me' className='flex flex-col'></section>

      <section id='projects' className='flex flex-col'></section>

      <section id='contact-me' className='flex flex-col'></section>
    </div>
  );
};

export default Home;
