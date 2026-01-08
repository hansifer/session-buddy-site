import { useState } from 'react';
import { motion } from 'framer-motion';

import { InvitationModal } from '@/components/InvitationModal';
import { HighlightedCheckIcon } from '@/assets/icons/CheckIcon';
import { tw } from '@/util/tailwind';

import { tiers } from '@/content/tiers';

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="
        pb-10
        mx-auto
        md:w-4/5 
        lg:w-250
        2xl:w-287
      "
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
      >
        <div>
          <div
            className="
              mb-12
              lg:mb-24
              text-center
            "
          >
            <h2
              className="
                my-6
                text-4xl
                lg:text-5xl
                font-bold
                font-heading
                text-primaryText
              "
            >
              Choose your best plan
            </h2>
            <p
              className="
                mb-6
                text-secondaryText
              "
            >
              Select the plan that suits your needs.
            </p>
            <Toggle
              on={isYearly}
              labels={{ off: 'Monthly', on: 'Yearly' }}
              name="billing-cycle-toggle"
              onToggle={(on) => {
                setIsYearly(on);
              }}
            />
          </div>
          <div
            className="
              flex
              flex-wrap
              flex-col
              lg:flex-row
              items-center
              lg:items-stretch
              justify-center
              gap-12
            "
          >
            {tiers.map((tier) => (
              <Tier
                key={tier.name}
                tier={tier}
                isYearly={isYearly}
                onClick={() => setIsModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </motion.div>
      {isModalOpen ? (
        <InvitationModal onClose={() => setIsModalOpen(false)} />
      ) : null}
    </section>
  );
};

const Tier = ({
  tier: { name, description, emphasize, priceMonthly, priceYearly, features },
  isYearly,
  onClick,
}: {
  tier: (typeof tiers)[number];
  isYearly?: boolean;
  onClick?: () => void;
}) => (
  <div
    className={tw`
      w-87
      sm:w-96
      lg:w-7/25
      ${emphasize ? 'lg:scale-110' : ''}
    `}
  >
    <div
      className={tw`
        flex
        flex-col
        h-full
        p-8
        rounded-3xl
        bg-bgDark3
        ${emphasize ? 'lg:bg-bgDark3Hover' : ''}
      `}
    >
      <h3
        className={tw`
          mb-6
          ${emphasize ? 'lg:mb-8' : ''}
          text-xl
          ${emphasize ? 'lg:text-2xl' : ''}
          font-bold
          font-heading
          text-primaryText
        `}
      >
        {name}
      </h3>
      <div
        className="
          flex
          items-end
        "
      >
        <div
          className="
            mr-2
            text-4xl
            sm:text-5xl
            font-bold
            text-primaryText
          "
        >
          {`$${isYearly ? priceYearly : priceMonthly}`}
        </div>
        <div className="text-gray-500">{isYearly ? '/ year' : '/ month'}</div>
      </div>
      <p
        className={tw`
          mt-4 mb-6
          ${emphasize ? 'lg:my-8 2xl:mb-12' : '2xl:mb-10'}
          text-gray-500
          leading-loose
        `}
      >
        {description}
      </p>
      <ul
        className={tw`
          mb-6
          ${emphasize ? 'lg:mb-14' : ''}
          text-primaryText
        `}
      >
        {features.map((feature) => (
          <li
            key={feature}
            className="
              flex
              mb-4
            "
          >
            <HighlightedCheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={tw`
          contained-button
          px-4
          py-2
          leading-loose
          mt-auto
        `}
        aria-label="Get started"
        onClick={() => onClick?.()}
      >
        Get Started
      </button>
    </div>
  </div>
);

const Toggle = ({
  on,
  labels,
  name,
  onToggle,
}: {
  on: boolean;
  labels: {
    off: string;
    on: string;
  };
  name: string;
  onToggle: (value: boolean) => void;
}) => (
  <label
    className="
      relative
      flex
      items-center
      mx-auto
      w-44
      h-12
      rounded-lg
      bg-bgDark3
      cursor-pointer
      select-none
    "
  >
    <input
      type="checkbox"
      name={name}
      className="
        peer
        appearance-none
      "
      checked={on}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(e.target.checked);
      }}
    />
    <span
      className="
        w-21
        h-10
        rounded-lg
      bg-primaryColor
        shadow-md
        translate-x-1
        peer-checked:translate-x-22
        ease-in-out
        duration-300
      "
    />
    <div
      className="
        absolute
        inset-x-1
        flex
        text-sm
        font-bold
        text-primaryText
      "
    >
      <div
        className={tw`
          flex-1
          transition
          ${on ? 'text-gray-400' : ''}
        `}
      >
        {labels.off}
      </div>
      <div
        className={tw`
          flex-1
          transition
          ${on ? '' : 'text-gray-400'}
        `}
      >
        {labels.on}
      </div>
    </div>
  </label>
);
