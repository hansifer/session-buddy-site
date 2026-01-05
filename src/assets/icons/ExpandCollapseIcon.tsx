import { tw } from '@/util/tailwind';

export const ExpandCollapseIcon = ({
  expanded,
  className,
}: {
  expanded: boolean;
  className: string;
}) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="28px"
      height="30px"
      fill="none"
      className={tw`
        transition-transform
        duration-250
        ${expanded ? 'rotate-180' : 'rotate-90'}
      `}
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
  className = '',
}: {
  expanded: boolean;
  className: string;
}) => (
  <ExpandCollapseIcon
    expanded={expanded}
    className={`text-secondaryColor ${className}`}
  />
);
