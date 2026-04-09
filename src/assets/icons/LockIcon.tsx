export const LockIcon = ({
  color = '#e2e8f0',
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
    <rect
      x="4"
      y="8.5"
      width="12"
      height="8"
      rx="2"
    />
    <path d="M6.8 8.5V6.9a3.2 3.2 0 1 1 6.4 0v1.6" />
  </svg>
);
