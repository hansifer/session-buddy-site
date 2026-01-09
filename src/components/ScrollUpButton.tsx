import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

import { ArrowIcon } from '@/assets/icons/ArrowIcon';

export const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = throttle(
      () => {
        setIsVisible(document.documentElement.scrollTop > 300);
      },
      500,
      {
        leading: false,
        trailing: true,
      },
    );

    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return isVisible ? (
    <button
      className="
        flex
        justify-center
        items-center
        w-12
        h-12
        fixed
        bottom-6
        right-6
        rounded-xl
        block-strong-border
        bg-primaryBackgroundColor
        hover:bg-blockBackgroundColor
        z-50
        cursor-pointer
      "
      aria-label="Scroll to top"
      onClick={() => scrollToTop()}
    >
      <ArrowIcon className="text-secondaryTextColor" />
    </button>
  ) : null;
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
