import { motion } from 'framer-motion';

import { Feature } from '@/components/Feature/Feature';

import addLinksImg from '@/assets/images/add-links.jpg';
import exportImg from '@/assets/images/export.jpg';

export const Sharing = ({
  reverse,
  band,
}: {
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <section className="w-full">
    <div
      id="sharing"
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
        heading="Share flexibly"
        description="Move bookmarks and tabs freely in and out of Session Buddy with robust import, export, copy and paste."
        bullets={[
          'Instantly open a list of URLs as tabs or save them to a collection.',
          'Import any text with automatic format detection and smart URL extraction.',
          'Copy tabs or bookmarks and paste them directly into emails, documents, or chat.',
          // 'Export to the clipboard or a file.',
          'Support for 15+ formats including plain text, JSON, CSV, Markdown, and HTML.',
        ]}
        images={[
          {
            src: addLinksImg.src,
            alt: 'Add links from text',
            className: 'shadow-2xl shadow-black/80 max-w-116 lg:max-w-100',
          },
          {
            src: exportImg.src,
            alt: 'Export collections',
            className: 'shadow-2xl shadow-black/80 max-w-116 lg:max-w-100',
          },
        ]}
        reverse={reverse}
        band={band}
      />
    </motion.div>
  </section>
);
