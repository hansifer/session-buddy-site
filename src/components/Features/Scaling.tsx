import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { TabStream } from '@/components/TabStream';
import { useResponsiveSize } from '@/util/useResponsiveSize';

const DEFAULT_TAB_STREAM_WIDTH = 470;
const DEFAULT_TAB_STREAM_HEIGHT = 360;

export const Scaling = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => {
  const { width, height } = useResponsiveSize({
    translate: (windowSize) => {
      const width = windowSize // wrap
        ? Math.min(windowSize.width * 0.9, DEFAULT_TAB_STREAM_WIDTH)
        : DEFAULT_TAB_STREAM_WIDTH;

      const height =
        width * (DEFAULT_TAB_STREAM_HEIGHT / DEFAULT_TAB_STREAM_WIDTH);

      return {
        width,
        height,
      };
    },
  });

  return (
    <section className="w-full">
      <div
        id="scaling"
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
          heading="Go nuts"
          description="Hoarding tabs at an industrial scale? No problem. Session Buddy is engineered for heavy workloads."
          bullets={[
            'Manage thousands of tabs and bookmarks with zero lag, instant search, and rock-solid stability.',
            'Open hundreds of tabs at once without freezing your browser.',
            'Search, import, export, and backup huge libraries of collections and tab history in seconds.',
          ]}
          images={
            <div
              className="
                flex
                justify-center
                lg:justify-start
              "
            >
              <TabStream
                width={width}
                height={height}
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
