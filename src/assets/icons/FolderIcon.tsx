export const FolderIcon = ({
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
    <path d="M3.1 3.9h4.4l1.5 1.7h7.9v7.3a2 2 0 0 1-2 2H5.1a2 2 0 0 1-2-2Z" />
  </svg>
);
