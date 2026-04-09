export const BugIcon = ({
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
    <path d="M7.2 7.4A2.8 2.8 0 0 1 10 4.6a2.8 2.8 0 0 1 2.8 2.8" />
    <path d="M6.3 8.8h7.4v3.1a3.7 3.7 0 0 1-7.4 0Z" />
    <path d="M10 8.8V16" />
    <path d="M4.7 8.1 6.3 9.2" />
    <path d="M15.3 8.1 13.7 9.2" />
    <path d="M4.4 11h1.9" />
    <path d="M13.7 11h1.9" />
    <path d="M4.7 13.9 6.3 12.8" />
    <path d="M15.3 13.9 13.7 12.8" />
  </svg>
);
