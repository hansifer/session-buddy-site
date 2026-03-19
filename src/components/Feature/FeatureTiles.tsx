import { tw } from '@/util/tailwind';

// todo: adapt grid-cols based on tiles count

export type FeatureTile = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  color?: string; // Tailwind color class, e.g. 'text-cyan-500'
};

export const FeatureTiles = ({ tiles }: { tiles: FeatureTile[] }) => {
  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        gap-4
        md:gap-8
        w-full
        max-w-4xl
        mx-auto
      "
    >
      {tiles.map(({ icon: Icon, label, color = 'text-primaryColor' }) => (
        <div
          key={label}
          className={tw`
            flex
            flex-col
            items-center
            justify-center
            gap-4
            p-6
            border
            rounded-xl
            ${color}
            supports-[background:color-mix(in_oklab,black,white)]:bg-current/[0.0902]
          `}
        >
          <div
            className="
              flex
              items-center
              justify-center
              flex-1
              min-h-14
            "
          >
            <Icon
              className="
                size-10
              "
            />
          </div>
          <span
            className="
              flex
              items-center
              justify-center
              flex-1
              min-h-14
              font-bold
              text-sm
              text-center
              whitespace-pre-line
            "
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};
