import React, { ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;

  title: string;
  body: string;

  titleColor?: string;
  bodyColor?: string;
  backgroundColor?: string;

  link?: string;

  onClick?: () => void | Promise<void>;
}
const _colors1 = 'bg-[#F0E9CE] bg-[#6D633F] text-[#80785D] text-[#6D633F]';
const _colors2 = 'bg-[#DFCFA6] bg-[#4E4730] text-[#4E4730] text-[#635D4B]';
const _colors3 = 'bg-[#B9AF8F] bg-[#3F3927] text-[#3F3927] text-[#3E3929]';

const Card = forwardRef(
  (
    { body, title, backgroundColor = '#EEE7D1', bodyColor = '#80785D', titleColor = '#6D633F', className, onClick }: IProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={clsx(`flex flex-col gap-[18px] p-6 rounded-[4px] font-mono w-96 max-w-sm bg-[${backgroundColor}] cursor-pointer`, className)}
        onClick={onClick}
        ref={ref}
      >
        <h2 className={`font-mono font-medium text-base text-[${titleColor}]`}>{title}</h2>
        <div className={`w-10 h-[2px] bg-[${titleColor}]`}></div>
        <p className={`font-mono font-normal text-[${bodyColor}]`}>{body}</p>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
