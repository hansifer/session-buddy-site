import { tw } from '@/util/tailwind';

type LinkSection = {
  title?: string;
  description?: string;
  items: LinkItem[];
};

type LinkItem = {
  title: string;
  description: string;
  icon: React.ComponentType;
  tone?: Tone;
  href: string;
  openInNewTab?: boolean;
};

type Tone =
  | 'amber'
  | 'rose'
  | 'orange'
  | 'cyan'
  | 'pink'
  | 'yellow'
  | 'emerald'
  | 'sky'
  | 'indigo'
  | 'violet'
  | 'teal'
  | 'blue'
  | 'slate'
  | 'lime'
  | 'zinc';

export const LinkTiles = ({ sections }: { sections: LinkSection[] }) =>
  sections.map(({ title, description, items }, i) => (
    <section
      key={title || i}
      className="scroll-mt-28 mb-24"
    >
      <div
        className="
          container
          w-full
          mx-auto
          mt-14
        "
      >
        {title ? (
          <div className="mb-10">
            <h2
              className="
                mb-8
                block-title
                text-center
              "
            >
              {title}
            </h2>
            {description ? (
              <p
                className="
                  max-w-xl
                  leading-relaxed
                  text-secondaryTextColor
                  text-center
                  mx-auto
                "
              >
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div
          className={tw`
            grid
            gap-5
            ${items.length > 1 ? 'md:grid-cols-2' : ''}
          `}
        >
          {items.map(({ title, description, icon, tone, href }) => (
            <LinkItemBlock
              key={`${title}-${href}`}
              title={title}
              description={description}
              icon={icon}
              tone={tone}
              href={href}
            />
          ))}
        </div>
      </div>
    </section>
  ));

const LinkItemBlock = ({
  title,
  description,
  icon,
  tone,
  href,
  openInNewTab,
}: LinkItem) => {
  return (
    <a
      href={href}
      target={openInNewTab ? '_blank' : '_self'}
      rel="noreferrer"
      className="
        h-full
        p-8
        rounded-[1.75rem]
        bg-blockBackgroundColor
        hover:bg-blockStrongBackgroundColor
        block-border
        transition
        no-underline!
        text-left
      "
    >
      <h3
        className="
          m-0!
          flex
          items-start
          gap-4
          text-xl
          font-bold
          text-primaryTextColor
        "
      >
        <Icon
          icon={icon}
          tone={tone}
        />
        <span>{title}</span>
      </h3>
      <p
        className="
          mt-3
          leading-relaxed
          text-secondaryTextColor
        "
      >
        {description}
      </p>
    </a>
  );
};

const Icon = ({
  icon: IconComponent,
  tone,
}: {
  icon: React.ComponentType;
  tone?: Tone;
}) => (
  <span
    aria-hidden="true"
    className={tw`
        flex
        items-center
        justify-center
        size-9
        rounded-full
        border
        shrink-0
        -translate-y-1
        ${getToneClasses(tone)}
      `}
  >
    <IconComponent />
  </span>
);

function getToneClasses(tone?: Tone): string {
  switch (tone) {
    case 'amber':
      return 'border-amber-300/30 bg-amber-500/14 text-amber-300';
    case 'rose':
      return 'border-rose-300/30 bg-rose-500/14 text-rose-300';
    case 'orange':
      return 'border-orange-300/30 bg-orange-500/14 text-orange-300';
    case 'cyan':
      return 'border-cyan-300/30 bg-cyan-500/14 text-cyan-300';
    case 'pink':
      return 'border-pink-300/30 bg-pink-500/14 text-pink-300';
    case 'yellow':
      return 'border-yellow-300/30 bg-yellow-500/14 text-yellow-300';
    case 'emerald':
      return 'border-emerald-300/30 bg-emerald-500/14 text-emerald-300';
    case 'sky':
      return 'border-sky-300/30 bg-sky-500/14 text-sky-300';
    case 'indigo':
      return 'border-indigo-300/30 bg-indigo-500/14 text-indigo-300';
    case 'violet':
      return 'border-violet-300/30 bg-violet-500/14 text-violet-300';
    case 'teal':
      return 'border-teal-300/30 bg-teal-500/14 text-teal-300';
    case 'blue':
      return 'border-blue-300/30 bg-blue-500/14 text-blue-300';
    case 'slate':
      return 'border-slate-300/30 bg-slate-500/14 text-slate-200';
    case 'lime':
      return 'border-lime-300/30 bg-lime-500/14 text-lime-300';
    case 'zinc':
    default:
      return 'border-zinc-300/30 bg-zinc-500/14 text-zinc-200';
  }
}
