import { typedKeys } from "./types";

export function mapToObject<K extends string | number | symbol, V>(
  map: Map<K, V>,
): Record<K, V> {
  const record: Record<K, V> = {} as any;
  for (const [key, value] of map) {
    record[key] = value;
  }
  return record;
}

export function objectToMap<K extends string | number | symbol, V>(
  obj: Record<K, V>,
  map: Map<K, V> = new Map<K, V>(),
): Map<K, V> {
  for (const key of typedKeys(obj)) {
    map.set(key, obj[key]);
  }
  return map;
}

export function keyForValue<K, V>(map: Map<K, V>, value: V): K | undefined {
  for (const [key, keyValue] of map) {
    if (keyValue === value) {
      return key;
    }
  }
  return undefined;
}
