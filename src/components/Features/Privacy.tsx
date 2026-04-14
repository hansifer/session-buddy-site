import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { FeatureTiles } from '@/components/Feature/FeatureTiles';
import type { FeatureTile } from '@/components/Feature/FeatureTiles';

import { NoAdsIcon } from '@/assets/icons/NoAdsIcon';
import { NoTrackingIcon } from '@/assets/icons/NoTrackingIcon';
import { NoDataSharingIcon } from '@/assets/icons/NoDataSharingIcon';
import { MonitorIcon } from '@/assets/icons/MonitorIcon';
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
        description="We believe in a better web that puts you in control. We don’t sell your data, we don’t track you, we don’t run ads, and we're not gonna send you marketing emails."
        bullets={[
          'Your bookmarks and tab history are stored securely on your device, never on any server.',
          // 'Only the narrowest permissions required to manage your tabs are requested.',
          'Use Session Buddy for as long as you want without a login.',
          "Verified and featured on the Chrome Web Store for meeting Google's standards of trust and value.",
          'Trusted by millions for over 15 years.',
        ]}
        images={
          <div
            className="
              flex
              justify-center
            "
          >
            <FeatureTiles tiles={tiles} />
          </div>
        }
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);

const tiles: FeatureTile[] = [
  {
    icon: NoAdsIcon,
    label: 'No\nads',
    color: 'text-rose-500',
  },
  {
    icon: NoTrackingIcon,
    label: 'No\ntracking',
    color: 'text-violet-500',
  },
  {
    icon: NoDataSharingIcon,
    label: 'No\ndata sharing',
    color: 'text-amber-500',
  },
  {
    icon: NoLoginIcon,
    label: 'No\nlogin',
    color: 'text-cyan-500',
  },
  {
    icon: MonitorIcon,
    label: 'Local\nfirst',
    color: 'text-emerald-500',
  },
  {
    icon: VerifiedIcon,
    label: 'Verified\u00A0&\ntrusted',
    color: 'text-blue-500',
  },
];
