export const FlaskIcon = ({
  color = '#c4b5fd',
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
    <path d="M8 3.2h4" />
    <path d="M9 3.2v4.2l-4.1 6.1A1.8 1.8 0 0 0 6.4 16h7.2a1.8 1.8 0 0 0 1.5-2.5L11 7.4V3.2" />
    <path d="M7.4 11.5h5.2" />
  </svg>
);
