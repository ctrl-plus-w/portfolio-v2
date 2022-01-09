import { createRef, FC, memo, useEffect } from 'react';

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

    const updateMousePos = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      // If the cursor coords aren't defined, set them to the mouse pos
      if (!cursorX || !cursorY) {
        cursorX = mouseX;
        cursorY = mouseY;
      }
    };

    animationFrame = window.requestAnimationFrame(render);

    window.addEventListener('mousemove', updateMousePos);

    return () => {
      animationFrame && window.cancelAnimationFrame(animationFrame);

      window.removeEventListener('mousemove', updateMousePos);
    };
  }, [cursor]);

  return (
    <div
      className='fixed z-50 w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 border border-gray-600 rounded-full invisible'
      ref={cursor}
    ></div>
  );
};

export default memo(Cursor);
