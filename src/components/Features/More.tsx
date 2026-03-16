import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const More = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="more"
      className="
        absolute
        -mt-20
        lg:-mt-32
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
      <Feature
        heading="More good stuff"
        description="Here are just a few more details designed to make your browsing smoother:"
        bullets={[
          'Bookmark any collection for quick access.',
          'Quickly replace old collection contents with the current session.',
          'Keep track of open tabs with a live counter on the toolbar icon.',
          "Navigate previously-selected collections naturally using the browser's back button.",
          'Enjoy a polished look with smart fallbacks for broken or outdated site icons.',
          // 'Use powerful organizational features like cloning, merging, and splitting to manage collections and folders.',
          // 'list the current window first',
        ]}
        images={[
          {
            src: feature5.src,
            alt: 'Feature image 5',
          },
          {
            src: feature6.src,
            alt: 'Feature image 6',
          },
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
