import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

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
        description="Here are just a few more things designed to make your browsing smoother:"
        bullets={[
          'Bookmark any collection for quick access.',
          'Quickly replace collection contents with the current session.',
          'Keep track of open tabs with a live counter on the toolbar icon.',
          "Navigate collections naturally with the browser's back/forth buttons.",
          'Enjoy a polished look with smart fallbacks for broken and outdated site icons.',
          // 'Use powerful organizational features like cloning, merging, and splitting to manage collections and folders.',
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
