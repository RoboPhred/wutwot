export function isNotNull<T>(obj: T | null | undefined): obj is T {
  return obj != null;
}

export function typedKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function nonEmptyArray<T, R>(array: T[], alternative: R): T[] | R {
  if (array.length === 0) {
    return alternative;
  }
  return array;
}
