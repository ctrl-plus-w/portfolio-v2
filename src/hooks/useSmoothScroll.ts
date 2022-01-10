import { useEffect } from 'react';

import type { RefObject } from 'react';

import { lerp } from '@util/animation.utils';
import { px } from '@util/string.util';

const useSmoothScroll = (container: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!container.current) return;

    // Make the body the same height as the container to have the scroll bar
    document.body.style.height = px(container.current.clientHeight);

    let animationFrame: number;
    let scrollY: number;

    // Main render function
    const render = () => {
      // Update the value with linear interpolation
      scrollY = lerp(scrollY || window.scrollY, window.scrollY, 0.1);

      if (container.current) {
        container.current.style.top = px(-scrollY);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [container]);
};

export default useSmoothScroll;