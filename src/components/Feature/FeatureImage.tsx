import { tw } from '@/util/tailwind';

export const FeatureImage = ({
  src,
  alt,
  shadow,
  className = '',
}: {
  src: string;
  alt: string;
  shadow?: boolean;
  className?: string;
}) => (
  <div
    className={tw`
      inline-block
      m-3
      overflow-hidden
      rounded-xl
      ${shadow ? 'shadow-2xl shadow-black/80' : ''}
    `}
  >
    <img
      src={src}
      alt={alt}
      aria-label={alt}
      className={className}
    />
  </div>
);
