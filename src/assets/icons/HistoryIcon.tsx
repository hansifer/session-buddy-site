export const HistoryIcon = ({
  color = '#93c5fd',
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
    <path d="M3.5 9.8A6.5 6.5 0 1 1 6 15" />
    <path d="M3.5 5.5v4.3h4.3" />
    <path d="M10 6.6v3.7l2.6 1.5" />
  </svg>
);
