export function mapToObject<K extends PropertyKey, V>(
  map: ReadonlyMap<K, V>,
): Record<K, V> {
  const record: Record<K, V> = {} as any;
  for (const [key, value] of map) {
    record[key] = value;
  }
  return record;
}
