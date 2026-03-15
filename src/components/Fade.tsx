import { tw } from '@/util/tailwind';

const baseClasses = `
  absolute
  inset-x-0
  z-10
  from-current
  to-transparent
  pointer-events-none
`;

// include as child of container to add top/bottom fade effect to contents. container must have non-static position.

export const Fade = ({
  height = 'h-16',
  color = 'text-primaryBackgroundColor',
}: {
  height?: string;
  color?: string;
}) => {
  return (
    <>
      <div
        className={tw`
          ${baseClasses}
          ${height}
          ${color}
          top-0
          bg-linear-to-b
        `}
      />
      <div
        className={tw`
          ${baseClasses}
          ${height}
          ${color}
          bottom-0
          bg-linear-to-t
        `}
      />
    </>
  );
};
