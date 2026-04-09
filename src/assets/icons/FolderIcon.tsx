export const FolderIcon = ({
  color = '#fde047',
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
    <path d="M2.8 6.8h4.8l1.6 1.8h8v6.1a2 2 0 0 1-2 2H4.8a2 2 0 0 1-2-2Z" />
  </svg>
);
