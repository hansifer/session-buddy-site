import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Feature4 = () => (
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
        heading="Travel back in time"
        description="Never lose another tab to a crash or accidental window closure. Use Session Buddy's history timeline to view and restore your tabs exactly as they were at a particular point in the past."
        bullets={[
          'Session Buddy captures windows and tabs as they change and during certain events like a browser or OS crash.',
          'Edit your timeline, save events as collections, or restore an event directly to your current session.',
          "You're in control. Decide how often you want Session Buddy to snapshot tabs or turn off automatic snapshots altogether.",
          'Define retention rules to automatically clean up old snapshots and keep your timeline tidy.',
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
