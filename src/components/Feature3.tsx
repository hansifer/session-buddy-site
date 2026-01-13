import { useState } from 'react';
import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';
import { InvitationModal } from '@/components/InvitationModal';

import feature7 from '@/assets/images/feature-placeholder-7.jpg';

export const Feature3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
          heading="Build & Launch without problems"
          description="Our platform enables you to launch your data-driven projects with ease. Boost productivity and achieve better results. Empower your decision-making with advanced analytics."
          button={{
            label: 'Get Started',
            onClick: () => setIsModalOpen(true),
          }}
          images={[
            {
              src: feature7.src,
              alt: 'Feature image 7',
            },
          ]}
          band="diagonal"
        />
      </motion.div>
      {isModalOpen ? (
        <InvitationModal onClose={() => setIsModalOpen(false)} />
      ) : null}
    </section>
  );
};
