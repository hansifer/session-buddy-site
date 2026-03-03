import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Customization = ({
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
        heading="Customize your experience with powerful options and settings"
        description="Have a ton of tabs open across lots of windows? No problem. Session Buddy presents all of them, organized by window, on a single page."
        bullets={[
          'Quick-filter tabs by title or URL as you type.',
          'Copy select tabs to the clipboard for easy sharing. Supported formats include plain text, Markdown, CSV, JSON, and BBCode.',
          'Open a list of URLs directly from the clipboard or a file.',
          'Close selected windows and tabs with one click to quickly declutter your browser.',
          'experiments',
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
