import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const TabOverview = ({
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
        heading="A command center for your browser"
        description="Eliminate the chaos of scattered windows. Visualize and control every open tab from a single, unified dashboard."
        bullets={[
          'Quickly locate any tab with instant filtering.',
          'Copy tabs as text, Markdown, CSV, or JSON for easy sharing.',
          'Open multiple links at once from your clipboard or a text file.',
          'Reduce noise by hiding pinned, new, or browser feature tabs.',
          // 'Declutter your workspace by closing tabs or windows with one click.',
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
