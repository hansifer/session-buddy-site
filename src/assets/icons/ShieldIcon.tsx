export const ShieldIcon = ({
  color = '#5eead4',
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
    <path d="M10 2.8c1.9 1.2 4.2 1.8 6.2 1.9v4.2c0 4-2.2 6.2-6.2 8.3-4-2.1-6.2-4.3-6.2-8.3V4.7c2-.1 4.3-.7 6.2-1.9Z" />
    <path d="m7.5 10.1 1.8 1.8 3.3-3.5" />
  </svg>
);
