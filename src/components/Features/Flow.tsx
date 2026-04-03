import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { CollectionSaveRestore } from '@/components/CollectionSaveRestore';

export const Flow = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => {
  return (
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
          heading="From clutter to clarity"
          description="Instantly clear tab clutter and free up memory. Save open tabs with a single click and restore them later exactly as you left them."
          bullets={[
            'Save and restore full sessions or cherry-pick just the tabs you need.',
            'Restore tabs flexibly to original windows, a single window, or the current window.',
            'Preserve context with window positions, pinned tabs, and incognito states fully restored.',
            'Manage tabs and bookmarks together in a singular intuitive interface.',
          ]}
          images={
            <div
              className="
                flex
                justify-center
              "
            >
              <CollectionSaveRestore
                width={600}
                windowCount={4}
                minTabs={5}
                maxTabs={7}
                // windowVerticalOffset={14}
              />
            </div>
          }
          reverse={reverse}
          band={band}
        />
      </motion.div>
    </section>
  );
};
