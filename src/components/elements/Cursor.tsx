import { createRef, FC, memo, useEffect } from 'react';
import { gsap } from 'gsap';

import clsx from 'clsx';

import { px } from '@util/string.util';
import { lerp } from '@util/animation.utils';

const Cursor: FC = () => {
  const cursor = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!cursor.current) return;

    const { current: cur } = cursor;

    let mouseX: number;
    let mouseY: number;

    let cursorX: number;
    let cursorY: number;

    let type: string;

    let animationFrame: number;

    const render = () => {
      cursorX = lerp(cursorX, mouseX, 0.1);
      cursorY = lerp(cursorY, mouseY, 0.1);

      // Update he cursor coords
      cur.style.left = px(cursorX);
      cur.style.top = px(cursorY);

      // Make the cursor visible when the cursor enters the window
      if (mouseX && mouseY && cur.style.visibility !== 'visible') {
        cur.style.visibility = 'visible';
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const target = event.target;

      if (target instanceof HTMLElement) {
        // Fetch the cursor type of the event target
        const newType = window.getComputedStyle(target).cursor;

        // If the previous cursor wasn't a pointer, and the new cursor is a pointer,
        // then we want to make the cursor smaller
        if (type !== 'pointer' && newType === 'pointer') {
          gsap.to(cur, { scale: '0.5' });
        }

        // If the previous cursor was a pointer, and the new cursor isn't a pointer,
        // then we want to make the cursor larger
        if (type === 'pointer' && newType !== 'pointer') {
          gsap.to(cur, { scale: 1 });
        }

        // Update the type
        type = newType;
      }

      // If the cursor coords aren't defined, set them to the mouse pos
      if (!cursorX || !cursorY) {
        cursorX = mouseX;
        cursorY = mouseY;
      }
    };

    animationFrame = window.requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      animationFrame && window.cancelAnimationFrame(animationFrame);

      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursor]);

  return (
    <div
      className={clsx([
        'z-50 fixed w-16 h-16 invisible pointer-events-none',
        'transform -translate-x-1/2 -translate-y-1/2 origin-center',
        'transition-scale duration-300',
        'border border-gray-600 rounded-full',
      ])}
      ref={cursor}
    ></div>
  );
};

export default memo(Cursor);
