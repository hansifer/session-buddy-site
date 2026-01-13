import { HighlightedCheckIcon } from '@/assets/icons/CheckIcon';

export type FeatureTextProps = {
  heading: string;
  description: string;
  bullets?: string[];
  button?: {
    label: string;
    onClick: () => void;
  };
};

export const FeatureText = ({
  heading,
  description,
  bullets,
  button,
}: FeatureTextProps) => {
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
      {button ? (
        <button
          className="
            w-52
            h-12
            contained-button
          "
          aria-label={button.label}
          onClick={() => button.onClick()}
        >
          {button.label}
        </button>
      ) : null}
      {!button && bullets?.length ? (
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
