import React from 'react';

interface IProps {
  className?: string;

  width?: string | number;
  height?: string | number;
}

const ArrowRight = ({ className, width = 'auto', height = 'auto' }: IProps) => {
  return (
    <svg {...{ width, height, className }} viewBox='0 0 34 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M32 9.5C28.5 9.5 22 10.2 22 17' stroke='#FCF6E2' />
      <path d='M32 9.44531C28.6272 9.44531 22 8.74531 22 1.94531' stroke='#FCF6E2' />
      <path d='M32 9.5L2 9.5' stroke='#FCF6E2' />
    </svg>
  );
};

export default ArrowRight;
