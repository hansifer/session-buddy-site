export const WarningIcon = ({
  color = '#fdba74',
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
    <path d="M10 3.2 17 15.5H3Z" />
    <path d="M10 7v3.8" />
    <path d="M10 13.7h.01" />
  </svg>
);
