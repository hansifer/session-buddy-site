import type { JSX } from 'react';

import { Stars } from '@/components/Stars';

export function Stats({
  rating,
  text,
}: {
  rating: number;
  text: string;
}): JSX.Element {
  return (
    <section className="mb-8">
      <div
        className="
            relative
            flex
            flex-col
            items-center
            gap-3
            text-lg
            font-bold
            text-primaryTextColor
          "
      >
        <div
          className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              h-30
              w-100
              rounded-[50%]
              bg-blue-500/20 blur-3xl
              pointer-events-none
            "
        />
        <Stars rating={rating} />
        <div
          className="
              text-center
              whitespace-pre
            "
        >
          {text}
        </div>
      </div>
    </section>
  );
}
