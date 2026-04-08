import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { InfiniteCollectionTiles } from '@/components/InfiniteCollectionTiles';

export const Organization = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="organization"
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
        description="Use collections to organize bookmarks by topic, project, timeline, or whatever suits your workflow."
        bullets={[
          'Pin essential collections for quick access.',
          'Add bookmarks from any text or copy and paste tabs directly from the current session.',
          'Color-code collections for quick recognition.',
          // 'Sort, reorder, and move bookmarks across folders and collections.',
          // 'Turn on automatic collection naming and coloring for effortless organization.',
          'Keep things tidy with duplicate bookmark detection.',
          // 'Group bookmarks into folders.',
          // 'Edit bookmark properties like title, URL, and pinned state.',
        ]}
        images={<InfiniteCollectionTiles tileBackgroundColor="bg-[#303136]" />}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
