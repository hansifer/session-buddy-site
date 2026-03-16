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
    <div
      id="protection"
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
        heading="Breathe easy"
        description="Don't let a crash or glitch wipe out your hard work. Session Buddy uses multi-layered protection to ensure your data survives the unexpected."
        bullets={[
          'Protect yourself from browser crashes, OS updates, power outages, profile corruption, and other data loss risks.',
          'Instantly recover the tabs you had open immediately before a crash or unexpected shutdown.',
          // 'Use session history to restore windows and tabs exactly as they were at a particular point in time.',
          'Restore deleted items from automatic backups.',
          'Rely on self-healing storage that automatically detects and repairs data corruption caused by platform bugs and external factors.',
          'Secure your entire library with one-click manual backups.',
          // undo
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
