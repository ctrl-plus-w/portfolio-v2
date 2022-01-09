import React, { useCallback } from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;
  children?: React.ReactNode;

  color?: 'beige' | 'beige-100' | 'beige-200';
  level?: 1 | 2;

  sep?: boolean;
}

// Force import the text colors
const _colors = 'text-beige text-beige-100 text-beige-200';

const Title = ({ className, children, sep, color = 'beige', level = 1 }: IProps) => {
  const getElement = useCallback(() => {
    switch (level) {
      case 2:
        return <h2 className={clsx('font-sans font-medium text-base', `text-${color}`, className)}>{children}</h2>;

      default:
        return <h1 className={clsx('font-sans font-bold text-3xl', `text-${color}`, className)}>{children}</h1>;
    }
  }, [color, className, level, children]);

  return (
    <>
      {getElement()}
      {sep && <div className='w-10 h-[2px] mt-7 mb-6 bg-beige'></div>}
    </>
  );
};

export default Title;
