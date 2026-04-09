export const PulseIcon = ({
  color = '#f9a8d4',
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
    <path d="M2.8 10h3l1.5-3 2.5 6 1.8-4h5.6" />
    <path d="M10 17.2c4.1-2.4 6.8-5.2 6.8-8.8a3.7 3.7 0 0 0-6.8-2.2A3.7 3.7 0 0 0 3.2 8.4c0 3.6 2.7 6.4 6.8 8.8Z" />
  </svg>
);
