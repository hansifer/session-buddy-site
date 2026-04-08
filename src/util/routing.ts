import { trimSlashes } from '@/util/string';

export function pathToTitle(path: string): string {
  const lastSegment = trimSlashes(path).split('/').at(-1) || '';

  return lastSegment
    .split('-')
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
    .join(' ');
}
