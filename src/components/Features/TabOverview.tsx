import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { LoopingVideo } from '@/components/LoopingVideo';

import sessionFilterVideo from '@/assets/images/session-filter.mp4';

export const TabOverview = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="tab-control"
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
        heading="Total tab control"
        description="Cut through the chaos of scattered windows. Visualize and control all of your open tabs from a single, unified dashboard."
        bullets={[
          'Quickly locate any tab with instant filtering.',
          'Open tabs from text.',
          'Close related tabs with one click.',
          'Copy tabs as links, Markdown, CSV, or JSON for easy sharing.',
          'Reduce noise by hiding pinned, new, or browser feature tabs.',
        ]}
        images={
          <div
            className="
              lg:max-w-md
              mx-auto
            "
          >
            <LoopingVideo
              src={sessionFilterVideo}
              alt="Session filter demo"
            />
          </div>
        }
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
