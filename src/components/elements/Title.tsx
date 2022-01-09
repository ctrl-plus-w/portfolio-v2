import React, { useCallback } from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;
  children?: React.ReactNode;

  color?: BEIGE;
  level?: 1 | 2;

  type?: 'mono' | 'sans' | 'sans-serif';

  sep?: boolean;
}

const Title = ({ className, children, sep, type = 'sans', color = 'beige', level = 1 }: IProps) => {
  const getElement = useCallback(() => {
    switch (level) {
      case 2:
        return <h2 className={clsx(`font-${type} font-medium text-base text-${color}`, className)}>{children}</h2>;

      default:
        return <h1 className={clsx(`font-${type} font-bold text-3xl text-${color}`, className)}>{children}</h1>;
    }
  }, [color, className, level, children, type]);

  return (
    <>
      {getElement()}
      {sep && <div className='w-10 h-[2px] mt-7 mb-6 bg-beige'></div>}
    </>
  );
};

export default Title;
