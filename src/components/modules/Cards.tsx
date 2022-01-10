import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import React from 'react';

import Card from '@module/Card';

import Text from '@element/Text';

import ArrowLeft from '@icon/ArrowLeft';
import ArrowRight from '@icon/ArrowRight';

import { CARDS } from '@constant/CARDS';

type CardIndexes = 1 | 2 | 3;

interface IProps {
  loaded: boolean;
}

const Cards = ({ loaded }: IProps) => {
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);

  const timeline = useRef<gsap.core.Timeline>();

  const [activeCard, setActiveCard] = useState<CardIndexes>(1);

  useEffect(() => {
    if (!card1.current || !card2.current || !card3.current) return;

    // List of styles to override
    const styleOverrides: { [index: string]: string }[] = [
      {
        left: 'calc(50% - 6rem)',
        top: 'calc(50% + 6rem)',
        transform: 'translate(-50%, -50%) rotate(-11deg)',
      },
      {
        left: 'calc(50% + 6rem)',
        top: '50%',
        transform: 'translate(-50%, -50%) rotate(4deg)',
      },
      {
        left: 'calc(50% - 2.5rem)',
        top: 'calc(50% - 4.5rem)',
        transform: 'translate(-50%, -50%) rotate(-5deg)',
      },
    ];

    // Cards to override the style from (! MATCH THE INDEXES)
    const cards: HTMLDivElement[] = [card1.current, card2.current, card3.current];

    // Dynamically update the styles
    for (let i = 0; i < styleOverrides.length; i++) {
      const cardOverrideStyles = styleOverrides[i];

      for (const styleName of Object.keys(cardOverrideStyles)) cards[i].style.setProperty(styleName, cardOverrideStyles[styleName]);
    }

    // Create the timeline

    timeline.current = gsap.timeline({ paused: true });

    // The card styles to apply during the animation
    // [translateX, translateY, rotation, duration]
    const cardStyles: [string, string, number, number][] = [
      ['-8rem', '5rem', -32, 0.3],
      ['5rem', '2rem', 16, 0.3],
      ['-5rem', '-9rem', -20, 0.3],
    ];

    // Apply the animations on the cards
    for (const i in cards) {
      timeline.current.to(
        cards[i],
        { translateX: cardStyles[i][0], translateY: cardStyles[i][1], rotation: cardStyles[i][2], duration: cardStyles[i][3] },
        'start'
      );
    }
  }, [card1, card2, card3]);

  const getNextCard = (previousCard: CardIndexes): CardIndexes => {
    if (previousCard === 3) return 1;
    return (previousCard + 1) as CardIndexes;
  };

  const getPreviousCard = (previousCard: CardIndexes): CardIndexes => {
    if (previousCard === 1) return 3;
    return (previousCard - 1) as CardIndexes;
  };

  const updateCard = async (cardIndex: CardIndexes) => {
    if (!card1.current || !card2.current || !card3.current || !loaded) return;

    // Check if the timeline exists
    if (!timeline.current) return;

    // Check if the timeline isn't playing
    if (timeline.current.isActive()) return;

    // Start the timeline, update the zIndexes and reverse the timeline
    await timeline.current.play();

    const cards = [card1.current, card2.current, card3.current];

    const activeCard = cards[cardIndex - 1];
    const disabledCards = cards.filter((card) => card !== activeCard);

    activeCard.style.zIndex = '11';

    for (const disabledCard of disabledCards) {
      disabledCard.style.zIndex = '10';
    }

    await timeline.current.reverse();

    setActiveCard(cardIndex);
  };

  return (
    <div className='relative flex flex-col w-full items-center justify-center gap-5 outline-1' id='cards'>
      <div className='buttons absolute-center flex gap-[40rem]'>
        <button className='p-6' onClick={() => updateCard(getPreviousCard(activeCard))}>
          <ArrowLeft height={24} />
        </button>

        <button className='p-6' onClick={() => updateCard(getNextCard(activeCard))}>
          <ArrowRight height={24} />
        </button>
      </div>

      <Card {...CARDS[2]} className='absolute-center z-10' ref={card3} onClick={() => updateCard(3)} />
      <Card {...CARDS[1]} className='absolute-center z-10' ref={card2} onClick={() => updateCard(2)} />
      <Card {...CARDS[0]} className='absolute-center z-10' ref={card1} onClick={() => updateCard(1)} />

      <Text className='absolute left-1/2 bottom-24' color='beige'>
        {activeCard} / 3
      </Text>
    </div>
  );
};

export default Cards;
