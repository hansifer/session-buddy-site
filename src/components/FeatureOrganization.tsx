import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature1 from '@/assets/images/feature-placeholder-1.jpg';
import feature2 from '@/assets/images/feature-placeholder-2.jpg';
import feature3 from '@/assets/images/feature-placeholder-3.jpg';
import feature4 from '@/assets/images/feature-placeholder-4.jpg';

export const FeatureOrganization = () => (
  <section className="w-full">
    <div
      id="features"
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
        heading="Stay organized"
        description="Organize your bookmarks into collections and folders by topic, date, or whatever suits your own workflow."
        bullets={[
          'Name and color-code collections for easy identification.',
          'Pin your most important collections for quick access.',
          // 'Enjoy powerful organizational features like cloning, merging, or splitting collections and folders.',
          'Easily reorder and edit folders and bookmarks.',
          'Quickly find and remove duplicate bookmarks.',
        ]}
        images={[
          {
            src: feature1.src,
            alt: 'Feature image 1',
          },
          {
            src: feature2.src,
            alt: 'Feature image 2',
          },
          {
            src: feature3.src,
            alt: 'Feature image 3',
          },
          {
            src: feature4.src,
            alt: 'Feature image 4',
          },
        ]}
      />
    </motion.div>
  </section>
);
