import React from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;

  width?: string | number;
  height?: string | number;
}

const Check = ({ className, width, height }: IProps) => {
  return (
    <svg {...{ width, height, className: clsx(['check-icon', className]) }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
      <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M416 128L192 384l-96-96' />
    </svg>
  );
};

export default Check;
