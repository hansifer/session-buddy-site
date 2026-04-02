import type { JSX } from 'react';
import { HighlightedCheckIcon } from '@/assets/icons/CheckIcon';
import { tw } from '@/util/tailwind';

export const BulletList = ({
  items,
  className = '',
}: {
  items: (string | JSX.Element)[];
  className?: string;
}) =>
  items.length ? (
    <ul
      className={tw`
        text-primaryTextColor
        ${className}
      `}
    >
      {items.map((item) => (
        <li
          key={typeof item === 'string' ? item : item.key}
          className="
            flex
            mb-4
          "
        >
          <HighlightedCheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  ) : null;
