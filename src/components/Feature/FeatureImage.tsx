export const FeatureImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="p-3">
    <img
      src={src}
      alt={alt}
      aria-label={alt}
      className="
        rounded-xl
        mx-auto
      "
    />
  </div>
);
