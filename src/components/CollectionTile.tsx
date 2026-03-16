export const COLLECTION_TILE_HEIGHT = 74;

export const CollectionTile = ({
  color,
  title,
  description,
}: {
  color: string;
  title: string;
  description: string;
}) => {
  return (
    <div
      style={{
        height: COLLECTION_TILE_HEIGHT,
      }}
      className="
        p-4
        rounded-[10px]
        text-[12px]
        text-[#f1f1f1]
        bg-[#424242]
        hover:bg-[#005c9b]
        cursor-pointer
        group
      "
    >
      <div
        className="
          flex
          gap-2
          items-center
        "
      >
        <div
          style={{ backgroundColor: color }}
          className="
            w-2.5
            min-w-2.5
            h-2.5
            rounded-full
            bg-[#b3b3b3]
          "
        />
        <div
          className="
            text-[14px]
            font-medium
            overflow-hidden
            whitespace-nowrap
            text-ellipsis
          "
        >
          <span>{title}</span>
        </div>
      </div>
      <div
        className="
          mt-0.5
          overflow-hidden
          whitespace-pre
          text-ellipsis
          text-[#b3b3b3]
          group-hover:text-[#ffffffbd]
        "
      >
        {description}
      </div>
    </div>
  );
};
