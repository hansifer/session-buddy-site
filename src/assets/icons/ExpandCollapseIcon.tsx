import { tw } from '@/util/tailwind';

type ExpandCollapseIconProps = {
  expanded: boolean;
  transitionDuration?: number;
  className: string;
};

export const ExpandCollapseIcon = ({
  expanded,
  transitionDuration = 300,
  className,
}: ExpandCollapseIconProps) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="28px"
      height="30px"
      fill="none"
      className={tw`
        transition-transform
        ${expanded ? 'rotate-180' : 'rotate-90'}
      `}
      style={{ transitionDuration: `${transitionDuration}ms` }}
    >
      <path
        d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const HighlightedExpandCollapseIcon = ({
  expanded,
  transitionDuration,
  className = '',
}: ExpandCollapseIconProps) => (
  <ExpandCollapseIcon
    expanded={expanded}
    transitionDuration={transitionDuration}
    className={`text-secondaryColor ${className}`}
  />
);
