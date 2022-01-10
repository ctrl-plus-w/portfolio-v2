import type { NextPage } from 'next';

import { useEffect, useRef, useState } from 'react';

import Head from 'next/head';

import Cards from '@module/Cards';
import Card from '@module/Card';

import BackgroundLine from '@element/BackgroundLine';
import TalkButton from '@element/TalkButton';
import Title from '@element/Title';
import Text from '@element/Text';

import Sparkles from '@icon/Sparkles';

import useSmoothScroll from '@hook/useSmoothScroll';
import useAnimations from '@hook/useAnimations';

import { CARDS } from '@constant/CARDS';

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => window.scrollTo({ top: 0 }));

  useSmoothScroll(container);

  useAnimations(loaded, () => setLoaded(true));

  return (
    <div className='fixed' ref={container}>
      {/* ---------- PAGE SETTINGS --------- */}
      <Head>
        <title>Lukas Laudrain</title>
      </Head>

      {/* ---------- LINES ----------------- */}
      <BackgroundLine width='50%' id={1} className='absolute top-0 left-0' htmlId='line1' />
      <BackgroundLine width='40%' id={2} className='absolute top-[20vh] right-0' htmlId='line2' />

      {/* ---------- HERO SECTION ---------- */}
      <section id='hero-section' className='flex flex-row h-screen px-32 py-16'>
        <div className='flex flex-col mt-32'>
          <Title htmlId='heading1' sep>
            Lukas Laudrain
          </Title>

          <Text htmlId='healine1' big>
            I am the french <b>full-stack developer</b>,<br /> that will help you <Sparkles />
            <b>step up</b>
            <Sparkles /> your business
          </Text>

          <TalkButton htmlId='contactBtn' className='mt-12' onClick={() => alert()} />

          <Text htmlId='credit' className='mt-auto'>
            © 2022 Lukas Laudrain
          </Text>
        </div>

        <Cards loaded={loaded} />
      </section>

      <section id='about-me' className='flex flex-row px-32 py-32 gap-4'>
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

      <section id='projects' className='flex flex-col px-32 py-32'>
        <Title sep>Selected projects</Title>

        <div className='flex flex-row gap-16'>
          {CARDS.map(({ title, body, link }) => {
            return <Card {...{ title, body, link }} key={title} icons />;
          })}
        </div>
      </section>

      <section id='contact-me' className='flex flex-col px-32 pt-16 pb-32'>
        <Title sep>Contact me</Title>

        <Text big>
          <span className='opacity-50'>My name is, </span>
          Lukas Laudrain<span className='opacity-50'>, you can call me at</span> +33 7 66 32 44 38{' '}
          <span className='opacity-50'>or send an email to</span> lukas.ldrn@gmail.com .<br />
          <span className='opacity-50'> You can also check my github :</span>
          https://github.com/ctrl-plus-w <span className='opacity-50'>.</span>
        </Text>
      </section>
    </div>
  );
};

export default Home;
