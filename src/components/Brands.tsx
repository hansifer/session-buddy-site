import { motion } from 'framer-motion';

import { Logo } from '@/components/Logo';

// todo: replace with company logos (svg with height 32px and currentColor fill)
const PlaceholderCompanyLogo = () => <Logo size={32} />;

export const Brands = () => (
  <section
    className="
      w-full
      py-12
      sm:py-24
    bg-secondaryBackgroundColor
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
      <div
        className="
          container
          mx-auto
          md:w-8/9
          lg:w-280
          xl:w-275
          2xl:w-300
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-center
            text-center
            lg:text-left
          "
        >
          <div
            className="
              lg:w-1/2
              px-4
              mb-12
              lg:mb-0
            "
          >
            <h2
              className="
                mb-2
                text-4xl
                sm:text-5xl
                2xl:text-6xl
                font-bold
                tracking-normal
              text-primaryTextColor
              "
            >
              Trusted by brands
            </h2>
            <h2
              className="
                text-4xl
                sm:text-5xl
                2xl:text-6xl
                font-bold
                tracking-normal
              text-secondaryColor
              "
            >
              all over the world
            </h2>
          </div>
          <div
            className="
              w-2/3
              sm:w-155
              lg:w-1/2
              lg:pl-10
            "
          >
            <div
              className="
                flex
                flex-wrap
                text-[rgb(174,178,183)]
              "
            >
              {[
                // wrap
                PlaceholderCompanyLogo,
                PlaceholderCompanyLogo,
                PlaceholderCompanyLogo,
                PlaceholderCompanyLogo,
                PlaceholderCompanyLogo,
                PlaceholderCompanyLogo,
              ].map((Logo, i) => (
                <div
                  key={i}
                  className="
                    flex
                    items-center
                    justify-center
                    w-1/2
                    sm:w-1/3
                    h-20
                  "
                >
                  <Logo />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);
