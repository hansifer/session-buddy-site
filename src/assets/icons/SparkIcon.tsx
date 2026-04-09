export const SparkIcon = ({
  color = '#fcd34d',
  size = 20,
}: {
  color?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2.5 11.7 6.3 15.5 8 11.7 9.7 10 13.5 8.3 9.7 4.5 8 8.3 6.3Z" />
    <path d="M15.5 3.5v2" />
    <path d="M16.5 4.5h-2" />
  </svg>
);
