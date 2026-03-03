import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature1 from '@/assets/images/feature-placeholder-1.jpg';
import feature2 from '@/assets/images/feature-placeholder-2.jpg';
import feature3 from '@/assets/images/feature-placeholder-3.jpg';
import feature4 from '@/assets/images/feature-placeholder-4.jpg';

export const Feature1 = () => (
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
        heading="Flow effortlessly between tabs and bookmarks"
        // heading="From tabs to bookmarks in one click"
        description="Need to eliminate tab clutter or free up memory? Save your open tabs as a collection of bookmarks that can easily be restored later."
        bullets={[
          'Optionally save or restore only the tabs you care about.',
          'Restore tabs into their original windows, a single window, or the current window.',
          'Windows are restored to their original location and state.',
          'Full support for incognito windows and pinned tabs.',
          'Manage both tabs and bookmarks with a common intuitive interface.',
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
