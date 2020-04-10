export abstract class SelfPopulatingReadonlyMap<K, V>
  implements ReadonlyMap<K, V> {
  private _contents = new Map<K, V>();

  protected _set(key: K, value: V): this {
    this._contents.set(key, value);
    return this;
  }

  protected _delete(key: K): boolean {
    return this._contents.delete(key);
  }

  forEach(
    callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void,
    thisArg?: any,
  ): void {
    const callback = (value: V, key: K, map: ReadonlyMap<K, V>) => {
      callbackfn.call(thisArg, value, key, this);
    };
    this._contents.forEach(callback);
  }

  get(key: K): V | undefined {
    return this._contents.get(key);
  }

  has(key: K): boolean {
    return this._contents.has(key);
  }

  get size(): number {
    return this._contents.size;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }
  entries(): IterableIterator<[K, V]> {
    return this._contents.entries();
  }

  keys(): IterableIterator<K> {
    return this._contents.keys();
  }
  values(): IterableIterator<V> {
    return this._contents.values();
  }
}
