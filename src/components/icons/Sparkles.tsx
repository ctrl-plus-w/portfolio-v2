import React from 'react';

import Image from 'next/image';

import sparklesImage from '@public/sparkles.png';

interface IProps {
  className?: string;

  width?: number;
  height?: number;

  span?: boolean;
}

const Sparkles = ({ className, span = true, width = 24, height = 24 }: IProps) => {
  const getElement = () => {
    return <Image src={sparklesImage} alt='Sparkle icon' {...{ width, height, className }} />;
  };

  return span ? <span className={className}>{getElement()}</span> : <div className={className}>{getElement()}</div>;
};

export default Sparkles;
