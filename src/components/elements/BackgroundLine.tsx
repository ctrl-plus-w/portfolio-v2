import React, { memo } from 'react';

interface IProps {
  className?: string;

  width?: string | number;
  height?: string | number;

  id: number;
}

const BackgroundLine = ({ className, width = 'auto', height = 'auto', id }: IProps) => {
  const props = { width, height, className, fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };

  switch (id) {
    case 2:
      return (
        <svg {...props} viewBox='0 0 504 1124'>
          <path
            opacity='0.02'
            d='M503.5 6.99998C351 -29.5 91.472 111 19.0004 293.5C-49.5 466 92.4808 656.118 205 769C360 924.5 503.5 981 503.5 1124'
            stroke='#EEE7D1'
          />
        </svg>
      );

    default:
      return (
        <svg {...props} viewBox='0 0 578 448'>
          <path opacity='0.02' d='M-21.5 447.5C178 441.5 577.8 334.9 577 -5.5' stroke='#EEE7D1' />
        </svg>
      );
  }
};

export default memo(BackgroundLine);
