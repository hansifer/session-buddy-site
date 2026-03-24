import type { JSX } from 'react';
import { FeatureText } from '@/components/Feature/FeatureText';
import type { FeatureTextProps } from '@/components/Feature/FeatureText';
import { FeatureImage } from '@/components/Feature/FeatureImage';
import { Diagonal } from '@/components/Feature/Diagonal';
import { Fade } from '@/components/Fade';
import { tw } from '@/util/tailwind';

type Image = {
  src: string;
  alt: string;
  shadow?: boolean;
  className?: string;
};

type FadeProps = {
  height: string;
  color: string;
};

export const Feature = ({
  heading,
  description,
  bullets,
  button,
  images,
  reverse,
  band,
  fade = {
    height: '',
    color: '',
  },
}: FeatureTextProps & {
  images: [Image] | [Image, Image] | [Image, Image, Image, Image] | JSX.Element;
  reverse?: boolean;
  band?: 'diagonal' | true | false;
  fade?: FadeProps;
}) => (
  <div
    className={tw`
      w-full
      ${band === 'diagonal' ? '-my-6' : ''}
      ${band ? 'bg-secondaryBackgroundColor' : ''}
    `}
  >
    {band === 'diagonal' ? <Diagonal top /> : null}
    <div
      className={tw`
        ${band ? (band === 'diagonal' ? 'py-18' : 'py-18') : ''}
      `}
    >
      <div
        className={tw`
          flex
          flex-col
          lg:flex-row
          ${reverse ? 'lg:flex-row-reverse' : ''}
          items-center
          gap-12
          w-11/12
          xl:w-325
          2xl:w-362.5
          xl:px-16
          mx-auto
        `}
      >
        <div className="flex-1">
          <FeatureText
            heading={heading}
            description={description}
            bullets={bullets}
            button={button}
          />
        </div>
        {Array.isArray(images) ? (
          images.length === 1 ? (
            <OneImage
              image={images[0]}
              fade={fade}
            />
          ) : images.length === 2 ? (
            <TwoImages images={images} />
          ) : (
            <FourImages images={images} />
          )
        ) : (
          <div
            className="
              flex-1
              w-11/12
              sm:w-3/4
              lg:w-1/2
              mx-auto
              pt-8
              lg:pt-0
            "
          >
            {images}
          </div>
        )}
      </div>
    </div>
    {band === 'diagonal' ? <Diagonal /> : null}
  </div>
);

const OneImage = ({
  image: { src, alt, className, shadow },
  fade,
}: {
  image: Image;
  fade: FadeProps;
}) => (
  <div
    className="
      relative
      flex-1
      w-11/12
      sm:w-3/4
      lg:w-1/2
      mx-auto
      pt-8
      lg:pt-0
      text-[0px]
    "
  >
    <Fade {...fade} />
    <FeatureImage
      src={src}
      alt={alt}
      shadow={shadow}
      className={className}
    />
  </div>
);

const TwoImages = ({
  images: [firstImage, secondImage],
}: {
  images: [Image, Image];
}) => (
  <div
    className="
      flex
      justify-center
      flex-1
      w-11/12
      sm:w-3/4
      lg:w-1/2
      sm:px-4
      xl:px-8
      text-[0px]
    "
  >
    <div>
      <div
        className="
          mb-4
          md:pr-10
          lg:pr-17
        "
      >
        <FeatureImage
          src={firstImage.src}
          alt={firstImage.alt}
          shadow={firstImage.shadow}
          className={firstImage.className}
        />
      </div>
      <div
        className="
          md:pl-10
          lg:pl-17
        "
      >
        <FeatureImage
          src={secondImage.src}
          alt={secondImage.alt}
          shadow={secondImage.shadow}
          className={secondImage.className}
        />
      </div>
    </div>
  </div>
);

const FourImages = ({ images }: { images: [Image, Image, Image, Image] }) => (
  <div
    className="
      flex
      flex-1
      w-3/4
      lg:w-1/2
      sm:px-4
      xl:px-8
      text-[0px]
    "
  >
    <div
      className="
        flex-1
        px-2
      "
    >
      <div className="mb-4">
        <FeatureImage
          src={images[0].src}
          alt={images[0].alt}
          shadow={images[0].shadow}
          className={images[0].className}
        />
      </div>
      <FeatureImage
        src={images[1].src}
        alt={images[1].alt}
        shadow={images[1].shadow}
        className={images[1].className}
      />
    </div>
    <div
      className="
        hidden
        sm:inline-block
        flex-1
        px-2
        pt-12
        lg:pt-20
      "
    >
      <div className="mb-4">
        <FeatureImage
          src={images[2].src}
          alt={images[2].alt}
          shadow={images[2].shadow}
          className={images[2].className}
        />
      </div>
      <FeatureImage
        src={images[3].src}
        alt={images[3].alt}
        shadow={images[3].shadow}
        className={images[3].className}
      />
    </div>
  </div>
);
