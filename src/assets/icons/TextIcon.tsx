export const TextIcon = ({
  color = '#a5b4fc',
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
    <path d="M3.5 5.5h13" />
    <path d="M3.5 8.5h8.5" />
    <path d="M3.5 11.5h11" />
    <path d="M3.5 14.5h6.5" />
  </svg>
);
