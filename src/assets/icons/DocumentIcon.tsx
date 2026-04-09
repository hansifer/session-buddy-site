export const DocumentIcon = ({
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
    <path d="M6.2 2.8h5.7l3.1 3.1v10.3a1.8 1.8 0 0 1-1.8 1.8H6.2a1.8 1.8 0 0 1-1.8-1.8V4.6a1.8 1.8 0 0 1 1.8-1.8Z" />
    <path d="M11.9 2.8v3.4h3.1" />
    <path d="M7.2 9.1h5.5" />
    <path d="M7.2 12.2h5.5" />
  </svg>
);
