export function isNotNull<T>(obj: T | null | undefined): obj is T {
  return obj != null;
}

export function typedKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function nonEmptyArray<T, R>(array: T[], alternative: R): T[] | R;
export function nonEmptyArray<T, R>(
  array: readonly T[],
  alternative: R,
): readonly T[] | R;
export function nonEmptyArray<T, R>(
  array: T[] | readonly T[],
  alternative: R,
): T[] | readonly T[] | R {
  if (array.length === 0) {
    return alternative;
  }
  return array;
}
