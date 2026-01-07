import { ArrowIcon } from '@/assets/icons/ArrowIcon';
import { tw } from '@/util/tailwind';

type ExpandCollapseIconProps = {
  expanded?: boolean;
  transitionDuration?: number;
  className?: string;
};

export const ExpandCollapseIcon = ({
  expanded,
  transitionDuration,
  className,
}: ExpandCollapseIconProps) => (
  <ArrowIcon
    direction={expanded ? 'down' : 'right'}
    transitionDuration={transitionDuration}
    className={className}
  />
);

export const HighlightedExpandCollapseIcon = ({
  expanded,
  transitionDuration,
  className = '',
}: ExpandCollapseIconProps) => (
  <ExpandCollapseIcon
    expanded={expanded}
    transitionDuration={transitionDuration}
    className={tw`text-secondaryColor ${className}`}
  />
);
