export function isNotNull<T>(obj: T | null | undefined): obj is T {
  return obj != null;
}

export function typedKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
