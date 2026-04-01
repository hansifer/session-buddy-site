import { useCallback, useEffect, useRef, useState } from 'react';

import { topics } from '@/topics';
import { COLLECTION_COLORS_DARK } from '@/collectionColors';
import { Fade } from '@/components/Fade';
import {
  CollectionTile,
  COLLECTION_TILE_HEIGHT,
} from '@/components/CollectionTile';

// todo: make touch interaction more natural. currently, an initial tap to stop auto-scroll is required before free-scrolling works. subsequent tap-outside resumes auto-scroll. it might be nice for an initial flick to stop auto-scroll/start free-scroll.

// todo: auto-scroll speed is much slower on Safari for some reason

// todo: experiment with reducing render frequency. tweak scroll height increment, distance from bottom threshold, overscan, startIdx update (eg, every multiple of 3). ensure scrollHeight is always enough to accommodate rendered tiles.

// todo: generalize into a comp that accepts a data generator and item component

const createdUpdated = [
  // wrap
  'Created',
  'Updated',
];

const increments = [
  // wrap
  'minute',
  'hour',
  'day',
  'month',
];

const GAP = 10;
const OVERSCAN = 5;

type Item = {
  idx: number;
  color: string;
  title: string;
  description: string;
};

export const InfiniteCollectionTiles = ({
  n = 6,
  speed = 1.8,
  tileBackgroundColor,
}: {
  n?: number; // number of tiles visible in viewport
  speed?: number; // auto-scroll speed
  tileBackgroundColor?: string;
}) => {
  const viewportHeight = n * COLLECTION_TILE_HEIGHT + (n - 1) * GAP;

  const [scrollHeight, setScrollHeight] = useState<number>(
    (n + 3 * OVERSCAN) * (COLLECTION_TILE_HEIGHT + GAP),
  );

  const [startIdx, setStartIdx] = useState<number>(0);

  const settingStartIdxRef = useRef(false);
  const settingScrollHeightRef = useRef(false);

  const hoveredRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // auto-scroll
  useEffect(() => {
    const step = (time: number) => {
      rafRef.current = requestAnimationFrame(step);

      if (hoveredRef.current || !containerRef.current) {
        lastTimeRef.current = time;
        return;
      }

      const delta = lastTimeRef.current // wrap
        ? time - lastTimeRef.current
        : 0;

      lastTimeRef.current = time;

      // normalize to 60fps
      const timeScale = delta / 16.67;

      // prevent huge jumps if tab was inactive
      const safeTimeScale = Math.min(timeScale, 10);

      containerRef.current.scrollTop += speed * safeTimeScale;
    };

    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (!settingStartIdxRef.current) {
        settingStartIdxRef.current = true;

        setStartIdx(() => {
          const startIdx = Math.max(
            0,
            Math.floor(scrollTop / (COLLECTION_TILE_HEIGHT + GAP)) - OVERSCAN,
          );

          settingStartIdxRef.current = false;
          return startIdx;
        });
      }

      if (
        distanceFromBottom < (COLLECTION_TILE_HEIGHT + GAP) * (OVERSCAN + 2) &&
        !settingScrollHeightRef.current
      ) {
        settingScrollHeightRef.current = true;

        setScrollHeight((prev) => {
          const next = prev + (n + OVERSCAN) * (COLLECTION_TILE_HEIGHT + GAP);

          settingScrollHeightRef.current = false;
          return next;
        });
      }
    },
    [n],
  );

  // console.log(startIdx);

  return (
    <div
      className="
        relative
        select-none
      "
      style={{ height: viewportHeight }}
    >
      <Fade color="text-secondaryBackgroundColor" />
      <div
        ref={containerRef}
        style={{ height: viewportHeight }}
        onScroll={handleScroll}
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
        }}
        className="
          max-w-66
          mx-auto
          overflow-y-auto
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          [-webkit-overflow-scrolling:touch]
        "
      >
        <div
          style={{
            height: scrollHeight,
            position: 'relative',
          }}
        >
          {makeItems(startIdx, n + 2 * OVERSCAN).map((item) => (
            <div
              key={item.idx}
              style={{
                top: item.idx * (COLLECTION_TILE_HEIGHT + GAP),
              }}
              className="
                absolute
                inset-x-0
              "
            >
              <CollectionTile
                color={item.color}
                title={item.title}
                description={item.description}
                backgroundColor={tileBackgroundColor}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function makeItems(startIdx: number, count: number): Item[] {
  const items: Item[] = [];

  for (let i = 0; i < count; i++) {
    const idx = startIdx + i;

    items.push({
      idx,
      color: randomColor(idx, items[i - 1]?.color),
      title: randomTitle(idx),
      description: randomDescription(idx),
    });
  }

  return items;
}

let seed = 1;
// multiplicative congruential generator
function seededRand(max: number): number {
  seed = (seed * 16807) % 2147483647;
  return seed % max;
}

function randomColor(idx: number, prevColor?: string): string {
  seed = idx * 2654435761 + 1;

  const available = prevColor // wrap
    ? COLLECTION_COLORS_DARK.filter((color) => color !== prevColor)
    : COLLECTION_COLORS_DARK;

  return available[seededRand(available.length)];
}

function randomTitle(idx: number): string {
  seed = idx * 2654435761 + 1;
  return topics[seededRand(topics.length)];
}

function randomDescription(idx: number): string {
  seed = idx * 2654435761 + 1;

  const prefix = createdUpdated[seededRand(createdUpdated.length)];
  const increment = increments[seededRand(increments.length)];

  const max =
    increment === 'minute'
      ? 30
      : increment === 'hour'
        ? 18
        : increment === 'day'
          ? 24
          : 10;

  const amount = seededRand(max) + 1;

  const pluralIncrement =
    amount === 1 // wrap
      ? increment
      : `${increment}s`;

  return `${prefix} ${amount} ${pluralIncrement} ago`;
}
