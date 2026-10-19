import type { JSX } from 'react';

export function Users(): JSX.Element {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        text-left
      "
      role="img"
      aria-label="More than one million users"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 78 48"
        className="w-18 sm:w-20 h-auto overflow-visible"
      >
        <circle
          cx="17"
          cy="24"
          r="16"
          className="fill-blue-500/25 stroke-blue-300/35"
        />
        <circle
          cx="61"
          cy="24"
          r="16"
          className="fill-blue-500/25 stroke-blue-300/35"
        />
        <circle
          cx="39"
          cy="24"
          r="20"
          className="fill-primaryColor stroke-blue-200/40"
        />
        <g className="fill-blue-100/80">
          <circle cx="17" cy="20" r="4.5" />
          <path d="M8.5 34c.7-6 4-9 8.5-9s7.8 3 8.5 9z" />
          <circle cx="61" cy="20" r="4.5" />
          <path d="M52.5 34c.7-6 4-9 8.5-9s7.8 3 8.5 9z" />
        </g>
        <g className="fill-white">
          <circle cx="39" cy="18.5" r="5.5" />
          <path d="M28.5 35.5c.9-7.2 5-10.8 10.5-10.8s9.6 3.6 10.5 10.8z" />
        </g>
      </svg>
      <div className="leading-none">
        <div
          className="
            text-3xl
            sm:text-4xl
            font-bold
            tracking-tight
            text-primaryTextColor
          "
        >
          1,000,000+
        </div>
        <div
          className="
            mt-1.5
            text-xs
            sm:text-sm
            font-bold
            uppercase
            tracking-[0.24em]
            text-primaryColor
          "
        >
          users
        </div>
      </div>
    </div>
  );
}
