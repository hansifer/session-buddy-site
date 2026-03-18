import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { FeatureTiles } from '@/components/Feature/FeatureTiles';
import type { FeatureTile } from '@/components/Feature/FeatureTiles';

import { NoAdsIcon } from '@/assets/icons/NoAdsIcon';
import { NoTrackingIcon } from '@/assets/icons/NoTrackingIcon';
import { NoDataSharingIcon } from '@/assets/icons/NoDataSharingIcon';
import { LocalFirstIcon } from '@/assets/icons/LocalFirstIcon';
import { NoLoginIcon } from '@/assets/icons/NoLoginIcon';
import { VerifiedIcon } from '@/assets/icons/VerifiedIcon';

export const Privacy = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="privacy"
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
        images={<FeatureTiles tiles={tiles} />}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);

const tiles: FeatureTile[] = [
  {
    icon: NoAdsIcon,
    label: 'No ads',
    color: 'text-violet-500',
  },
  {
    icon: NoTrackingIcon,
    label: 'No tracking',
    color: 'text-amber-500',
  },
  {
    icon: NoDataSharingIcon,
    label: 'No data sharing',
    color: 'text-rose-500',
  },
  {
    icon: LocalFirstIcon,
    label: 'Local first',
    color: 'text-cyan-500',
  },
  {
    icon: NoLoginIcon,
    label: 'No login',
    color: 'text-emerald-500',
  },
  {
    icon: VerifiedIcon,
    label: 'Verified & Trusted',
    color: 'text-blue-500',
  },
];
