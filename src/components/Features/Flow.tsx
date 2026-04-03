import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { CollectionSaveRestore } from '@/components/CollectionSaveRestore';
import { useResponsiveSize } from '@/util/useResponsiveSize';

export const Flow = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => {
  const { width, height } = useResponsiveSize({
    translate: (windowSize) => {
      const width = !windowSize
        ? 470
        : windowSize.width < 1024 // lg
          ? windowSize.width * 0.9
          : Math.min(windowSize.width * 0.4, 660);

      const windowCount = !windowSize || windowSize.width < 700 ? 3 : 4;

      return {
        width,
        height: windowCount,
      };
    },
  });

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
                width={width}
                windowCount={height}
                minTabs={width < 600 ? 4 : 5}
                maxTabs={
                  width < 452 ? 5 : width < 528 ? 6 : width < 610 ? 7 : 8
                }
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
