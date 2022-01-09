import React from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;
  children?: React.ReactNode;

  color?: 'beige' | 'beige-100' | 'beige-200';

  small?: boolean;
  big?: boolean;
  normal?: boolean;
}

// Force import the text colors
const _colors = 'text-beige text-beige-100 text-beige-200';

const Text = ({ className, children, color = 'beige', small = false, big = false, normal = true }: IProps) => {
  return (
    <p className={clsx('font-sans font-normal', small && 'text-sm', big && 'text-lg', normal && 'text-base', `text-${color}`, className)}>
      {children}
    </p>
  );
};

export default Text;
