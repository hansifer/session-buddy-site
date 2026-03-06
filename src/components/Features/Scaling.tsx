import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Scaling = ({
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
        heading="Scale to thousands"
        // heading="Tab your full potential"
        // heading="Built for heavy hitters"
        // heading="Built for scale"
        // heading="Built for power users"
        // heading="Manage thousands of tabs and bookmarks without breaking a sweat"
        description="Session Buddy is engineered for heavy workloads. Manage thousands of tabs and bookmarks with zero lag, instant search, and rock-solid stability."
        // description="Session Buddy is purpose-built to handle the most extreme tab hoarder's needs with unmatched ease."
        bullets={[
          'Save unlimited collections without performance penalties or storage quotas.',
          'Open hundreds of tabs at once without freezing your browser.',
          'Search, import, export, and backup huge libraries of collections and history in seconds.',
          'Enjoy a consistently snappy user experience no matter how much data you add.',
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
