import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import historyImg from '@/assets/images/history.png';

export const History = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="history"
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
        heading="Lost tabs are history"
        description="Travel back in time to view, save, or restore your tabs exactly as they were at a particular moment in the past."
        bullets={[
          'Recover your tabs in seconds after a browser crash or system restart.',
          'Resurrect closed tabs long after they\'ve dropped off your browser\'s "Recent tabs" list.',
          'Quickly find "that one tab you had open last Friday".',
          'Tailor your history with custom snapshot intervals and cleanup rules.',
          // 'Control snapshot frequency or disable history altogether.',
          // 'Edit your timeline',
        ]}
        images={[
          {
            src: historyImg.src,
            alt: 'History timeline',
          },
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
