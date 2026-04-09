export const LocationIcon = ({
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
    <path d="M10 17c3.4-4 5.1-6.8 5.1-9a5.1 5.1 0 1 0-10.2 0c0 2.2 1.7 5 5.1 9Z" />
    <circle
      cx="10"
      cy="8.1"
      r="1.8"
    />
  </svg>
);
