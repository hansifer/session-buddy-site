import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Feature2 = () => (
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
        heading="All your tabs in one view"
        description="Have a ton of tabs open across lots of windows? No problem. Session Buddy presents them all on a single page, organized by window."
        bullets={[
          'Quick-filter tabs by title or URL as you type.',
          'Copy select tabs for easy sharing as plain text, Markdown, CSV, or JSON.',
          'Open a list of URLs directly from the clipboard or a file.',
          'Optionally hide pinned tabs, new tabs, or browser feature tabs.',
          // 'Close selected windows and tabs with one click to quickly declutter your browser.',
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
