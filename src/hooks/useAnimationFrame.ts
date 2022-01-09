import { useEffect } from 'react';

const useAnimationFrame = (cb: () => void | Promise<void>) => {
  useEffect(() => {
    let animationFrame: number;

    const render = (): void => {
      cb();

      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [cb]);
};

export default useAnimationFrame;
