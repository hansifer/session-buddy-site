export const FeatureImage = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    aria-label={alt}
    className="
      rounded-xl
      mx-auto
      block-strong-border
    "
  />
);
