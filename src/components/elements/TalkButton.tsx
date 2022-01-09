import React, { MouseEvent } from 'react';

import clsx from 'clsx';

import Letter from '@icon/Letter';

interface IProps {
  className?: string;

  onClick: (event: MouseEvent) => void | Promise<void>;
}

const TalkButton = ({ className, onClick }: IProps) => {
  return (
    <button className={clsx('relative flex items-center justify-center w-[130px] cursor-pointer', className)} onClick={onClick}>
      <svg width='auto' height='100%' viewBox='0 0 90 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M88.3367 22.1848C91.9197 4.1803 77.7355 -3.8079 47.1733 4.07864C29.7091 8.58524 -2.42479 16.5913 0.982126 34.9595C3.74186 49.8385 39.5065 54.5 61.5065 40'
          stroke='#E4DCBF'
        />
      </svg>

      <p className='absolute-center pt-2 w-full text-center -rotate-[8deg] font-handwritten text-base text-beige'>Let&apos;s talk !</p>

      <Letter className='absolute right-0 -bottom-1.5 transform rotate-[7deg]' height={28} width={28} />
    </button>
  );
};

export default TalkButton;
