// This seems a bit silly, do we gain an advantage from storing things as maps?

import { makeReadOnly } from "../readonly";

//  Cant we store them as objects and use a read only object proxy instead?
export function createMapProxy<K extends PropertyKey, V>(
  map: Map<K, V>
): Record<K, V> {
  const target = {} as Record<K, V>;
  const handler: ProxyHandler<Record<K, V>> = {
    isExtensible() {
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      const value = map.get(key as K);
      if (value) {
        // We need to return configurable: true due to some archaic
        //  rule about the proxy relationship with the underlying target.
        return {
          configurable: true,
          writable: false,
          enumerable: true,
          value,
        };
      }
      return undefined;
    },
    defineProperty(target, key) {
      throw new TypeError(
        `Cannot define property ${String(
          key
        )}; Proxy is a read-only view into the target.`
      );
    },
    has(target, key) {
      return map.has(key as K);
    },
    get(target, key) {
      return map.get(key as K);
    },
    set(target, key) {
      throw new TypeError(
        `Cannot write property ${String(
          key
        )}; Proxy is a read-only view into the target.`
      );
    },
    ownKeys() {
      return Array.from(map.keys());
    },
    setPrototypeOf() {
      throw new TypeError("Cannot change prototype of a read-only Proxy.");
    },
  };
  return new Proxy(target, handler);
}
