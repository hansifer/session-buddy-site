export function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, '');
}
