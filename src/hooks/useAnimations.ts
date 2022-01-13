import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useAnimations = (loaded: boolean, cb: () => void): void => {
  useEffect(() => {
    if (!cb || loaded) return;

    let heroSectionTl = gsap.timeline({ delay: 1, paused: true });

    // ------- UPDATE THE BACKGROUND LINES -------
    heroSectionTl
      .to('.main', {
        opacity: 1,
        duration: 0,
      })
      .fromTo(
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
    heroSectionTl.addLabel('wave1', '>');

    // Update the main heading
    heroSectionTl.fromTo('#heading1', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }).from('#heading1 + .separator', { width: 0 }, 'wave1');

    // Update the hero section headline
    heroSectionTl.fromTo('#healine1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 'wave1');

    // Update the credits
    heroSectionTl.fromTo('#credit', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 'wave1');

    // ------- UPDATE THE LET'S TALK BUTTON -------
    heroSectionTl.addLabel('wave2', '<');

    // Update the "Let's talk button"
    heroSectionTl
      .fromTo('#contactBtn > p', { opacity: 0 }, { opacity: 1 }, 'wave2')
      .fromTo('#contactBtn > .letter-icon', { opacity: 0, x: 16, y: 16, rotation: 45 }, { x: 0, y: 0, opacity: 1, rotation: 0 }, 'wave2')
      .fromTo(
        '#contactBtn > svg > path',
        { strokeDasharray: '250px', strokeDashoffset: '-250px' },
        { strokeDashoffset: '0px', duration: 2 },
        'wave2'
      );

    // ------- UPDATE CARDS -------
    heroSectionTl.addLabel('wave3', '>-25%');

    // Update the arrows
    heroSectionTl.fromTo('#cards > .buttons > button:nth-child(1)', { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, 'wave3');
    heroSectionTl.fromTo('#cards > .buttons > button:nth-child(2)', { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 'wave3');

    // Update the index indicator
    heroSectionTl.fromTo('#cards > p', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 'wave3');

    // Update the cards
    heroSectionTl
      .fromTo('#card1', { opacity: 0, x: -40, y: -40, rotation: -30 }, { opacity: 1, x: 0, y: 0, rotation: -11 }, 'wave3')
      .fromTo('#card2', { opacity: 0, x: 40, y: 40, rotation: 15 }, { opacity: 1, x: 0, y: 0, rotation: 4 }, '<-25%')
      .fromTo('#card3', { opacity: 0, x: -20, y: -20, rotation: -16 }, { opacity: 1, x: 0, y: 0, rotation: -5 }, '<-25%');

    heroSectionTl.play().then(() => cb());

    // ------- ABOUT ME SECTION -------
    let aboutMeSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about-me',
        start: 'bottom bottom',
        toggleActions: 'restart none none reverse',
      },
    });

    aboutMeSectionTl
      .addLabel('start')
      .fromTo('#about-me .title', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 'start')
      .from('#about-me .title + .separator', { width: 0, duration: 1 }, 'start')
      .fromTo('#about-me .body', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 'start');

    // ------- PROJECTS SECTION -------
    let projectsSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#projects',
        start: 'bottom bottom',
        toggleActions: 'restart none none reverse',
      },
    });

    projectsSectionTl
      .addLabel('start')
      .fromTo('#projects .title', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 'start')
      .from('#projects .title + .separator', { width: 0 }, 'start')
      .fromTo('#projects .cards > div', { x: 30, opacity: 0 }, { x: 0, opacity: 1 }, 'start');

    // ------- CONTACT ME SECTION -------
    let contactMeSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact-me',
        start: 'bottom bottom',
        toggleActions: 'restart none none reverse',
      },
    });

    contactMeSectionTl
      .addLabel('start')
      .fromTo('#contact-me .title', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 'start')
      .from('#contact-me .title + .separator', { width: 0 }, 'start')
      .fromTo('#contact-me .form-control', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 'start')
      .fromTo('#contact-me .info', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 'start')
      .fromTo('#contact-me button[type="submit"]', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 'start');

    return () => {
      heroSectionTl.kill();
    };
  }, [cb, loaded]);
};

export default useAnimations;
