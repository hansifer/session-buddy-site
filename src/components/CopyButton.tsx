import { useState, useRef } from 'react';
import { tw } from '@/util/tailwind';

export const CopyButton = ({
  content,
  className = '',
}: {
  content: string;
  className?: string;
}) => {
  const [label, setLabel] = useState('Copy');
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return (
    <button
      onClick={() => {
        clearTimeout(timeoutRef.current);

        navigator.clipboard.writeText(content);
        setLabel('Copied');

        timeoutRef.current = setTimeout(() => setLabel('Copy'), 2_000);
      }}
      className={tw`
        border
        border-blockStrongBorderColor
        rounded-lg
        text-xs
        px-2
        py-0.5
        cursor-pointer
        ${className}
      `}
    >
      {label}
    </button>
  );
};
