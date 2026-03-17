export function randomize<T>(items: readonly T[]): T[] {
  const pool = [...items];

  for (let i = pool.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[randomIndex]] = [pool[randomIndex], pool[i]];
  }

  return pool;
}

// select n unique random items from an array
export function selectRandom<T>(items: readonly T[], count: number): T[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('count must be a positive integer');
  }

  if (count > items.length) {
    throw new RangeError('count cannot be greater than the number of items');
  }

  return randomize(items).slice(0, count);
}
