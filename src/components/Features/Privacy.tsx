import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import feature5 from '@/assets/images/feature-placeholder-5.jpg';
import feature6 from '@/assets/images/feature-placeholder-6.jpg';

export const Privacy = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
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
        heading="Private by design"
        // heading="Your privacy is our first priority"
        // heading="What happens in your browser, stays in your browser"
        description="No ads. No tracking. No data sharing."
        bullets={[
          'Your bookmarks and tab history are stored securely on your device, never on any server.',
          'Only the narrowest permissions required to manage your tabs are requested.',
          'Use Session Buddy for as long as you want without being required to create a login.',
          "Verified and featured on the Chrome Web Store for adhering to Google's standards of trust and best practices.",
          'Trusted by millions for over 15 years with zero data breaches or third-party sharing.',
          // 'No user data has ever or will ever be shared with 3rd parties.',
          // 'We will never track your browsing or sell your data.',
        ]}
        images={[
          {
            src: feature5.src,
            alt: 'Feature image 5',
          },
          {
            src: feature6.src,
            alt: 'Feature image 6',
          },
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
