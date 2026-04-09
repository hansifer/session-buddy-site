export const BackupIcon = ({
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
    <path d="M3.2 12.2h4.2l1.8 2h1.6l1.8-2h4.2v2a2 2 0 0 1-2 2H5.2a2 2 0 0 1-2-2Z" />
    <path d="M10 3.8v7.2" />
    <path d="m7.6 8.8 2.4 2.4 2.4-2.4" />
  </svg>
);
