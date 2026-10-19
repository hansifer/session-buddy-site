import type { JSX } from 'react';
import { motion } from 'framer-motion';

import { Stars } from '@/components/Stars';
import { Users } from '@/components/Users';

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
          text-lg
          md:text-xl
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-3
            "
          >
            {/* <Stars rating={rating} /> */}
            <Users />
            <div
              className="
                text-center
                whitespace-pre
              "
              // style is temporary until we bring back stars
              style={{
                lineHeight: 1.8,
                padding: '0 20px',
                maxWidth: '480px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {text}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
