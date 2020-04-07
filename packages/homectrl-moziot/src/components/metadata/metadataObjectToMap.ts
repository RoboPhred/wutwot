/**
 * Copies metadata from an object to a map.
 *
 * Typescript has a design flaw that prevents using symbols as indexes
 * for objects, so we work around this by storing them in maps.
 *
 * @param obj The object to copy metadata from
 * @param map An optional map to copy the metadata to
 * @returns The passed map object, or a new map containing the copied data.
 */
export function metadataObjectToMap(
  obj: Record<string | symbol, any>,
  map = new Map<string | symbol, any>()
): Map<string | Symbol, any> {
  const keys = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ];
  for (const key of keys) {
    map.set(key, obj[key as any]);
  }
  return map;
}
