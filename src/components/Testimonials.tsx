import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { StandardQuoteIcon } from '@/assets/icons/QuoteIcon';
import type { Testimonial } from '@/types';
import { randomize } from '@/util/array';

import { testimonials as testimonialsData } from '@/content/testimonials';

const GROUP_SIZE = 3; // number of testimonials to show at once
const groupCount = Math.ceil(testimonialsData.length / GROUP_SIZE);
const MIN_SHIMMER_MS = 600;

// todo: support for displaying indefinite number of testimonials

export const Testimonials = () => {
  const [shownGroupCount, setShownGroupCount] = useState(2);
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);

  useEffect(() => {
    const start = Date.now();
    const randomizedTestimonials = randomize(testimonialsData);
    const elapsed = Date.now() - start;
    const remainingDelay = Math.max(MIN_SHIMMER_MS - elapsed, 0);

    const timeout = window.setTimeout(() => {
      setTestimonials(randomizedTestimonials);
    }, remainingDelay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      className="
        flex
        justify-center
        w-full
        my-6
        lg:my-12
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
            Why people love Session Buddy
          </div>
          {Array.from(
            { length: Math.min(shownGroupCount, groupCount) },
            (_, i) => (
              <div
                key={i}
                className="
                  flex
                  flex-col
                  lg:flex-row
                  items-center
                  lg:items-stretch
                  justify-center
                  gap-8
                  lg:gap-5
                  xl:gap-10
                  px-6
                  xl:px-0
                  mb-8
                  lg:mb-5
                  xl:mb-10
                "
              >
                {testimonials
                  ? testimonials
                      .slice(i * GROUP_SIZE, (i + 1) * GROUP_SIZE)
                      .map((testimonial) => (
                        <TestimonialBlock
                          key={testimonial.name}
                          testimonial={testimonial}
                        />
                      ))
                  : Array.from({ length: GROUP_SIZE }, (_, j) => (
                      <TestimonialBlock key={`placeholder-${i}-${j}`} />
                    ))}
              </div>
            ),
          )}
          {shownGroupCount < groupCount ? (
            <div
              className="
                flex
                justify-center
                mt-10
              "
            >
              <button
                className="
                  px-8
                  py-3
                  contained-button
                "
                onClick={() => {
                  setShownGroupCount((count) => count + 1);
                }}
              >
                See more
              </button>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialBlock = ({ testimonial }: { testimonial?: Testimonial }) => {
  const { name, quote, role, image } = testimonial
    ? {
        ...testimonial,
        role: getRole(testimonial),
        image: 'image' in testimonial ? testimonial.image : null,
      }
    : {};

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
      aria-hidden={testimonial ? undefined : true}
    >
      <div className="mb-2">
        <StandardQuoteIcon />
      </div>
      {testimonial ? (
        <div className="content-text-white">"{quote}"</div>
      ) : (
        <>
          <div className="shimmer-line h-4 w-full rounded-md" />
          <div className="mt-3 shimmer-line h-4 w-11/12 rounded-md" />
          <div className="mt-3 shimmer-line h-4 w-4/5 rounded-md" />
        </>
      )}
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
        {testimonial ? (
          image ? (
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
          ) : null
        ) : (
          <div className="size-11 rounded-full shimmer-line" />
        )}
        {testimonial ? (
          <div>
            <div
              className="
                content-text-white
                font-bold
              "
            >
              {name}
            </div>
            {role ? (
              <div className="text-secondaryTextColor">{role}</div>
            ) : null}
          </div>
        ) : (
          <div className="shimmer-line h-4 w-2/5 rounded-md" />
        )}
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
