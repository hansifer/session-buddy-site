export const SparkIcon = ({
  color = 'currentColor',
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
    <path d="M10 3.2 11.9 8.1 16.8 10 11.9 11.9 10 16.8 8.1 11.9 3.2 10 8.1 8.1Z" />
    <path d="M14.8 4.2v1.8" />
    <path d="M15.7 5.1h-1.8" />
  </svg>
);
