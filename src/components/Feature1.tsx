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
        heading="Unlike any tool you used before"
        description="Discover a new level of data analysis with our innovative and user-friendly platform. Transform your business needs with actionable insights."
        bullets={[
          'Real-time data visualization',
          'Advanced predictive analytics',
          'Seamless integration with APIs',
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
