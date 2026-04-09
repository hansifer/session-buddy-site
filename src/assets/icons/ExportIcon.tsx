export const ExportIcon = ({
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
    <path d="M10 3v8" />
    <path d="m6.8 6.2 3.2-3.2 3.2 3.2" />
    <path d="M4 11.5v2.8A1.7 1.7 0 0 0 5.7 16h8.6a1.7 1.7 0 0 0 1.7-1.7v-2.8" />
  </svg>
);
