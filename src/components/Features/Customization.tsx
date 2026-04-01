import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import lightDarkImg from '@/assets/images/light-dark.png';

export const Customization = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="customization"
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
        heading="Make it yours"
        description="Session Buddy adapts to you, not the other way around. Personalize look, feel, and function to match your workflow."
        bullets={[
          'Choose light or dark mode.',
          "Filter tabs you don't care about.",
          'Power up with customizable keyboard shortcuts.',
          'Fine-tune behaviors with experiments.',
          // 'Select which copy formats to display.',
        ]}
        images={[
          {
            src: lightDarkImg.src,
            alt: 'Light/dark mode',
            shadow: true,
            className: 'lg:w-110 xl:w-130',
          },
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
