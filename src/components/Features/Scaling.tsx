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
        heading="Go nuts"
        description="Don't hold back. Session Buddy is engineered for heavy workloads."
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
            <TabStream />
          </div>
        }
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
