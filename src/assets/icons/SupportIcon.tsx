export const SupportIcon = ({
  color = '#bef264',
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
    <path d="M6.4 14.9c.8 1 2 1.6 3.6 1.6 3 0 5.4-2.2 5.4-5.1S13 6.3 10 6.3 4.6 8.5 4.6 11.4c0 .8.2 1.5.5 2.2" />
    <path d="M4.7 12.2A2.2 2.2 0 0 1 2.5 10c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5a2.2 2.2 0 0 1-2.2 2.2" />
    <path d="M9.9 10.7h.1" />
    <path d="M10 13.5h.1" />
  </svg>
);
