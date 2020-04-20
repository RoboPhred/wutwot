export type MaybeArray<T> = T | T[];
export function asArray<T>(value: MaybeArray<T>): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
