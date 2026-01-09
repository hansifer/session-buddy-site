import { formatDate } from '@/util/date';
import type { Article } from '@/types';

export const ArticlePage = ({
  article: { title, subtitle, date, image, content, author },
}: {
  article: Article;
}) => {
  return (
    <div
      className="
        flex
        justify-center
      "
    >
      <div
        className="
          px-2
          sm:px-4
        "
      >
        <article
          className="
            p-8
            w-full
            lg:w-300
            2xl:w-350
            mb-24
            text-center
          "
        >
          <header className="mb-12">
            <div
              className="
                my-4
                text-sm
                text-secondaryTextColor
              "
            >
              {formatDate(date)}
            </div>
            <h1
              className="
                mb-4
                text-[2rem]
                xs:text-[2.8rem]
                lg:text-[3.5rem]
                font-bold
                text-primaryTextColor
              "
            >
              {title}
            </h1>
            <p
              className="
                mb-4
                text-lg
                text-secondaryTextColor
              "
            >
              {subtitle}
            </p>
          </header>
          <img
            src={image}
            alt={title}
            className="
              my-8
              w-11/12
              md:w-3/4
              mx-auto
              rounded-xl
              sm:rounded-2xl
              lg:rounded-3xl
            "
            aria-label={title}
          />
          <section
            className="
              w-full
              md:w-10/12
              lg:w-2/3
              mt-16
              mx-auto
              sm:text-xl
              leading-6!
              sm:leading-8!
              text-left
              sm:text-justify
              text-secondaryTextColor
            "
            aria-labelledby="content-title"
          >
            {content}
          </section>
          <div
            className="
              w-4/5
              lg:w-2/3
              mt-8
              mx-auto
              text-xl
              text-right
              text-primaryTextColor
            "
          >
            {`~ ${author}`}
          </div>
        </article>
      </div>
    </div>
  );
};
