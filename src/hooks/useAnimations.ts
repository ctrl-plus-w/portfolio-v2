import { useEffect } from 'react';
import { gsap } from 'gsap';

const useAnimations = (loaded: boolean, cb: () => void): void => {
  useEffect(() => {
    if (!cb || loaded) return;

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

    tl.play().then(() => cb());

    return () => {
      tl.kill();
    };
  }, [cb, loaded]);
};

export default useAnimations;
