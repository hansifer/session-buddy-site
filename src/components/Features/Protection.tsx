import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import localBackupImg from '@/assets/images/local-backup.png';

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
        description="Don't let a crash or glitch wipe out your hard work. Session Buddy uses multiple layers of protection to ensure your data survives the unexpected."
        bullets={[
          'Protect from crashes, OS updates, outages, profile corruption, and other data loss risks.',
          'Instantly recover your open tabs after a crash or unexpected shutdown.',
          // 'Use session history to restore windows and tabs exactly as they were at a particular point in time.',
          "Restore deleted items from Session Buddy's automatic backup.",
          'Rely on active detection and repair of data corruption caused by platform bugs, OS utilities, and other factors.',
          'Secure your entire library with one-click manual backups.',
          // undo
        ]}
        images={[
          {
            src: localBackupImg.src,
            alt: 'Local backup',
            shadow: true,
            className: 'w-106',
          },
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
