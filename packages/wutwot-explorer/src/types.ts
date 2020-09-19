export type MaybeArray<T> = T | T[];
export function asArray<T>(value: MaybeArray<T>): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
export function maybeArrayContains(
  op: MaybeArray<string>,
  value: string,
): boolean {
  if (Array.isArray(op)) {
    return op.indexOf(value) !== -1;
  }
  return op === value;
}
