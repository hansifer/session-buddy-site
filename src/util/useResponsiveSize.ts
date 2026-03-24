import { useState, useLayoutEffect } from 'react';
import throttle from 'lodash.throttle';

// A hook to get a responsive size (width and height) for an element based on window size

// todo: allow a breakpoints spec to be passed (as an alternative to `translate` function)

export type Size = {
  width: number;
  height: number;
};

export const useResponsiveSize = ({
  translate = (windowSize) => windowSize ?? { width: 0, height: 0 },
  throttleDelay = 150,
}: {
  translate?: (windowSize?: Size) => Size;
  throttleDelay?: number;
}) => {
  const [size, setSize] = useState<Size>(translate); // call `translate()` with no args to get default size

  useLayoutEffect(() => {
    const handleResize = throttle(
      () => {
        setSize((currentSize) => {
          const { width, height } = translate({
            width: window.innerWidth,
            height: window.innerHeight,
          });

          // only update if size has changed
          return currentSize.width !== width || currentSize.height !== height
            ? {
                width,
                height,
              }
            : currentSize;
        });
      },
      throttleDelay,
      {
        leading: true,
        trailing: true,
      },
    );

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [throttleDelay, translate]);

  return size;
};
