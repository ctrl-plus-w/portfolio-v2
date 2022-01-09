import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import type { Dispatch, SetStateAction } from 'react';

import React from 'react';

import Card from '@module/Card';

import { CARDS } from '@constant/CARDS';

interface IProps {
  loaded: boolean;
  setLoaded: Dispatch<SetStateAction<boolean>>;
}

const Cards = ({ setLoaded }: IProps) => {
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);

  const timeline = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!card1.current || !card2.current || !card3.current) return;

    // List of styles to override
    const styleOverrides: { [index: string]: string }[] = [
      {
        left: 'calc(50% - 3rem)',
        top: 'calc(50% + 5rem)',
        transform: 'translate(-50%, -50%) rotate(-11deg)',
      },
      {
        left: 'calc(50% + 8rem)',
        top: '50%',
        transform: 'translate(-50%, -50%) rotate(4deg)',
      },
      {
        left: '50%',
        top: 'calc(50% - 4rem)',
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

    setLoaded(true);
  }, [card1, card2, card3, setLoaded]);

  const updateCard = async (cardIndex: 1 | 2 | 3) => {
    if (!card1.current || !card2.current || !card3.current) return;

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
  };

  return (
    <div className='relative flex flex-col w-full items-center justify-center gap-5'>
      <Card {...CARDS[2]} className='absolute-center z-10' ref={card3} onClick={() => updateCard(3)} />
      <Card {...CARDS[1]} className='absolute-center z-10' ref={card2} onClick={() => updateCard(2)} />
      <Card {...CARDS[0]} className='absolute-center z-10' ref={card1} onClick={() => updateCard(1)} />
    </div>
  );
};

export default Cards;
