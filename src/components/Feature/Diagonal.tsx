import { tw } from '@/util/tailwind';

export const Diagonal = ({ top }: { top?: boolean }) => (
  <div
    className={tw`
      w-full
      overflow-hidden
      ${top ? 'rotate-180' : ''}
      pointer-events-none
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="
        w-full
        h-32
        rotate-x-180
        fill-primaryBackgroundColor
      "
    >
      <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
    </svg>
  </div>
);
