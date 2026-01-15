import { motion } from 'framer-motion';

import { blog } from '@/content/blog';

export const Blog = () => (
  <section
    className="
      flex
      justify-center
      my-4
      lg:my-8
    "
  >
    <div
      className="
        lg:w-250
        xl:w-287
        2xl:w-300
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
            px-6
            sm:px-8
            lg:px-14
          "
        >
          <div
            className="
              max-w-2xl
              mb-8
              lg:mb-14
              xl:mb-16
              mx-auto
              lg:mx-0
              text-center
              lg:text-left
            "
          >
            <h2
              className="
                mb-6
                block-big-title
              "
            >
              Latest Insights
            </h2>
            <p
              className="
                mb-6
                text-secondaryTextColor
              "
            >
              Stay updated with the latest trends and insights in our industry.
            </p>
          </div>
          <div
            className="
              flex
              gap-6
              w-full
              h-auto
              lg:h-124
              xl:h-140
            "
          >
            <TallBlock article={blog[0]} />
            <div
              className="
                flex-col
                gap-6
                hidden
                sm:flex
                sm:w-full
                lg:w-1/2
                xl:w-2/5
              "
            >
              {blog.slice(1).map((article) => (
                <ShortBlock
                  key={article.slug}
                  article={article}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const TallBlock = ({
  article: { image, title, subtitle, slug },
}: {
  article: (typeof blog)[number];
}) => (
  <div
    className="
      flex
      sm:hidden
      lg:flex
      w-11/12
      lg:w-1/2
      xl:w-3/5
      mx-auto
    "
  >
    <a href={`/blog/${slug}`}>
      <div
        className="
          p-6
          sm:p-10
          h-full
          rounded-3xl
          bg-blockBackgroundColor
          hover:bg-blockStrongBackgroundColor
          transition
          cursor-pointer
        "
      >
        <img
          src={image}
          alt={title}
          className="
            rounded-xl
            mb-6
          "
          aria-label={title}
        />
        <h3
          className="
            mb-6
            text-2xl
            font-bold
            font-heading
            text-primaryTextColor
          "
        >
          {title}
        </h3>
        <p className="text-secondaryTextColor">{subtitle}</p>
      </div>
    </a>
  </div>
);

const ShortBlock = ({
  article: { image, title, subtitle, slug },
}: {
  article: (typeof blog)[number];
}) => (
  <a
    href={`/blog/${slug}`}
    className="
      flex
      items-start
      gap-10
      grow
      px-8
      lg:px-10
      py-8
      rounded-3xl
      bg-blockBackgroundColor
      hover:bg-blockStrongBackgroundColor
      transition
      cursor-pointer
    "
  >
    <div>
      <h3
        className="
          mb-4
          text-xl
          font-bold
          font-heading
          text-primaryTextColor
        "
      >
        {title}
      </h3>
      <p className="text-secondaryTextColor">{subtitle}</p>
    </div>
    <img
      src={image}
      alt={title}
      className="
        max-w-40
        w-auto
        h-auto
        ml-auto
        rounded-xl
      "
      aria-label={title}
    />
  </a>
);
