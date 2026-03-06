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
        heading="Make it your own"
        // heading="Customize your experience"
        description="Session Buddy adapts to you, not the other way around. Personalize look, feel, and function to match your workflow."
        bullets={[
          'Choose your preferred theme with light or dark mode.',
          'Automate organization with smart collection naming and color defaults.',
          'Speed up your workflow with customizable keyboard shortcuts.',
          'Fine-tune detailed behaviors with advanced experimental settings.',
          // 'Select which copy formats to display.',
          // 'Enable and disable warnings and confirmations for various actions.',
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
