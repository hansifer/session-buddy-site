type Direction = 'up' | 'down' | 'left' | 'right';

export const ArrowIcon = ({
  direction = 'up',
  transitionDuration = 300,
  className,
}: {
  direction?: Direction;
  transitionDuration?: number;
  className?: string;
}) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="28px"
      height="30px"
      fill="none"
      className="transition-transform"
      style={{
        rotate: `${directionRotate(direction)}deg`,
        transitionDuration: `${transitionDuration}ms`,
      }}
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

function directionRotate(direction?: Direction) {
  switch (direction) {
    case 'right':
      return 90;
    case 'down':
      return 180;
    case 'left':
      return 270;
  }

  return 0;
}
