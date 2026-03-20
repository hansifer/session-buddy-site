import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { TabStream } from '@/components/TabStream';

export const Scaling = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
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
        heading="Scale to thousands"
        // heading="Tab your full potential"
        // heading="Built for heavy hitters"
        // heading="Built for scale"
        // heading="Built for power users"
        // heading="Manage thousands of tabs and bookmarks without breaking a sweat"
        description="Session Buddy is engineered for heavy workloads. Manage thousands of tabs and bookmarks with zero lag, instant search, and rock-solid stability."
        // description="Session Buddy is purpose-built to handle the most extreme tab hoarder's needs with unmatched ease."
        bullets={[
          'Save unlimited collections without performance penalties or storage quotas.',
          'Open hundreds of tabs at once without freezing your browser.',
          'Search, import, export, and backup huge libraries of collections and history in seconds.',
          'Enjoy a consistently snappy user experience no matter how much data you add.',
        ]}
        images={
          <div
            className="
              flex
              justify-center
              lg:justify-start
            "
          >
            <TabStream />
          </div>
        }
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
