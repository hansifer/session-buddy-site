import { motion } from 'framer-motion';

import { StandardQuoteIcon } from '@/assets/icons/QuoteIcon';
import type { Testimonial } from '@/types';

import { testimonials } from '@/content/testimonials';

// todo: support for displaying indefinite number of testimonials

export const Testimonials = () => (
  <section
    className="
      flex
      justify-center
      w-full
    "
  >
    <div
      className="
        w-full
        max-w-287
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
            block-big-title
            text-center
            px-8
            sm:px-24
            md:px-48
            mb-20
          "
        >
          People love Session Buddy
        </div>
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            gap-8
            lg:gap-5
            xl:gap-10
            px-6
            xl:px-0
          "
        >
          {testimonials.map((testimonial) => (
            <TestimonialBlock
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const TestimonialBlock = ({ testimonial }: { testimonial: Testimonial }) => {
  const { name, quote } = testimonial;
  const role = getRole(testimonial);
  const image = 'image' in testimonial ? testimonial.image : null;

  return (
    <div
      className="
        w-11/12
        sm:w-4/5
        md:w-140
        lg:w-1/3
        px-6
        py-4
        rounded-3xl
        block-border
        bg-blockBackgroundColor
      "
    >
      <div className="mb-2">
        <StandardQuoteIcon />
      </div>
      <div className="content-text-white">"{quote}"</div>
      <div
        className="
          flex
          items-center
          gap-4
          mt-4
          xl:mt-8
          mb-2
          xl:mb-4
        "
      >
        {image ? (
          <img
            src={image}
            alt={`${name} avatar`}
            aria-label={name}
            className="
              size-11
              rounded-full
              object-cover
            "
          />
        ) : null}
        <div>
          <div
            className="
              content-text-white
              font-medium
            "
          >
            {name}
          </div>
          {role ? <div className="text-secondaryTextColor">{role}</div> : null}
        </div>
      </div>
    </div>
  );
};

function getRole(testimonial: Testimonial) {
  let role = '';

  if ('role' in testimonial && testimonial.role) {
    role = testimonial.role;
  }

  if ('company' in testimonial && testimonial.company) {
    role = role // wrap
      ? `${role} at ${testimonial.company}`
      : testimonial.company;
  }

  return role;
}
