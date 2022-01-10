import type { NextPage } from 'next';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import Head from 'next/head';

import Cards from '@module/Cards';
import Card from '@module/Card';

import BackgroundLine from '@element/BackgroundLine';
import TalkButton from '@element/TalkButton';
import Title from '@element/Title';
import Text from '@element/Text';

import Sparkles from '@icon/Sparkles';

import { CARDS } from '@constant/CARDS';

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let tl = gsap.timeline({ delay: 1, paused: true });

    // ------- UPDATE THE BACKGROUND LINES -------
    tl.fromTo(
      '#line1 > path, #line2 > path',
      {
        strokeDasharray: '1000px',
        strokeDashoffset: '1000px',
        opacity: 1,
      },
      {
        strokeDashoffset: '0',
        opacity: 0.02,
        duration: 1.5,
      }
    );

    // ------- UPDATE THE HERO SECTION TEXT -------
    tl.addLabel('wave1', '>');

    // Update the main heading
    tl.fromTo('#heading1', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }).from('#heading1 + .separator', { width: 0 }, 'wave1');

    // Update the hero section headline
    tl.fromTo('#healine1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 'wave1');

    // Update the credits
    tl.fromTo('#credit', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 'wave1');

    // ------- UPDATE THE LET'S TALK BUTTON -------
    tl.addLabel('wave2', '<');

    // Update the "Let's talk button"
    tl.fromTo('#contactBtn > p', { opacity: 0 }, { opacity: 1 }, 'wave2')
      .fromTo('#contactBtn > .letter-icon', { opacity: 0, x: 16, y: 16, rotation: 45 }, { x: 0, y: 0, opacity: 1, rotation: 0 }, 'wave2')
      .fromTo(
        '#contactBtn > svg > path',
        { strokeDasharray: '250px', strokeDashoffset: '-250px' },
        { strokeDashoffset: '0px', duration: 2 },
        'wave2'
      );

    // ------- UPDATE CARDS -------
    tl.addLabel('wave3', '>-25%');

    // Update the arrows
    tl.fromTo('#cards > .buttons > button:nth-child(1)', { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, 'wave3');
    tl.fromTo('#cards > .buttons > button:nth-child(2)', { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 'wave3');

    // Update the index indicator
    tl.fromTo('#cards > p', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 'wave3');

    // Update the cards
    tl.fromTo('#card1', { opacity: 0, x: -40, y: -40, rotation: -30 }, { opacity: 1, x: 0, y: 0, rotation: -11 }, 'wave3')
      .fromTo('#card2', { opacity: 0, x: 40, y: 40, rotation: 15 }, { opacity: 1, x: 0, y: 0, rotation: 4 }, '<-25%')
      .fromTo('#card3', { opacity: 0, x: -20, y: -20, rotation: -16 }, { opacity: 1, x: 0, y: 0, rotation: -5 }, '<-25%');

    tl.play().then(() => {
      console.log('done');
      setLoaded(true);
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className='relative'>
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
