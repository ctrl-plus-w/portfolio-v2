import React from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;

  width?: string | number;
  height?: string | number;
}

const ArrowLeft = ({ className, width = 'auto', height = 'auto' }: IProps) => {
  return (
    <svg {...{ width, height, className: clsx(['left-arrow-icon', className]) }} viewBox='0 0 34 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M2 9.5C5.5 9.5 12 8.8 12 2' stroke='#FCF6E2' />
      <path d='M2 9.55469C5.37279 9.55469 12 10.2547 12 17.0547' stroke='#FCF6E2' />
      <path d='M2 9.5H32' stroke='#FCF6E2' />
    </svg>
  );
};

export default ArrowLeft;
