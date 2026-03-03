import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Feature8 = () => (
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
        heading="Scale to thousands"
        description="Session Buddy is built to handle even the most extreme tab and bookmark management needs. Whether you have dozens, hundreds, or even thousands of tabs and bookmarks, Session Buddy's powerful organizational features and intuitive interface make it easy to keep everything under control. Manage thousands of tabs and bookmarks without breaking a sweat"
        bullets={[
          'Optimize your resources',
          'Copy select tabs to the clipboard for easy sharing. Supported formats include plain text, Markdown, CSV, JSON, and BBCode.',
          'Open a list of URLs directly from the clipboard or a file.',
          'Close selected windows and tabs with one click to quickly declutter your browser.',
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
