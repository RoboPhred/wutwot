export function createReadonlyMapWrapper<K, V, VOut = V>(
  map: Map<K, V> | ReadonlyMap<K, V>,
  valueMapper?: (value: V) => VOut,
): ReadonlyMap<K, VOut> {
  // Completely encapsulte the map in a closure to prevent
  //  access by hidden property.

  class ReadonlyMapWrapper implements ReadonlyMap<K, VOut> {
    forEach(
      callbackfn: (value: VOut, key: K, map: ReadonlyMap<K, VOut>) => void,
      thisArg?: any,
    ): void {
      const mapperCallbackFn = (value: V, key: K, map: ReadonlyMap<K, V>) => {
        const vout: VOut = valueMapper ? valueMapper(value) : (value as any);
        callbackfn.call(thisArg, vout, key, this);
      };
      return map.forEach(mapperCallbackFn);
    }

    get(key: K): VOut | undefined {
      const value = map.get(key);
      if (value === undefined) {
        return undefined;
      }

      if (valueMapper) {
        return valueMapper(value);
      }
      return value as any;
    }

    has(key: K): boolean {
      return map.has(key);
    }

    get size(): number {
      return map.size;
    }

    [Symbol.iterator](): IterableIterator<[K, VOut]> {
      return this.entries();
    }

    entries(): IterableIterator<[K, VOut]> {
      // TODO: Mapping iterator to be more efficient.
      return Array.from(map.entries())
        .map(([k, v]) => {
          const vout = valueMapper ? valueMapper(v) : (v as any);
          return [k, vout] as [K, VOut];
        })
        [Symbol.iterator]();
    }

    keys(): IterableIterator<K> {
      return map.keys();
    }

    values(): IterableIterator<VOut> {
      // TODO: Mapping iterator to be more efficient
      return Array.from(map.values())
        .map((value) => {
          if (valueMapper) {
            return valueMapper(value);
          }
          return value as any;
        })
        [Symbol.iterator]();
    }
  }

  return new ReadonlyMapWrapper();
}
