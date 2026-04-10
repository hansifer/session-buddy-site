import type { JSX } from 'react';
import { motion } from 'framer-motion';

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
            text-lg
            font-bold
            text-primaryTextColor
          "
        >
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
      </motion.div>
    </section>
  );
}
