export class ReadonlyMapWrapper<K, V> implements ReadonlyMap<K, V> {
  constructor(private _map: ReadonlyMap<K, V>) {}

  forEach(
    callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void,
    thisArg?: any
  ): void {
    this._map.forEach(callbackfn, thisArg);
  }

  get(key: K): V | undefined {
    return this._map.get(key);
  }
  has(key: K): boolean {
    return this._map.has(key);
  }

  get size(): number {
    return this._map.size;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this._map[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, V]> {
    return this._map.entries();
  }

  keys(): IterableIterator<K> {
    return this._map.keys();
  }

  values(): IterableIterator<V> {
    return this._map.values();
  }
}
