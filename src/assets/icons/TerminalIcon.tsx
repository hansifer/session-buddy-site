export const TerminalIcon = ({
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
    <rect
      x="2.5"
      y="4"
      width="15"
      height="12"
      rx="2.5"
    />
    <path d="m6.2 8.1 2.1 1.9-2.1 1.9" />
    <path d="M10.7 12h3.2" />
  </svg>
);
