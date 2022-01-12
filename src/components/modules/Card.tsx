import { createRef, forwardRef, MouseEvent } from 'react';

import type { ForwardedRef } from 'react';

import React from 'react';
import clsx from 'clsx';

import Github from '@icon/Github';
import Folder from '@icon/Folder';

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
    const openLink = () => {
      if (!link || !window) return;

      window.open(link, '_blank');
    };

    const handleClick = () => {
      onClick && onClick();
      icons && openLink();
    };

    return (
      <div
        className={clsx(`flex flex-col gap-[18px] p-6 rounded-[4px] font-mono w-96 max-w-sm bg-[${backgroundColor}] cursor-pointer`, className)}
        onClick={handleClick}
        id={htmlId}
        ref={ref}
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
