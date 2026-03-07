import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature1 from '@/assets/images/feature-placeholder-1.jpg';
import feature2 from '@/assets/images/feature-placeholder-2.jpg';
import feature3 from '@/assets/images/feature-placeholder-3.jpg';
import feature4 from '@/assets/images/feature-placeholder-4.jpg';

export const Organization = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
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
        heading="Collect your thoughts"
        // heading="Bring order to your bookmarks"
        description="Use collections and folders to organize bookmarks by project, topic, timeline, or whatever suits your workflow."
        bullets={[
          'Assign names and colors to collections for instant recognition.',
          'Pin essential collections for quick access.',
          'Add bookmarks from any text or copy and paste tabs directly from the current session.',
          'Sort, reorder, and move bookmarks across folders and collections.',
          'Keep things tidy with duplicate bookmark detection and folder merging.',
          // 'Edit bookmark properties like title, URL, and pinned state.',
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
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
