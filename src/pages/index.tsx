import type { NextPage } from 'next';

import { createRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

import Head from 'next/head';

import BackgroundLine from '@element/BackgroundLine';
import TalkButton from '@element/TalkButton';
import Title from '@element/Title';
import Text from '@element/Text';

import Sparkles from '@icon/Sparkles';

import Cards from '@module/Cards';

const Home: NextPage = () => {
  const waitingScreen = createRef<HTMLDivElement>();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || !waitingScreen.current) return;

    let tl = gsap.timeline();

    tl.to(waitingScreen.current, {
      opacity: '0',
      duration: 0.3,
    }).to(waitingScreen.current, {
      pointerEvents: 'none',
      duration: 0,
    });

    tl.play();

    return () => {
      tl.kill();
    };
  }, [loaded, waitingScreen]);

  return (
    <div className='relative'>
      {/* ---------- PAGE SETTINGS --------- */}
      <Head>
        <title>Lukas Laudrain</title>
      </Head>

      {/* ---------- WAITING SCREEN -------- */}
      <div className='fixed z-40 w-screen h-screen bg-dark-blue' ref={waitingScreen}></div>

      {/* ---------- LINES ----------------- */}
      <BackgroundLine width='50%' id={1} className='absolute top-0 left-0' />
      <BackgroundLine width='40%' id={2} className='absolute top-[20vh] right-0' />

      {/* ---------- HERO SECTION ---------- */}
      <section id='hero-section' className='flex flex-row h-screen px-32 py-16'>
        <div className='flex flex-col mt-32'>
          <Title sep>Lukas Laudrain</Title>
          <Text big>
            I am the french <b>full-stack developer</b>,<br /> that will help you <Sparkles />
            <b>step up</b>
            <Sparkles /> your business
          </Text>

          <TalkButton className='mt-12' onClick={() => alert()} />

          <Text className='mt-auto'>© 2022 Lukas Laudrain</Text>
        </div>

        <Cards loaded={loaded} setLoaded={setLoaded} />
      </section>

      <section id='about-me' className='flex flex-row px-32 py-16 gap-4'>
        <div className='flex flex-col w-[calc(4/7*100%)]'>
          <Title sep>Who am I ?</Title>

          <Text className='tracking-wide'>
            Hey, my name is Lukas. I’m a French student.
            <br />
            <br />
            I’m a developer, designer and a challenge lover. I started programming around 2018. I am currently in high school where I have made most
            of my biggest project, so that makes me a self-taught developer. I always loved computer sciences and challenge solving. During my
            learning path, I went from static html and css pages to complex SaaS applications. I now know many technologies and am learning many
            others.
            <br />
            <br />
            By making complex projects, I acquired some experience and I now focus on making clean code with a scalable structure.
          </Text>
        </div>

        <div className='flex flex-col w-[calc(3/7*100%)]'>
          <Title sep>My stack</Title>

          <Text className='tracking-wide'>
            My main front stack is Nextjs, TailwindCSS with Axios. On another hand, my back-end stack is Express or GraphQL combined with a SQL
            database managed by Sequelize.
            <br />
            <br />
            My main language is Typescript but I used a lot Javascript before. I obviously master HTML and CSS.
            <br />
            <br />
            The list of technologies listed before is non-exhaustive, also, I the technologies used are not important to me since I know the
            languages.
          </Text>
        </div>
      </section>

      <section id='projects' className='flex flex-col'></section>

      <section id='contact-me' className='flex flex-col'></section>
    </div>
  );
};

export default Home;
