import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import searchImg from '@/assets/images/search.png';

export const Search = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="search"
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
        heading="Find it fast"
        description="Locate any tab or bookmark in seconds with unified search across open tabs, collections, and tab history."
        bullets={[
          'View search results as filtered items or by relevance.',
          'Zero in with view filtering and match highlighting.',
          'Target your search with advanced query syntax.',
          'Narrow search scope by item type.',
        ]}
        images={[
          {
            src: searchImg.src,
            alt: 'Search',
            className: 'lg:w-110 xl:w-120 2xl:w-130',
          },
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
