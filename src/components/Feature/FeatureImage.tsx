import { tw } from '@/util/tailwind';

export const FeatureImage = ({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className="p-3">
    <img
      src={src}
      alt={alt}
      aria-label={alt}
      className={tw`
        rounded-xl
        mx-auto
        ${className}
      `}
    />
  </div>
);
