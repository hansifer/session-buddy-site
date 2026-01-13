import { FeatureText } from '@/components/FeatureText';
import type { FeatureTextProps } from '@/components/FeatureText';
import { FeatureImage } from '@/components/Feature/FeatureImage';
import { Diagonal } from '@/components/Feature/Diagonal';
import { tw } from '@/util/tailwind';

type Image = {
  src: string;
  alt: string;
};

export const Feature = ({
  heading,
  description,
  bullets,
  button,
  images,
  reverse,
  band,
}: FeatureTextProps & {
  images: [Image] | [Image, Image] | [Image, Image, Image, Image];
  reverse?: boolean;
  band?: 'diagonal' | true | false;
}) => (
  <div
    className={tw`
      w-full
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
        {images.length === 1 ? (
          <OneImage image={images[0]} />
        ) : images.length === 2 ? (
          <TwoImages images={images} />
        ) : (
          <FourImages images={images} />
        )}
      </div>
    </div>
    {band === 'diagonal' ? <Diagonal /> : null}
  </div>
);

const OneImage = ({ image: { src, alt } }: { image: Image }) => (
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
    <FeatureImage
      src={src}
      alt={alt}
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
      flex-1
      w-11/12
      sm:w-3/4
      lg:w-1/2
      sm:px-4
      xl:px-8
    "
  >
    <div
      className="
        mb-4
        md:pr-17
        lg:pr-10
      "
    >
      <FeatureImage
        src={firstImage.src}
        alt={firstImage.alt}
      />
    </div>
    <div
      className="
        md:pl-17
        lg:pl-10
      "
    >
      <FeatureImage
        src={secondImage.src}
        alt={secondImage.alt}
      />
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
        />
      </div>
      <FeatureImage
        src={images[1].src}
        alt={images[1].alt}
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
        />
      </div>
      <FeatureImage
        src={images[3].src}
        alt={images[3].alt}
      />
    </div>
  </div>
);
