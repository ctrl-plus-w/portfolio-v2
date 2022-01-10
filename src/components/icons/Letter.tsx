import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

import letterImage from '@public/letter.png';

interface IProps {
  className?: string;

  width?: number;
  height?: number;
}
const Letter = ({ className, width = 24, height = 24 }: IProps) => {
  return (
    <div className={clsx(['letter-icon', className])}>
      <Image src={letterImage} alt='Letter icon' {...{ width, height, className }} />
    </div>
  );
};

export default Letter;
