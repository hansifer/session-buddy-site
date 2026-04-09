export const InfoIcon = ({
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
    <circle
      cx="10"
      cy="10"
      r="7"
    />
    <path d="M10 8.3v5" />
    <path d="M10 6.1h.01" />
  </svg>
);
