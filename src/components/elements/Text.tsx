import React from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;
  children?: React.ReactNode;

  color?: BEIGE;

  type?: 'mono' | 'sans' | 'sans-serif';

  small?: boolean;
  big?: boolean;
  normal?: boolean;
}

// Force import the text colors
const _colors = 'text-beige text-beige-100 text-beige-200';

const Text = ({ className, children, type = 'sans', color = 'beige', small = false, big = false, normal = true }: IProps) => {
  return (
    <p className={clsx(`font-${type} font-normal text-${color}`, small && 'text-sm', big && 'text-lg', normal && 'text-base', className)}>
      {children}
    </p>
  );
};

export default Text;
