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
        description="Here are just a few more features designed to make your browsing smoother:"
        bullets={[
          'Bookmark collections for quick access.',
          'Swap a collection with the current session.',
          'Track tab strain with a badge on the toolbar icon.',
          "Navigate naturally with the browser's back/forth buttons.",
          'See smart fallbacks for broken and outdated site icons.',
          // 'Use powerful organizational features like cloning, merging, and splitting to manage collections and folders.',
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
