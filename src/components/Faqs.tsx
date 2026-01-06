import { useState } from 'react';
import { motion } from 'framer-motion';

import { tw } from '@/util/tailwind';
import { HighlightedExpandCollapseIcon } from '@/assets/icons/ExpandCollapseIcon';

// todo: move to content/
const faqs = [
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer:
      'Yes, you can easily upgrade or downgrade your plan at any time. Simply navigate to the account settings in your dashboard and choose the desired plan. The changes will be reflected immediately, and any adjustments in pricing will be applied on your next billing cycle. Our support team is more than happy to provide guidance and recommendations.',
  },
  {
    question: 'How to claim your 25% discount offer?',
    answer:
      'To claim your 25% discount, simply sign up for an account and enter the promotional code at checkout. The discount will be applied automatically to your purchase.',
  },
  {
    question: "What's your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our product, simply contact our support team within 30 days of purchase for a full refund.",
  },
  {
    question: 'How to get support for the product?',
    answer:
      "Our dedicated support team is here to help. You can reach out to us through the contact form on our website, send an email, or engage with us via live chat. We'll be happy to assist you with any questions or concerns you may have",
  },
];

const TRANSITION_DURATION = 300;

export const Faqs = () => (
  <section className="overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
    >
      <div
        className="
          container
          z-10
          px-2
          sm:px-8
          lg:px-4
          mx-auto
          w-11/12
          sm:w-full
        "
      >
        <div
          className="
            md:max-w-4xl
            mx-auto
          "
        >
          <h2
            className="
              mb-16
              block-big-title
              text-center
            "
          >
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map(({ question, answer }, i) => (
              <div
                className="
                  w-full
                  p-1
                "
                key={question}
              >
                <FaqBox
                  title={question}
                  content={answer}
                  initialExpanded={!i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const FaqBox = ({
  title,
  content,
  initialExpanded,
}: {
  title: string;
  content: string;
  initialExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(!!initialExpanded);

  return (
    <div
      className="
        relative
        px-5
        sm:px-8
        py-2
        sm:py-6
        mb-4
        rounded-3xl
        bg-bgDark3
        hover:bg-bgDark3Hover
        main-border-gray-darker
        cursor-pointer
      "
      onClick={() => {
        setIsExpanded((expanded) => !expanded);
      }}
    >
      <div className="p-2">
        <h3
          className="
            content-title
            pt-0
            pr-8
          "
        >
          {title}
        </h3>
        <p
          className={tw`
            text-secondaryText
            transition-all
            overflow-hidden
            ${
              isExpanded
                ? 'max-h-96 pt-4 opacity-100'
                : 'max-h-0 pt-0 opacity-0'
            }
          `}
          style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        >
          {content}
        </p>
      </div>
      <HighlightedExpandCollapseIcon
        expanded={isExpanded}
        transitionDuration={TRANSITION_DURATION}
        className="
          absolute
          top-4
          right-4
          sm:top-8
          sm:right-8
        "
      />
    </div>
  );
};
