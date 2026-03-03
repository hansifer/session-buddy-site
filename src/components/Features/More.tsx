import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const More = ({ reverse }: { reverse?: boolean }) => (
  <section className="w-full">
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
        heading="And more..."
        description="Here are just a few more highlights:"
        bullets={[
          'Add bookmarks to collections from any text. Session Buddy automatically detects the format and extracts links.',
          'Use powerful organizational features like cloning, merging, and splitting to manage collections and folders.',
          "Quickly replace a collection's content with all open windows and tabs.",
          'Bookmark any collection.',
          'Optionally display a tab count badge on the extension icon.',
          "Use the browser's back button to navigate previously-selected collections.",
          "Never see a broken web site icon thanks to Session Buddy's progressive favicon fallback strategy.",
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
        band="diagonal"
        reverse={reverse}
      />
    </motion.div>
  </section>
);
