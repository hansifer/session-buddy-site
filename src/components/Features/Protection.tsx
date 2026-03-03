import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Protection = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
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
        heading="Breathe easy"
        description="Session Buddy protects your tabs and bookmarks from browser crashes, accidental closures, and other risks. Session Buddy automatically saves your open tabs and bookmarks, so you can easily restore them when needed. automatic crash recovery and data safeguards ensure your data is safe and easily recoverable in case of unexpected events."
        bullets={[
          'Quick-filter tabs by title or URL as you type.',
          'Copy select tabs to the clipboard for easy sharing. Supported formats include plain text, Markdown, CSV, JSON, and BBCode.',
          'Open a list of URLs directly from the clipboard or a file.',
          'We never share anything with anyone.',
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
