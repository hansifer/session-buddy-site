import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Feature10 = () => (
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
        heading="Wait, there's more!"
        description="Have a ton of tabs open across lots of windows? No problem. Session Buddy presents all of them, organized by window, on a single page."
        bullets={[
          'Powerful organizational features like cloning, merging, or splitting collections and folders.',
          'Add bookmarks from clipboard text or files.',
          'Replace collection contents with open windows and tabs',
          'Deep links',
          'Tab count badge',
          'Favicon fallbacks',
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
        reverse
      />
    </motion.div>
  </section>
);
