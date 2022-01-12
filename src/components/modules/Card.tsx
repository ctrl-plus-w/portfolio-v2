import { createRef, forwardRef, useEffect, useRef } from 'react';

import type { ForwardedRef } from 'react';

import React from 'react';
import clsx from 'clsx';

import Github from '@icon/Github';
import Folder from '@icon/Folder';

import { clamp } from '@util/number.utils';
import { lerp } from '@util/animation.utils';

interface IProps {
  className?: string;

  htmlId?: string;

  title: string;
  body: string;

  titleColor?: string;
  bodyColor?: string;
  backgroundColor?: string;

  link?: string;

  icons?: boolean;

  onClick?: () => void | Promise<void>;
}

const _colors1 = 'bg-[#F0E9CE] bg-[#6D633F] text-[#80785D] text-[#6D633F]';
const _colors2 = 'bg-[#DFCFA6] bg-[#4E4730] text-[#4E4730] text-[#635D4B]';
const _colors3 = 'bg-[#B9AF8F] bg-[#3F3927] text-[#3F3927] text-[#3E3929]';

const Card = forwardRef(
  (
    { body, title, backgroundColor = '#F0E9CE', bodyColor = '#80785D', titleColor = '#6D633F', className, onClick, icons, link, htmlId }: IProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const cardRef = useRef<HTMLDivElement>();

    const openLink = () => {
      if (!link || !window) return;

      window.open(link, '_blank');
    };

    /**
     * Handle the card click
     */
    const handleClick = () => {
      onClick && onClick();
      icons && openLink();
    };

    /**
     * Forward the ref and set the instance ref
     * @param node The element node
     */
    const getRef = (node: HTMLDivElement | null) => {
      cardRef.current = node || undefined;

      if (ref instanceof Function) ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (!cardRef || !cardRef.current || !icons) return;

      const cardElement = cardRef.current;

      // Mouse position
      let mouseX: number;
      let mouseY: number;

      // Card offset
      let offsetX: number;
      let offsetY: number;

      // Card size
      let bounds: DOMRect;

      const onMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        const center = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };

        const MAX_OFFSET = 10;

        offsetX = lerp(offsetX, mouseX - center.x, 0.01);
        offsetY = lerp(offsetY, mouseY - center.y, 0.01);

        offsetX = clamp(offsetX, -MAX_OFFSET, MAX_OFFSET);
        offsetY = clamp(offsetY, -MAX_OFFSET, MAX_OFFSET);

        cardElement.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
      };

      const onMouseEnter = () => {
        bounds = cardElement.getBoundingClientRect();
        offsetX = 0;
        offsetY = 0;

        document.addEventListener('mousemove', onMouseMove);
      };

      const onMouseLeave = () => {
        document.removeEventListener('mousemove', onMouseMove);

        cardElement.style.transform = '';
      };

      cardElement.addEventListener('mouseenter', onMouseEnter);
      cardElement.addEventListener('mouseleave', onMouseLeave);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);

        window.removeEventListener('mouseenter', onMouseEnter);
        window.removeEventListener('mouseleave', onMouseLeave);
      };
    }, [cardRef, icons]);

    return (
      <div
        className={clsx(`flex flex-col gap-[18px] p-6 rounded-[4px] font-mono w-96 max-w-sm bg-[${backgroundColor}] cursor-pointer`, className)}
        onClick={handleClick}
        id={htmlId}
        ref={getRef}
      >
        {icons && (
          <div className='flex justify-between w-full'>
            <Folder height={24} />
            <Github height={24} />
          </div>
        )}
        <h2 className={`font-mono font-medium text-base text-[${titleColor}]`}>{title}</h2>
        <div className={`w-10 h-[2px] bg-[${titleColor}]`}></div>
        <p className={`font-mono font-normal text-[${bodyColor}]`}>{body}</p>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
