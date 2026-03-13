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
            border-3
            rounded-xl
            transition-transform
            hover:scale-105
            ${color}
          `}
        >
          <Icon
            className="
              w-14
              h-14
              flex-1
            "
          />
          <span
            className="
              flex
              items-center
              justify-center
              flex-1
              min-h-14
              font-bold
              text-lg
              text-center
            "
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};
