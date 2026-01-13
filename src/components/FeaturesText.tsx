import { HighlightedCheckIcon } from '@/assets/icons/CheckIcon';

export type FeaturesTextProps = {
  heading: string;
  description: string;
  bullets?: string[];
  buttonLabel?: string;
};

export const FeaturesText = ({
  heading,
  description,
  bullets,
  buttonLabel,
}: FeaturesTextProps) => {
  return (
    <div
      className="
        mx-auto
        w-11/12
        sm:w-4/5
        md:w-3/4
      "
    >
      <h2
        className="
          mb-8
          text-4xl
          lg:text-5xl
          block-big-title
        "
      >
        {heading}
      </h2>
      <p
        className="
          mb-10
          leading-loose
        text-secondaryTextColor
        "
      >
        {description}
      </p>
      {bullets?.length ? (
        <ul className="text-primaryTextColor">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="
                flex
                mb-4
              "
            >
              <HighlightedCheckIcon />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
